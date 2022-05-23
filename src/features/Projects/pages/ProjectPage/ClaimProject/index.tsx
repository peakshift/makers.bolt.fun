import { ComponentProps } from "react";
import { lazyModal } from "src/utils/helperFunctions";
import { Id } from "src/utils/types/utils";

const x = () => import('./Claim_CopySignatureCard');

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
type y = Id<ThenArg<ReturnType<typeof x>>>
// type yy = ComponentProps<y['default']>
export const { LazyComponent: Claim_CopySignatureCard } = lazyModal(() => import('./Claim_CopySignatureCard'))
export const { LazyComponent: Claim_FundWithdrawCard } = lazyModal(() => import('./Claim_FundWithdrawCard'))
export const { LazyComponent: Claim_GenerateSignatureCard } = lazyModal(() => import('./Claim_GenerateSignatureCard'))
export const { LazyComponent: Claim_SubmittedCard } = lazyModal(() => import('./Claim_SubmittedCard'))