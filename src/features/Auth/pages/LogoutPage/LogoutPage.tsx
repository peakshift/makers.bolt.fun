import { useEffect, useState } from "react"
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Grid, LineWave } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {

    const navigate = useNavigate();

    useEffect(() => {
        fetch(process.env.REACT_APP_AUTH_END_POINT! + '/logout', {
            method: "GET",
            'credentials': "include"
        })
            .then(() => {
                window.location.pathname = '/'
            })
            .catch(() => {
                window.location.pathname = '/'
            })
    }, [navigate])


    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
            <p className="text-body-2 text-gray-800">
                Logging you out...
            </p>
            <LineWave color="var(--primary)" width="150" />
        </div>
    )
}
