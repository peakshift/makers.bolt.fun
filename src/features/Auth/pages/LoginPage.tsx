import { useEffect, useState } from "react"
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Grid } from "react-loader-spinner";
import { useMeQuery } from "src/graphql"


export default function LoginPage() {
    const [loadingLnurl, setLoadingLnurl] = useState(true)
    const [lnurlAuth, setLnurlAuth] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPollilng, setIsPollilng] = useState(false)



    const meQuery = useMeQuery({
        onCompleted: (data) => {
            const stateChanged = Boolean(data.me) !== isLoggedIn;
            if (stateChanged)
                setIsPollilng(false);

            setIsLoggedIn(Boolean(data.me));
        }
    })



    useEffect(() => {
        (async () => {
            const res = await fetch(process.env.REACT_APP_AUTH_END_POINT! + '/login')
            const data = await res.json()
            setLoadingLnurl(false);
            setLnurlAuth(data.encoded)
        })()
    }, [])

    const { startPolling, stopPolling } = meQuery;
    useEffect(() => {
        if (isPollilng)
            startPolling(1500);
        else
            stopPolling();
    }, [isPollilng, startPolling, stopPolling])


    const onLogin = () => {
        setIsPollilng(true);
    }

    const logout = async () => {
        await fetch(process.env.REACT_APP_AUTH_END_POINT! + '/logout', {
            method: "GET",
            'credentials': "include"
        })
        setIsPollilng(true);
    }


    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
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
                        <button
                            onClick={logout}
                            className="text-black font-bolder bg-gray-200 rounded-12 px-16 py-12 mt-36 active:scale-90 transition-transform">
                            {isPollilng ? "Logging you out..." : "Logout"}
                        </button>
                    </div> :
                    <a
                        href={lnurlAuth}
                        onClick={onLogin}
                        className='text-black font-bolder bg-yellow-200 hover:bg-yellow-300 rounded-12 px-16 py-12 active:scale-90 transition-transform'>
                        Login with Lightning <BsFillLightningChargeFill className="scale-125" />
                    </a>
                )}
        </div>
    )
}
