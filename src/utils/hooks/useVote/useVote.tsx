
import { gql } from '@apollo/client';
import { useState } from 'react';
import { useConfirmVoteMutation, useVoteMutation } from 'src/graphql';
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


export const useVote = ({ onSuccess, onError }: {
    onSuccess?: () => void
    onError?: (error: any) => void
}) => {

    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.DEFAULT);

    const [voteMutaion] = useVoteMutation({
        onCompleted: async (votingData) => {
            try {
                setPaymentStatus(PaymentStatus.AWAITING_PAYMENT);
                const webln = await Wallet_Service.getWebln()
                const paymentResponse = await webln.sendPayment(votingData.vote.payment_request);
                setPaymentStatus(PaymentStatus.PAID);
                confirmVote({
                    variables: {
                        paymentRequest: votingData.vote.payment_request,
                        preimage: paymentResponse.preimage
                    }
                })
            } catch (error) {
                console.log(error);
                setPaymentStatus(PaymentStatus.NOT_PAID);
            }

        },
        onError: (error) => {
            console.log(error);
            alert("Something wrong happened...")
            setPaymentStatus(PaymentStatus.NOT_PAID);
            onError?.(error)
        }
    });

    const [confirmVote] = useConfirmVoteMutation({
        onCompleted: () => {
            setPaymentStatus(PaymentStatus.PAYMENT_CONFIRMED);
            onSuccess?.();
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

            }
        },

        onError: () => { }

    });


    const vote = (...params: Parameters<typeof voteMutaion>) => {
        setPaymentStatus(PaymentStatus.FETCHING_PAYMENT_DETAILS)
        voteMutaion(...params)
    }
    return {
        paymentStatus,
        vote
    }
}