import { motion } from 'framer-motion'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { useEffect, useState } from "react"
import { Grid } from "react-loader-spinner";
import { CONSTS } from "src/utils";
import { QRCodeSVG } from 'qrcode.react';
import Button from "src/Components/Button/Button";
import { FiCopy } from "react-icons/fi";
import useCopyToClipboard from "src/utils/hooks/useCopyToClipboard";
import { useApolloClient } from '@apollo/client';



const fetchLnurlAuth = async () => {
    const res = await fetch(CONSTS.apiEndpoint + '/get-login-url?action=link', {
        credentials: 'include'
    })
    const data = await res.json()
    return data;
}

const useLnurlQuery = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<{ lnurl: string, session_token: string }>({ lnurl: '', session_token: '' })


    useEffect(() => {

        let timeOut: NodeJS.Timeout;
        const doFetch = async () => {
            const res = await fetchLnurlAuth();
            if (!res?.encoded)
                setError(true)
            else {
                setLoading(false);
                setData({
                    lnurl: res.encoded,
                    session_token: res.session_token
                });
                timeOut = setTimeout(doFetch, 1000 * 60 * 2)
            }
        }
        doFetch()

        return () => clearTimeout(timeOut)
    }, [])

    return {
        loadingLnurl: loading,
        error,
        data
    }
}

export default function LinkingAccountModal({ onClose, direction, ...props }: ModalCard) {

    const [copied, setCopied] = useState(false);

    const { loadingLnurl, data: { lnurl }, error } = useLnurlQuery();
    const clipboard = useCopyToClipboard();
    const apolloClient = useApolloClient();



    useEffect(() => {
        setCopied(false);
    }, [lnurl])


    const copyToClipboard = () => {
        setCopied(true);
        clipboard(lnurl);
    }

    const done = () => {
        apolloClient.refetchQueries({
            include: ['MyProfilePreferences']
        })
        onClose?.()
    }


    let content = <></>

    if (error)
        content = <div className="flex flex-col gap-24 items-center">
            <p className="text-body3 text-red-500 font-bold">Something wrong happened...</p>
            <a href='/login' className="text body4 text-gray-500 hover:underline">Refresh the page</a>
        </div>

    else if (loadingLnurl)
        content = <div className="flex flex-col gap-24 items-center">
            <Grid color="var(--primary)" width="150" />
            <p className="text-body3 font-bold">Fetching Lnurl-Auth...</p>
        </div>

    else
        content =
            <>
                <p className="text-body1 font-bolder text-center">
                    Link your account ⚡
                </p>
                <QRCodeSVG
                    width={160}
                    height={160}
                    value={lnurl}
                />
                <p className="text-gray-600 text-body4 text-center">
                    Scan this code or copy + paste it to your other lightning wallet to be able to login later with it to this account.
                    <br />
                    When done, click the button below to close this modal.
                </p>
                <div className="flex flex-col w-full gap-16">
                    {/* <a href={lnurl}
                        className='grow block text-body4 text-center text-white font-bolder bg-primary-500 hover:bg-primary-600 rounded-10 px-16 py-12 active:scale-90 transition-transform'
                    >Click to connect <IoRocketOutline /></a> */}
                    <Button
                        color='gray'
                        className='grow'
                        onClick={copyToClipboard}
                        fullWidth
                    >{copied ? "Copied" : "Copy"} <FiCopy /></Button>
                    <Button
                        color='primary'
                        onClick={done}
                        fullWidth
                        className='mt-16'
                    >
                        Done?
                    </Button>
                </div>
            </>



    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card w-full max-w-[326px] bg-white border-2 border-gray-200 rounded-16 p-16 flex flex-col gap-16 items-center"
        >
            {content}
        </motion.div>
    )
}



