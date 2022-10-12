import { motion } from 'framer-motion'
import React, { FormEvent, useState } from 'react';
import { AiFillThunderbolt } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer';
import { PaymentStatus, useVote } from 'src/utils/hooks';
import Confetti from "react-confetti";
import { useWindowSize } from '@react-hookz/web';
import { Vote_Item_Type } from 'src/graphql';
import IconButton from 'src/Components/IconButton/IconButton';

const defaultOptions = [
    { text: '100 sat', value: 100 },
    { text: '1k sat', value: 1000 },
    { text: '10k sats', value: 10000 },
]


interface Props extends ModalCard {
    projectId: number;
    title?: string;
    initVotes?: number;
}

export default function VoteCard({ onClose, direction, projectId, initVotes, ...props }: Props) {
    const { width, height } = useWindowSize()



    const [selectedOption, setSelectedOption] = useState(10);
    const [voteAmount, setVoteAmount] = useState<number>(initVotes ?? 10);
    const { vote, paymentStatus } = useVote({
        itemId: projectId,
        itemType: Vote_Item_Type.Project
    })



    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(-1);
        setVoteAmount(Number(event.target.value));
    };

    const onSelectOption = (idx: number) => {
        setSelectedOption(idx);
        setVoteAmount(defaultOptions[idx].value);
    }

    const requestPayment = (e: FormEvent) => {
        e.preventDefault();
        vote(voteAmount, {
            onSuccess: () => {
                setTimeout(() => {
                    onClose?.();
                }, 4000);
            },
            onError: () => {
                setTimeout(() => {
                    onClose?.();
                }, 4000);
            }
        });
    }

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[343px] p-24 rounded-xl relative"
        >
            <div className="flex items-center justify-between gap-12">
                <h2 className='text-h5 font-bold'>Tip this project</h2>
                <IconButton onClick={onClose} >
                    <IoClose className='text-body2' />
                </IconButton>
            </div>
            <form onSubmit={requestPayment} className="mt-32 ">
                <label className="block text-gray-700 text-body4 mb-2 ">
                    Enter Amount
                </label>
                <div className="input-wrapper">
                    <input
                        className={` input-text input-removed-arrows`}
                        value={voteAmount} onChange={onChangeInput}
                        type="number"
                        placeholder="e.g 5 sats"
                        autoFocus
                    />
                    <p className='px-16 shrink-0 self-center text-primary-400'>
                        Sats
                    </p>
                </div>
                <div className="flex mt-16 justify-between">
                    {defaultOptions.map((option, idx) =>
                        <button
                            type='button'
                            key={idx}
                            className={`btn border px-12 rounded-md py-8 text-body ${idx === selectedOption && "border-primary-500 bg-primary-100 hover:bg-primary-100 text-primary-600"}`}
                            onClick={() => onSelectOption(idx)}
                        >
                            {option.text}<AiFillThunderbolt className='inline-block text-thunder' />
                        </button>
                    )}
                </div>
                <p className="text-body6 mt-12 text-gray-500">1 sat = 1 vote</p>
                <p className="text-body6 mt-12 text-gray-500"><strong>Where do these sats go?</strong> <br /> Claimed project tips go directly towards the maker's. Unclaimed project votes go towards BOLT.FUN's community pool.</p>
                {paymentStatus === PaymentStatus.FETCHING_PAYMENT_DETAILS && <p className="text-body6 mt-12 text-yellow-500">Please wait while we the fetch payment details.</p>}
                {paymentStatus === PaymentStatus.NOT_PAID && <p className="text-body6 mt-12 text-red-500">You did not confirm the payment. Please try again.</p>}
                {paymentStatus === PaymentStatus.PAID && <p className="text-body6 mt-12 text-green-500">The invoice was paid! Please wait while we confirm it.</p>}
                {paymentStatus === PaymentStatus.AWAITING_PAYMENT && <p className="text-body6 mt-12 text-yellow-500">Waiting for your payment...</p>}
                {paymentStatus === PaymentStatus.PAYMENT_CONFIRMED && <p className="text-body6 mt-12 text-green-500">Thanks for your tip!</p>}
                <button
                    type='submit'
                    className="btn btn-primary w-full mt-32"
                    disabled={paymentStatus !== PaymentStatus.DEFAULT && paymentStatus !== PaymentStatus.NOT_PAID}
                >
                    {paymentStatus === PaymentStatus.DEFAULT || paymentStatus === PaymentStatus.NOT_PAID ? "Tip" : "Tipping..."}
                </button>
            </form>
            {paymentStatus === PaymentStatus.PAYMENT_CONFIRMED && <Confetti width={width} height={height} />}
        </motion.div>
    )
}
