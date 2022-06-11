import { useCallback, useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import { Grid } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useMeQuery } from "src/graphql"
import { CONSTS } from "src/utils";
import { QRCodeSVG } from 'qrcode.react';
import { IoRocketOutline } from "react-icons/io5";
import Button from "src/Components/Button/Button";
import { FiCopy } from "react-icons/fi";
import useCopyToClipboard from "src/utils/hooks/useCopyToClipboard";



const fetchLnurlAuth = async () => {
    const res = await fetch(CONSTS.apiEndpoint + '/get-login-url', {
        credentials: 'include'
    })
    const data = await res.json()
    return data;
}

const useLnurlQuery = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState("")


    useEffect(() => {

        let timeOut: NodeJS.Timeout;
        const doFetch = async () => {
            const res = await fetchLnurlAuth();
            if (!res?.encoded)
                setError(true)
            else {
                setLoading(false);
                setData(res.encoded);
                timeOut = setTimeout(doFetch, 1000 * 60 * 2)
            }
        }
        doFetch()

        return () => clearTimeout(timeOut)
    }, [])

    return {
        loadingLnurl: loading,
        error,
        lnurlAuth: data
    }
}


export default function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const { loadingLnurl, lnurlAuth, error } = useLnurlQuery();
    const clipboard = useCopyToClipboard()



    useEffect(() => {
        setCopied(false);
    }, [lnurlAuth])

    const meQuery = useMeQuery({
        onCompleted: (data) => {
            if (data.me) {
                setIsLoggedIn(true);
                meQuery.stopPolling();
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }

        }
    });

    const copyToClipboard = () => {
        setCopied(true);
        clipboard(lnurlAuth);
    }

    const refetch = meQuery.refetch;
    const startPolling = useCallback(
        () => {
            const interval = setInterval(() => {
                fetch(CONSTS.apiEndpoint + '/is-logged-in', {
                    credentials: 'include'
                }).then(data => data.json())
                    .then(data => {
                        if (data.logged_in) {
                            clearInterval(interval)
                            refetch();
                        }
                    })
            }, 2000);

            return interval;
        }
        , [refetch],
    )



    useEffect(() => {
        let interval: NodeJS.Timer;
        if (lnurlAuth)
            interval = startPolling();

        return () => {
            clearInterval(interval)
        }
    }, [lnurlAuth, startPolling])




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
        content = <div className="max-w-[326px] border-2 border-gray-200 rounded-16 p-16 flex flex-col gap-16 items-center" >
            <p className="text-body1 font-bolder text-center">
                Login with lightning ⚡
            </p>
            <QRCodeSVG
                width={160}
                height={160}
                value={lnurlAuth}
            />
            <p className="text-gray-600 text-body4 text-center">
                Scan this code or copy + paste it to your lightning wallet. Or click to login with your browser's wallet.
            </p>
            <div className="flex flex-wrap gap-16">
                <a href={lnurlAuth}
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
