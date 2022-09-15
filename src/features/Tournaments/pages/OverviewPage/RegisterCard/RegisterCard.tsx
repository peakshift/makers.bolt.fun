import React from 'react'
import { FaDiscord, FaUsers } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import Button from 'src/Components/Button/Button'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { openModal } from 'src/redux/features/modals.slice'
import { useCountdown } from 'src/utils/hooks'
import { useAppDispatch, useAppSelector } from "src/utils/hooks";

interface Props {
    start_date: string;
    makers_count: number
    avatars: string[]
    isRegistered: boolean;
}

export default function RegisterCard({ makers_count, start_date, avatars, isRegistered }: Props) {

    const counter = useCountdown(start_date)
    const { id: tournamentId } = useParams()


    const isLoggedIn = useAppSelector(state => !!state.user.me)
    const dispatch = useAppDispatch()

    const onRegister = () => {
        if (!tournamentId) return;

        if (isLoggedIn)
            dispatch(openModal({
                Modal: "RegisterTournamet_ConfrimAccount",
                props: {
                    tournamentId: Number(tournamentId)
                }
            }))
        else
            dispatch(openModal({
                Modal: "RegisterTournamet_Login",
                props: {
                    tournamentId: Number(tournamentId)
                }
            }))
    }


    return (
        <Card onlyMd className='flex flex-col gap-24 md:!border'>
            <div>
                {makers_count > 2 && <p className="text-body5 text-gray-600 flex">
                    {avatars.map((img, idx) => <div className='w-[16px] h-32 relative'><Avatar key={idx} src={img} width={32} className='absolute top-0 left-0 min-w-[32px] !border-white' /></div>)}
                    <span className='self-center ml-24 font-medium '>+ {makers_count} makers</span>
                </p>}
                <Button color={isRegistered ? 'gray' : "primary"} disabled={isRegistered} fullWidth className='mt-16' onClick={onRegister}>{isRegistered ? "Registered!" : "Register Now"}</Button>
                <Button color={"gray"} href={'https://discord.gg/HFqtxavb7x'} newTab fullWidth className='mt-8 !text-primary-500'><FaDiscord /> <span className="align-middle ml-4">Join the Discord</span></Button>

            </div>
            <div>
                {counter.isExpired ?
                    <p className="text-body3 text-gray-600 text-center">Tournament running!</p>
                    :
                    <>
                        <p className="text-body5 text-gray-900 font-medium">
                            Tournament starts in
                        </p>
                        <div className="grid grid-cols-3 gap-10 mt-16">
                            <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                                {counter.days}d
                            </div>
                            <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                                {counter.hours}h
                            </div>
                            <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                                {counter.minutes}m
                            </div>
                        </div>
                    </>
                }
            </div>
            <div>
                <p className="text-body5 text-gray-900 font-medium">
                    Sponsored by
                </p>
                <img src={'/assets/images/logos/fulgur_logo.svg'} alt="Fulgur Ventures Logo" className='max-h-48 mt-16 ' />
            </div>
        </Card>
    )
}
