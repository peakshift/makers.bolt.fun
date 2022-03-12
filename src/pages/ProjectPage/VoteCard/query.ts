import { gql } from "@apollo/client";

export const VOTE_QUERY = gql`
mutation Vote($projectId: Int!, $amountInSat: Int!) {
  vote(project_id: $projectId, amount_in_sat: $amountInSat) {
    id
    amount_in_sat
    payment_request
    payment_hash
    paid
  }
}
`;

export type VOTE_QUERY_RES_TYPE = {
  vote: {
    id: number;
    amount_in_sat: number;
    payment_request: string;
    payment_hash: string;
    paid: boolean;
  }
}

export const CONFIRM_VOTE_QUERY = gql`
mutation ConfirmVote($paymentRequest: String!, $preimage: String!) {
  confirmVote(payment_request: $paymentRequest, preimage: $preimage) {
    id
    amount_in_sat
    paid
    payment_hash
    payment_request 
  }
}
`;

export type CONFIRM_VOTE_QUERY_RES_TYPE = {
  confirmVote: {
    id: number;
    amount_in_sat: number;
    paid: boolean;
    payment_hash: string;
    payment_request: string;
  }
}