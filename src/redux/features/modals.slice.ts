import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Claim_CopySignatureCard from "src/pages/ProjectPage/ClaimProject/Claim_CopySignatureCard";
import Claim_GenerateSignatureCard from "src/pages/ProjectPage/ClaimProject/Claim_GenerateSignatureCard";
import Login_ExternalWalletCard from "src/Components/Modals/Login/Login_ExternalWalletCard";
import Login_NativeWalletCard from "src/Components/Modals/Login/Login_NativeWalletCard";
import Login_SuccessCard from "src/Components/Modals/Login/Login_SuccessCard";
import Login_ScanningWalletCard from "src/Components/Modals/Login/Login_ScanningWalletCard";
import ProjectCard from "src/pages/ProjectPage/ProjectCard/ProjectCard";
import TipCard from "src/pages/ProjectPage/Tip/TipCard";
import Claim_SubmittedCard from "src/pages/ProjectPage/ClaimProject/Claim_SubmittedCard";
import Claim_FundWithdrawCard from "src/pages/ProjectPage/ClaimProject/Claim_FundWithdrawCard";
import { ModalCard } from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { ComponentProps } from "react";

export enum Direction {
  START,
  NEXT,
  PREVIOUS,
  EXIT,
}



export const ALL_MODALS = {
  ProjectCard,
  Login_ScanningWalletCard,
  Login_NativeWalletCard,
  Login_SuccessCard,
  Login_ExternalWalletCard,
  TipCard,
  Claim_GenerateSignatureCard,
  Claim_CopySignatureCard,
  Claim_SubmittedCard,
  Claim_FundWithdrawCard,
}


type ExcludeBaseModalProps<U> = Omit<U, keyof ModalCard>

type ModalProps<M extends keyof typeof ALL_MODALS> = ExcludeBaseModalProps<ComponentProps<typeof ALL_MODALS[M]>>

type ModalAction<U extends keyof typeof ALL_MODALS = keyof typeof ALL_MODALS> = U extends any ?
  {} extends ModalProps<U> ?
  { Modal: U }
  :
  { Modal: U, props: ModalProps<U> }
  :
  never;


function dispatch(action: ModalAction) {

}

dispatch({
  Modal: 'Login_NativeWalletCard',


})






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

      let props: any = {};
      if ('props' in action.payload) props = { ...action.payload.props }

      state.toOpenLater = {
        Modal: action.payload.Modal,
        props,
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
      if ('props' in action.payload) props = { ...action.payload.props }

      props.isPageModal = action.payload.Modal === 'ProjectCard';

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
      if ('props' in action.payload) props = { ...action.payload.props }

      props.isPageModal = action.payload.Modal === 'ProjectCard';

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
