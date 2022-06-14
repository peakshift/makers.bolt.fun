
import { lazyModal } from "src/utils/helperFunctions";

export const { LazyComponent: Claim_CopySignatureCard } = lazyModal(() => import('./Claim_CopySignatureCard'))
export const { LazyComponent: Claim_FundWithdrawCard } = lazyModal(() => import('./Claim_FundWithdrawCard'))
export const { LazyComponent: Claim_GenerateSignatureCard } = lazyModal(() => import('./Claim_GenerateSignatureCard'))
export const { LazyComponent: Claim_SubmittedCard } = lazyModal(() => import('./Claim_SubmittedCard'))