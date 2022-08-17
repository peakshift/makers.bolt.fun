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
import { IoClose } from 'react-icons/io5';



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
        content = <div className="flex flex-col gap-24 items-center my-32">
            <p className="text-body3 text-red-500 font-bold">Ooops...😵</p>
            <p className="text-body4 text-gray-600 text-center">An error happened while fetching the link, please check your internet connection and try again.</p>
        </div>

    else if (loadingLnurl)
        content = <div className="flex flex-col gap-24 items-center my-32">
            <Grid color="var(--primary)" width="80" />
            <p className="text-body4 text-gray-600 font-bold">Fetching Lnurl-Auth Link...</p>
        </div>

    else
        content =
            <div className='flex flex-col gap-24 items-center mt-32'>
                <a href={`lightning:${lnurl}`}>
                    <QRCodeSVG
                        width={160}
                        height={160}
                        value={lnurl}
                    />
                </a>
                <p className="text-gray-600 text-body4 text-center">
                    Scan this QR code with your other lightning wallet & you will be able to use it to login to this account.
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
                    >
                        Done?
                    </Button>
                </div>
            </div>



    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[364px] p-24 rounded-xl relative"
        >
            <IoClose className='absolute text-body2 top-24 right-24 hover:cursor-pointer' onClick={onClose} />
            <h2 className='text-h5 font-bold text-center'>Link new ⚡ wallet</h2>
            {content}
        </motion.div>
    )
}



