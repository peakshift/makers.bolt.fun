import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Login_ScanningWalletCard, Login_ExternalWalletCard, Login_NativeWalletCard, Login_SuccessCard } from "src/Components/Modals/Login";
import { ProjectDetailsCard } from "src/features/Projects/pages/ProjectPage/ProjectDetailsCard";
import VoteCard from "src/features/Projects/pages/ProjectPage/VoteCard/VoteCard";
import { InsertImageModal } from 'src/Components/Inputs/TextEditor/InsertImageModal'
import { InsertVideoModal } from 'src/Components/Inputs/TextEditor/InsertVideoModal'
import { InsertLinkModal } from 'src/Components/Inputs/TextEditor/InsertLinkModal'
import { Claim_FundWithdrawCard, Claim_CopySignatureCard, Claim_GenerateSignatureCard, Claim_SubmittedCard } from "src/features/Projects/pages/ProjectPage/ClaimProject";
import { ModalCard } from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { ConfirmModal } from "src/Components/Modals/ConfirmModal";
import { LinkingAccountModal } from "src/features/Profiles/pages/EditProfilePage/AccountCard/LinkingAccountModal";

import { ComponentProps } from "react";
import { generateId } from "src/utils/helperFunctions";

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
  ConfirmModal,
  LinkingAccountModal,

  // Text Editor Modals
  InsertImageModal,
  InsertVideoModal,
  InsertLinkModal,
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



interface ModalObject {
  id: string
  Modal: ModalAction['Modal'],
  props?: any;
  isOpen: boolean
}

interface StoreState {
  isOpen: boolean;
  isLoading: boolean;
  direction: Direction;
  flows: keyof typeof ALL_MODALS[];
  toOpenLater: ModalObject | null;
  openModals: ModalObject[];
  isMobileScreen?: boolean;
}

const initialState = {
  isOpen: false,
  isLoading: false,
  direction: Direction.START,
  flows: [] as any,
  toOpenLater: null,
  openModals: [] as ModalObject[],
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
        id: generateId(),
        Modal: action.payload.Modal,
        isOpen: false,
      };
    },

    openSceduledModal(state) {
      if (state.toOpenLater) {
        state.direction = Direction.START;
        state.isOpen = true;
        state.openModals.push({ ...state.toOpenLater, isOpen: true });
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
        id: generateId(),
        Modal: action.payload.Modal,
        props,
        isOpen: true
      });
    },

    replaceModal(
      state,
      action: PayloadAction<ModalAction & { direction: Direction }>
    ) {
      state.direction = action.payload.direction;
      state.openModals[state.openModals.length - 1].isOpen = false;


      let props: any = {};
      props.isPageModal = action.payload.Modal === 'ProjectDetailsCard';
      if ('props' in action.payload)
        props = { ...props, ...action.payload.props }

      state.openModals.push({
        id: generateId(),
        Modal: action.payload.Modal,
        props,
        isOpen: true,
      });
    },

    closeModal(state) {
      state.direction = Direction.EXIT;
      state.openModals[state.openModals.length - 1].isOpen = false;
      state.isOpen = Boolean(state.openModals.filter(modal => modal.isOpen).length);
    },

    removeClosedModal(state, action: PayloadAction<string>) {
      state.openModals = state.openModals.filter(m => m.id !== action.payload)

    }
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
  removeClosedModal
} = modalSlice.actions;


export default modalSlice.reducer;
