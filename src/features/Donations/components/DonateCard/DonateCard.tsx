import React, { FormEvent, useState } from 'react';
import { PaymentStatus, } from 'src/utils/hooks';
import Confetti from "react-confetti";
import { useWindowSize } from '@react-hookz/web';
import { useDonate } from './useDonate';

const defaultOptions = [
    { text: '500', value: 500 },
    { text: '1,000', value: 1000 },
    { text: '5,000', value: 5000 },
    { text: '25,000', value: 25000 },
]


export default function DonateCard() {

    const size = useWindowSize();
    const [donationAmount, setDonationAmount] = useState("");

    const { donate, paymentStatus, isLoading } = useDonate()

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDonationAmount(event.target.value);
    };

    const onSelectOption = (idx: number) => {
        setDonationAmount(defaultOptions[idx].value.toString());
    }

    const requestPayment = (e: FormEvent) => {
        e.preventDefault();
        if (Number(donationAmount))
            donate(Number(donationAmount), {
                onSuccess: () => {
                    setTimeout(() => {
                        setDonationAmount("");
                    }, 4000);
                },
                onError: () => {
                    setTimeout(() => {
                        setDonationAmount("");
                    }, 4000);
                }
            });
    }

    return (
        <div
            className="bg-gray-50 border w-full shadow-2xl p-24 rounded-xl relative"
        >
            <h2 className='text-h5 font-bold'>Donate to BOLT🔩FUN</h2>
            <form onSubmit={requestPayment} className="mt-32 ">
                <div className="input-wrapper">
                    <input
                        className={`input-text input-removed-arrows`}
                        value={donationAmount} onChange={onChangeInput}
                        type="number"
                        placeholder="Select or enter amount"
                        autoFocus
                    />
                    <p className='px-16 shrink-0 self-center text-primary-400'>
                        sats
                    </p>
                </div>
                <div className="flex mt-16 justify-between">
                    {defaultOptions.map((option, idx) =>
                        <button
                            type='button'
                            key={idx}
                            className={`btn border-0 px-12 rounded-md py-8 text-body5 bg-primary-50 hover:bg-primary-100 outline-2 outline-primary-200 active:outline `}
                            onClick={() => onSelectOption(idx)}
                        >
                            {option.text}
                        </button>
                    )}
                </div>
                <button
                    type='submit'
                    className="btn btn-primary w-full mt-32"
                    disabled={isLoading}
                >
                    {!isLoading ? "Make a donation" : "Donating..."}
                </button>
                <div className="mt-12 text-center">
                    {paymentStatus === PaymentStatus.FETCHING_PAYMENT_DETAILS && <p className="text-body6 text-yellow-500">Please wait while we fetch payment details.</p>}
                    {paymentStatus === PaymentStatus.NOT_PAID && <p className="text-body6 text-red-500">You did not confirm the payment. Please try again.</p>}
                    {paymentStatus === PaymentStatus.CANCELED && <p className="text-body6 text-red-500">Payment canceled by user.</p>}
                    {paymentStatus === PaymentStatus.NETWORK_ERROR && <p className="text-body6 text-red-500">A network error happened while fetching data.</p>}
                    {paymentStatus === PaymentStatus.PAID && <p className="text-body6 text-green-500">The invoice was paid! Please wait while we confirm it.</p>}
                    {paymentStatus === PaymentStatus.AWAITING_PAYMENT && <p className="text-body6 text-yellow-500">Waiting for your payment...</p>}
                    {paymentStatus === PaymentStatus.PAYMENT_CONFIRMED && <p className="text-body6 text-green-500">Thanks for your vote</p>}
                </div>
            </form>
            {paymentStatus === PaymentStatus.PAYMENT_CONFIRMED && <Confetti className='!fixed top-0 left-0' recycle={false} width={size.width} height={size.height} />}

        </div>
    )
}
