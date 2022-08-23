
import { gql } from '@apollo/client';
import { useCallback, useState } from 'react';
import { useConfirmVoteMutation, useVoteMutation, Vote_Item_Type } from 'src/graphql';
import { NotificationsService, Wallet_Service } from 'src/services';

export enum PaymentStatus {
    DEFAULT,
    FETCHING_PAYMENT_DETAILS,
    PAID,
    AWAITING_PAYMENT,
    PAYMENT_CONFIRMED,
    NOT_PAID,
    CANCELED,
    NETWORK_ERROR
}

interface Params {
    itemType?: Vote_Item_Type,
    itemId?: number,
    onSuccess?: (amount: number) => void,
    onError?: (error: any) => void,
    onSetteled?: () => void
}



export const useVote = (params: Params) => {

    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.DEFAULT);
    const [voteMutaion] = useVoteMutation();
    const [confirmVote] = useConfirmVoteMutation();

    const vote = useCallback((amount: number, innerParams?: Params) => {

        const itemId = innerParams?.itemId ?? params.itemId;
        const itemType = innerParams?.itemType ?? params.itemType;
        const onSuccess = innerParams?.onSuccess ?? params.onSuccess;
        const onError = innerParams?.onError ?? params.onError;
        const onSetteled = innerParams?.onSetteled ?? params.onSetteled;

        if (!itemId || !itemType) return;


        Wallet_Service.getWebln()
            .then(webln => {

                if (!webln) {
                    onError?.(new Error('No WebLN Detetcted'))
                    onSetteled?.()
                    return
                }

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
                                    onSuccess?.(votingData.vote.amount_in_sat);
                                    onSetteled?.()
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
                                        onError?.(error)
                                    }
                                },

                                onError: (error) => {
                                    setPaymentStatus(PaymentStatus.NETWORK_ERROR);
                                    onError?.(error);
                                    onSetteled?.();
                                    NotificationsService.error("A network error happened while confirming the payment...")
                                }
                            })
                        } catch (error) {
                            setPaymentStatus(PaymentStatus.CANCELED);
                            onError?.(error);
                            onSetteled?.();
                            NotificationsService.error("Payment rejected by user")

                        }

                    },
                    onError: (error) => {
                        console.log(error);
                        setPaymentStatus(PaymentStatus.NETWORK_ERROR);
                        onError?.(error);
                        onSetteled?.();
                        NotificationsService.error("A network error happened...")
                    }
                })
            })


    }, [confirmVote, voteMutaion, params.itemId, params.itemType, params.onError, params.onSetteled, params.onSuccess]);


    const isLoading = paymentStatus !== PaymentStatus.DEFAULT && paymentStatus !== PaymentStatus.PAYMENT_CONFIRMED && paymentStatus !== PaymentStatus.NOT_PAID && paymentStatus !== PaymentStatus.NETWORK_ERROR

    return {
        paymentStatus,
        vote,
        isLoading,
    }
}