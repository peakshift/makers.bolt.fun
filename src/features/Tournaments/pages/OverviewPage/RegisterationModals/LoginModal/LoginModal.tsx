import { motion } from 'framer-motion'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { FiCopy } from "react-icons/fi";
import { IoClose, IoRocketOutline } from 'react-icons/io5';
import { useMeTournamentQuery } from 'src/graphql';
import Button from 'src/Components/Button/Button';
import { QRCodeSVG } from 'qrcode.react';
import { Grid } from 'react-loader-spinner';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CONSTS } from 'src/utils';
import useCopyToClipboard from 'src/utils/hooks/useCopyToClipboard';
import { useLnurlQuery } from 'src/features/Auth/pages/LoginPage/LoginPage';
import { useAppDispatch } from 'src/utils/hooks';
import { Direction, replaceModal } from 'src/redux/features/modals.slice';
import { NotificationsService } from 'src/services';


interface Props extends ModalCard {
    tournamentId: number
}

export default function LinkingAccountModal({ onClose, direction, tournamentId, ...props }: Props) {

    const [copied, setCopied] = useState(false);

    const { loadingLnurl, data: { lnurl, session_token }, error } = useLnurlQuery();
    const clipboard = useCopyToClipboard();

    const canFetchIsLogged = useRef(true)

    const dispatch = useAppDispatch();


    useEffect(() => {
        setCopied(false);
    }, [lnurl])

    const meQuery = useMeTournamentQuery({
        variables: {
            id: tournamentId
        },
        onCompleted: (data) => {
            if (data.me) {
                const already_registerd = !!data.tournamentParticipationInfo;
                if (already_registerd) {
                    onClose?.();
                    NotificationsService.info("You are already registered")
                }
                else dispatch(replaceModal({
                    Modal: "RegisterTournamet_RegistrationDetails",
                    direction: Direction.NEXT,
                    props: { tournamentId }
                }))

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
            const interval = setInterval(() => {
                if (canFetchIsLogged.current === false) return;

                canFetchIsLogged.current = false;
                fetch(CONSTS.apiEndpoint + '/is-logged-in', {
                    credentials: 'include',
                    headers: {
                        session_token
                    }
                })
                    .then(data => data.json())
                    .then(data => {
                        if (data.logged_in) {
                            clearInterval(interval)
                            refetch();
                        }
                    })
                    .catch()
                    .finally(() => {
                        canFetchIsLogged.current = true;
                    })
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
            canFetchIsLogged.current = true;
            clearInterval(interval)
        }
    }, [lnurl, startPolling])



    let content = <></>

    if (error)
        content = <div className="flex flex-col gap-24 items-center">
            <p className="text-body3 text-red-500 font-bold">Something wrong happened...</p>
            <a href='/login' className="text body4 text-gray-500 hover:underline">Please try again</a>
        </div>

    else if (loadingLnurl)
        content = <div className="flex flex-col gap-24 py-48 items-center">
            <Grid color="var(--primary)" width="150" />
            <p className="text-body3 font-bold">Fetching Lnurl-Auth link</p>
        </div>


    else
        content = <div className="flex flex-col justify-center gap-24 items-center text-center" >
            <a href={`lightning:${lnurl}`} >
                <QRCodeSVG
                    width={280}
                    height={280}
                    value={lnurl}
                    bgColor='transparent'
                    imageSettings={{
                        src: '/assets/images/nut_3d.png',
                        width: 16,
                        height: 16,
                        excavate: true,

                    }}
                />
            </a>
            <p className="text-gray-600 text-body4 text-left">
                To register for this tournament, you need a maker profile. Luckily, this is very easy!
                <br />
                To sign in or create an account, just scan this QR, or click to connect using any lightning wallet like <a href="https://getalby.com" className='underline' target='_blank' rel="noreferrer">Alby</a> or <a href="https://breez.technology/" className='underline' target='_blank' rel="noreferrer">Breez</a>.
            </p>
            <div className="w-full grid grid-cols-2 gap-16">
                <a href={`lightning:${lnurl}`}
                    className='block text-body4 text-center text-white bg-primary-500 hover:bg-primary-600 rounded-10 px-16 py-12 active:scale-90 transition-transform'
                >Click to connect <IoRocketOutline /></a>
                <Button
                    color='gray'
                    onClick={copyToClipboard}
                >{copied ? "Copied" : "Copy"} <FiCopy /></Button>
                <a href={`https://makers.bolt.fun/story/sign-in-with-lightning--99`} target='_blank' rel="noreferrer"
                    className='col-span-2 block text-body4 text-center text-gray-900 border border-gray-200 rounded-10 px-16 py-12 active:scale-90 transition-transform'
                >What is a lightning wallet?</a>
            </div>

        </div>;


    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[442px] rounded-xl relative"
        >
            <div className="p-16 md:p-24">
                <IoClose className='absolute text-body2 top-16 right-16 hover:cursor-pointer' onClick={onClose} />
                <h2 className='text-h5 font-bold text-center'>Connect ⚡️ your maker profile</h2>
            </div>
            <hr className="bg-gray-200" />
            <div className=' p-16 md:p-24'>
                {content}
            </div>
        </motion.div>
    )
}



