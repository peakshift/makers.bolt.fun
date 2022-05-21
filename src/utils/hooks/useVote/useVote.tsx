
import { gql } from '@apollo/client';
import { useCallback, useState } from 'react';
import { useConfirmVoteMutation, useVoteMutation, Vote_Item_Type } from 'src/graphql';
import { Wallet_Service } from 'src/services';

export enum PaymentStatus {
    DEFAULT,
    FETCHING_PAYMENT_DETAILS,
    PAID,
    AWAITING_PAYMENT,
    PAYMENT_CONFIRMED,
    NOT_PAID,
    CANCELED
}


export const useVote = ({ itemId, itemType }: {
    itemType: Vote_Item_Type,
    itemId: number
}) => {

    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.DEFAULT);
    const [voteMutaion] = useVoteMutation();
    const [confirmVote] = useConfirmVoteMutation();

    const vote = useCallback((amount: number, config?: Partial<{
        onSuccess: () => void,
        onError: (error: any) => void,
        onSetteled: () => void
    }>) => {
        setPaymentStatus(PaymentStatus.FETCHING_PAYMENT_DETAILS)
        voteMutaion({
            variables: {
                itemId,
                itemType,
                amountInSat: amount
            },
            onCompleted: async (votingData) => {
                try {
                    setPaymentStatus(PaymentStatus.AWAITING_PAYMENT);
                    const webln = await Wallet_Service.getWebln()
                    const paymentResponse = await webln.sendPayment(votingData.vote.payment_request);
                    setPaymentStatus(PaymentStatus.PAID);

                    //Confirm Voting payment
                    confirmVote({
                        variables: {
                            paymentRequest: votingData.vote.payment_request,
                            preimage: paymentResponse.preimage
                        },
                        onCompleted: () => {
                            setPaymentStatus(PaymentStatus.PAYMENT_CONFIRMED);
                            config?.onSuccess?.();
                            config?.onSetteled?.()
                        },
                        update(cache, { data }) {
                            try {
                                const { item_id, item_type, amount_in_sat } = data!.confirmVote;
                                const { votes_count } = cache.readFragment({
                                    id: `${item_type}:${item_id}`,
                                    fragment: gql`
                                        fragment My${item_type} on ${item_type} {
                                        votes_count
                                    }`
                                }) ?? {};
                                cache.writeFragment({
                                    id: `${item_type}:${item_id}`,
                                    fragment: gql`
                                        fragment My${item_type} on ${item_type} {
                                        votes_count
                                    }
                                    `,
                                    data: {
                                        votes_count: votes_count + amount_in_sat
                                    },
                                })
                            } catch (error) {
                                config?.onError?.(error)
                            }
                        },

                        onError: (error) => {
                            config?.onError?.(error);
                            config?.onSetteled?.();
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
                alert("Something wrong happened...")
                setPaymentStatus(PaymentStatus.NOT_PAID);
                config?.onError?.(error);
                config?.onSetteled?.();
            }
        })
    }, [confirmVote, itemId, itemType, voteMutaion]);



    return {
        paymentStatus,
        vote
    }
}