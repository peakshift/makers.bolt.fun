import { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Grid } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useMeQuery } from "src/graphql"
import { CONSTS } from "src/utils";
import { QRCodeSVG } from 'qrcode.react';
import { IoQrCode } from "react-icons/io5";
import Button from "src/Components/Button/Button";



const getLnurlAuth = async () => {
    const res = await fetch(CONSTS.apiEndpoint + '/login', {
        credentials: 'include'
    })
    const data = await res.json()
    return data;
}


export default function LoginPage() {
    const [loadingLnurl, setLoadingLnurl] = useState(true)
    const [showQr, setShowQr] = useState(false)
    const [lnurlAuth, setLnurlAuth] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null)
    const navigate = useNavigate()


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
    })



    useEffect(() => {
        getLnurlAuth()
            .then(data => {
                setLoadingLnurl(false);
                setLnurlAuth(data.encoded)
            })
            .catch((error) => {
                setError(error)
            })
    }, [])

    const startPolling = () => {
        meQuery.startPolling(1500)
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
                Login
            </p>
            <p className="text-gray-600 text-body4 text-center">
                Zero credentials authentication.
                <br />
                All you need is a connected <a href='https://getalby.com'
                    target='_blank'
                    className="underline text-primary-500"
                    rel="noreferrer"
                >WebLN wallet</a> that supports lnurl-auth, & you are good to go !!
            </p>
            <a
                href={lnurlAuth}
                onClick={startPolling}
                className='block text-black font-bolder bg-yellow-200 hover:bg-yellow-300 rounded-12 px-16 py-12 active:scale-90 transition-transform'>
                Login with WebLN <BsFillLightningChargeFill className="scale-125" />
            </a>

            <div className="text-gray-500 text-body5 font-bold">OR</div>
            {!showQr && <button className="text-blue-500 text-body4 px-12 py-8 hover:bg-gray-100 rounded-8" onClick={() => { setShowQr(true); startPolling() }}>
                Scan QR <IoQrCode width={'100%'} />
            </button>}
            {showQr && <QRCodeSVG
                width={160}
                height={160}
                value={lnurlAuth}
            />}
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
