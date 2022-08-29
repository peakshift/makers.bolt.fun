import { useCallback, useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import { Grid } from "react-loader-spinner";
import { useNavigate, useLocation } from "react-router-dom";
import { useMeQuery } from "src/graphql"
import { CONSTS } from "src/utils";
import { QRCodeSVG } from 'qrcode.react';
import { IoRocketOutline } from "react-icons/io5";
import Button from "src/Components/Button/Button";
import { FiCopy } from "react-icons/fi";
import useCopyToClipboard from "src/utils/hooks/useCopyToClipboard";
import { getPropertyFromUnknown, } from "src/utils/helperFunctions";
import { fetchIsLoggedIn, fetchLnurlAuth } from "src/api/auth";



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


export default function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [copied, setCopied] = useState(false);

    const { loadingLnurl, data: { lnurl, session_token }, error } = useLnurlQuery();
    const clipboard = useCopyToClipboard()



    useEffect(() => {
        setCopied(false);
    }, [lnurl])

    const meQuery = useMeQuery({
        onCompleted: (data) => {
            if (data.me) {
                setIsLoggedIn(true);
                meQuery.stopPolling();
                setTimeout(() => {
                    const cameFrom = getPropertyFromUnknown(location.state, 'from');
                    const navigateTo = cameFrom ? cameFrom : '/'

                    navigate(navigateTo)
                }, 2000)
            }

        }
    });

    const copyToClipboard = () => {
        setCopied(true);
        clipboard(lnurl);
    }

    const refetch = meQuery.refetch;
    const startPolling = useCallback(
        () => {
            const interval = setInterval(async () => {
                const isLoggedIn = await fetchIsLoggedIn(session_token);
                if (isLoggedIn) {
                    clearInterval(interval)
                    refetch();
                }
            }, 2000);

            return interval;
        }
        , [refetch, session_token],
    )



    useEffect(() => {
        let interval: NodeJS.Timer;
        if (lnurl)
            interval = startPolling();

        return () => {
            clearInterval(interval)
        }
    }, [lnurl, startPolling])




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

    else if (isLoggedIn)
        content = <div className="flex flex-col justify-center items-center">
            <h3 className="text-body4">
                Hello: <span className="font-bold">@{meQuery.data?.me?.name.slice(0, 10)}...</span>
            </h3>
            <img src={meQuery.data?.me?.avatar} className='w-80 h-80 object-cover' alt="" />
        </div>

    else
        content = <div className="max-w-[364px] border-2 border-gray-200 rounded-16 p-16 flex flex-col gap-24 items-center" >

            <h2 className='text-h5 font-bold text-center'>Login with lightning ⚡</h2>
            <a href={`lightning:${lnurl}`} >
                <QRCodeSVG
                    width={240}
                    height={240}
                    value={lnurl}
                    bgColor='transparent'
                    imageSettings={{
                        src: '/assets/images/nut_3d.png',
                        width: 32,
                        height: 32,
                        excavate: true,

                    }}
                />
            </a>
            <p className="text-gray-600 text-body4 text-center">
                Scan this code or copy + paste it to your lightning wallet. Or click to login with your browser's wallet.
            </p>
            <div className="w-full flex flex-col items-stretch gap-16">
                <a href={`lightning:${lnurl}`}
                    className='grow block text-body4 text-center text-white font-bolder bg-primary-500 hover:bg-primary-600 rounded-10 px-16 py-12 active:scale-90 transition-transform'
                >Click to connect <IoRocketOutline /></a>
                <Button
                    color='gray'
                    className='grow'
                    onClick={copyToClipboard}
                >{copied ? "Copied" : "Copy"} <FiCopy /></Button>
            </div>

        </div>;

    return (
        <div className="min-h-[80vh] page-container flex flex-col justify-center items-center">
            <Helmet>
                <title>{`makers.bolt.fun`}</title>
                <meta property="og:title" content={`makers.bolt.fun`} />
            </Helmet>
            {content}
        </div>
    )
}
