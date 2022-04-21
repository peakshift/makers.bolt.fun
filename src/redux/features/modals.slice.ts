import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Login_ScanningWalletCard, Login_ExternalWalletCard, Login_NativeWalletCard, Login_SuccessCard } from "src/Components/Modals/Login";
import { ProjectDetailsCard } from "src/features/Projects/pages/ProjectPage/ProjectDetailsCard";
import VoteCard from "src/features/Projects/pages/ProjectPage/VoteCard/VoteCard";
import { Claim_FundWithdrawCard, Claim_CopySignatureCard, Claim_GenerateSignatureCard, Claim_SubmittedCard } from "src/features/Projects/pages/ProjectPage/ClaimProject";
import { ModalCard } from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { ComponentProps } from "react";

export enum Direction {
  START,
  NEXT,
  PREVIOUS,
  EXIT,
}



export const ALL_MODALS = {
  ProjectDetailsCard,
  Login_ScanningWalletCard,
  Login_NativeWalletCard,
  Login_SuccessCard,
  Login_ExternalWalletCard,
  VoteCard,
  Claim_GenerateSignatureCard,
  Claim_CopySignatureCard,
  Claim_SubmittedCard,
  Claim_FundWithdrawCard,
}

type ExcludeBaseModalProps<U> = Omit<U, keyof ModalCard>

type ModalProps<M extends keyof typeof ALL_MODALS> = ExcludeBaseModalProps<ComponentProps<typeof ALL_MODALS[M]>>

type NonNullableObject<T> = {
  [K in keyof T]-?: NonNullable<T[K]>
}

type ModalAction<U extends keyof typeof ALL_MODALS = keyof typeof ALL_MODALS> = U extends any ?
  {} extends NonNullableObject<ModalProps<U>> ?
  { Modal: U }
  :
  { Modal: U, props: ModalProps<U> }
  :
  never;



interface OpenModal {
  Modal: ModalAction['Modal'],
  props?: any;
}

interface StoreState {
  isOpen: boolean;
  isLoading: boolean;
  direction: Direction;
  flows: keyof typeof ALL_MODALS[];
  toOpenLater: OpenModal | null;
  openModals: OpenModal[];
  isMobileScreen?: boolean;
}

const initialState = {
  isOpen: false,
  isLoading: false,
  direction: Direction.START,
  flows: [] as any,
  toOpenLater: null,
  openModals: [] as OpenModal[],
} as StoreState;

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setDirection(state, action: PayloadAction<Direction>) {
      state.direction = action.payload;
    },

    scheduleModal(state, action: PayloadAction<ModalAction>) {
      state.toOpenLater = {
        Modal: action.payload.Modal,
      };
    },

    openSceduledModal(state) {
      if (state.toOpenLater) {
        state.direction = Direction.START;
        state.isOpen = true;
        state.openModals.push(state.toOpenLater);
        state.toOpenLater = null;
      }
    },

    removeScheduledModal(state) {
      state.toOpenLater = null;
    },

    openModal(
      state,
      action: PayloadAction<ModalAction>
    ) {
      state.direction = Direction.START;
      state.isOpen = true;

      let props: any = {};
      props.isPageModal = action.payload.Modal === 'ProjectDetailsCard';

      if ('props' in action.payload)
        props = { ...props, ...action.payload.props }


      state.openModals.push({
        Modal: action.payload.Modal,
        props
      });
    },

    replaceModal(
      state,
      action: PayloadAction<ModalAction & { direction: Direction }>
    ) {
      state.direction = action.payload.direction;
      state.openModals.pop();


      let props: any = {};
      props.isPageModal = action.payload.Modal === 'ProjectDetailsCard';
      if ('props' in action.payload)
        props = { ...props, ...action.payload.props }

      state.openModals.push({
        Modal: action.payload.Modal,
        props,
      });
    },

    closeModal(state) {
      state.direction = Direction.EXIT;
      state.openModals.pop();
      state.isOpen = Boolean(state.openModals.length);
    },
  },
});



export const {
  closeModal,
  openModal,
  replaceModal,
  setDirection,
  scheduleModal,
  openSceduledModal,
  removeScheduledModal,
} = modalSlice.actions;


export default modalSlice.reducer;
