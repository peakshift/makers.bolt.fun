import { useMountEffect } from "@react-hookz/web";
import { useEffect, useState } from "react"
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Grid } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useMeQuery } from "src/graphql"



const getLnurlAuth = async () => {
    const res = await fetch(process.env.REACT_APP_API_END_POINT! + '/login')
    const data = await res.json()
    return data;
}


export default function LoginPage() {
    const [loadingLnurl, setLoadingLnurl] = useState(true)
    const [lnurlAuth, setLnurlAuth] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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



    useMountEffect(() => {
        getLnurlAuth().then(data => {
            setLoadingLnurl(false);
            setLnurlAuth(data.encoded)
        })
    })



    const onLogin = () => {
        meQuery.startPolling(1500)
    }




    return (
        <div className="min-h-[80vh] page-container flex flex-col justify-center items-center">
            {loadingLnurl && <div className="flex flex-col gap-24 items-center">
                <Grid color="var(--primary)" width="150" />
                <p className="text-body3 font-bold">Fetching Lnurl-Auth...</p>
            </div>}
            {!loadingLnurl &&
                (isLoggedIn ?
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="text-body4">
                            Hello: <span className="font-bold">@{meQuery.data?.me?.name.slice(0, 10)}...</span>
                        </h3>
                        <img src={meQuery.data?.me?.avatar} className='w-80 h-80 object-cover' alt="" />
                    </div> :
                    <div className="max-w-[326px] border-2 border-gray-200 rounded-16 p-16 flex flex-col gap-16 items-center" >
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
                            onClick={onLogin}
                            className='block text-black font-bolder bg-yellow-200 hover:bg-yellow-300 rounded-12 px-16 py-12 active:scale-90 transition-transform'>
                            Login with Lightning <BsFillLightningChargeFill className="scale-125" />
                        </a>
                    </div>
                )}
        </div>
    )
}
