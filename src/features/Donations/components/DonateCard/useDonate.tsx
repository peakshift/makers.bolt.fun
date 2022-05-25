
import { useCallback, useState } from 'react';
import { useConfirmDonationMutation, useDonateMutation } from 'src/graphql';
import { Wallet_Service } from 'src/services';
import { PaymentStatus } from 'src/utils/hooks';



export const useDonate = () => {

    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.DEFAULT);
    const [donateMutation] = useDonateMutation();
    const [confirmDonation] = useConfirmDonationMutation();

    const donate = useCallback((amount: number, config?: Partial<{
        onSuccess: () => void,
        onError: (error: any) => void,
        onSetteled: () => void
    }>) => {
        setPaymentStatus(PaymentStatus.FETCHING_PAYMENT_DETAILS)
        donateMutation({
            variables: {
                amountInSat: amount
            },
            onCompleted: async (donationData) => {
                try {
                    setPaymentStatus(PaymentStatus.AWAITING_PAYMENT);
                    const webln = await Wallet_Service.getWebln()
                    const paymentResponse = await webln.sendPayment(donationData.donate.payment_request);
                    setPaymentStatus(PaymentStatus.PAID);

                    //Confirm Voting payment
                    confirmDonation({
                        variables: {
                            paymentRequest: donationData.donate.payment_request,
                            preimage: paymentResponse.preimage
                        },
                        onCompleted: () => {
                            setPaymentStatus(PaymentStatus.PAYMENT_CONFIRMED);
                            config?.onSuccess?.();
                            config?.onSetteled?.()
                        },
                        onError: (error) => {
                            console.log(error)
                            setPaymentStatus(PaymentStatus.NETWORK_ERROR);
                            config?.onError?.(error);
                            config?.onSetteled?.();
                            alert("A network error happened while confirming the payment...")
                        }
                    })
                } catch (error) {
                    setPaymentStatus(PaymentStatus.CANCELED);
                    config?.onError?.(error);
                    config?.onSetteled?.();
                    alert("Payment rejected by user")
                }

            },
            onError: (error) => {
                console.log(error);
                setPaymentStatus(PaymentStatus.NETWORK_ERROR);
                config?.onError?.(error);
                config?.onSetteled?.();
                alert("A network error happened...")
            }
        })
    }, [confirmDonation, donateMutation]);

    const isLoading = paymentStatus !== PaymentStatus.DEFAULT && paymentStatus !== PaymentStatus.PAYMENT_CONFIRMED && paymentStatus !== PaymentStatus.NOT_PAID && paymentStatus !== PaymentStatus.NETWORK_ERROR

    return {
        paymentStatus,
        donate,
        isLoading
    }
}