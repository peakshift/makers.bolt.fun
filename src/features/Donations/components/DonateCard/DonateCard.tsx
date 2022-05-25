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
    const [selectedOption, setSelectedOption] = useState(-1);
    const [donationAmount, setDonationAmount] = useState<number>();

    const { donate, paymentStatus, isLoading } = useDonate()

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(-1);
        setDonationAmount(Number(event.target.value));
    };

    const onSelectOption = (idx: number) => {
        setSelectedOption(idx);
        setDonationAmount(defaultOptions[idx].value);
    }

    const requestPayment = (e: FormEvent) => {
        e.preventDefault();
        if (donationAmount)
            donate(donationAmount, {
                onSuccess: () => {
                    setTimeout(() => {
                        setDonationAmount(undefined);
                        setSelectedOption(-1);
                    }, 4000);
                },
                onError: () => {
                    setTimeout(() => {
                        setDonationAmount(undefined);
                        setSelectedOption(-1);
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
                        className={` input-text input-removed-arrows`}
                        value={donationAmount} onChange={onChangeInput}
                        type="number"
                        placeholder="1,000"
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
                            className={`btn border px-12 rounded-md py-8 text-body5 bg-primary-100 hover:bg-primary-50 text-primary-600 ${idx === selectedOption && "border-primary-500 bg-primary-100 hover:bg-primary-100 text-primary-600"}`}
                            onClick={() => onSelectOption(idx)}
                        >
                            {option.text}
                        </button>
                    )}
                </div>
                {paymentStatus === PaymentStatus.FETCHING_PAYMENT_DETAILS && <p className="text-body6 mt-12 text-yellow-500">Please wait while we the fetch payment details.</p>}
                {paymentStatus === PaymentStatus.NOT_PAID && <p className="text-body6 mt-12 text-red-500">You did not confirm the payment. Please try again.</p>}
                {paymentStatus === PaymentStatus.NETWORK_ERROR && <p className="text-body6 mt-12 text-red-500">A network error happened while fetching data.</p>}
                {paymentStatus === PaymentStatus.PAID && <p className="text-body6 mt-12 text-green-500">The invoice was paid! Please wait while we confirm it.</p>}
                {paymentStatus === PaymentStatus.AWAITING_PAYMENT && <p className="text-body6 mt-12 text-yellow-500">Waiting for your payment...</p>}
                {paymentStatus === PaymentStatus.PAYMENT_CONFIRMED && <p className="text-body6 mt-12 text-green-500">Thanks for your vote</p>}
                <button
                    type='submit'
                    className="btn btn-primary w-full mt-32"
                    disabled={isLoading}
                >
                    {!isLoading ? "Make a donation" : "Donating..."}
                </button>
            </form>
            {paymentStatus === PaymentStatus.PAYMENT_CONFIRMED && <Confetti className='!fixed top-0 left-0' recycle={false} width={size.width} height={size.height} />}

        </div>
    )
}
