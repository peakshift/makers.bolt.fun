import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Direction {
  START,
  NEXT,
  PREVIOUS,
  EXIT,
}

export enum ModalId {
  None,
  Project,
  Login_ScanWallet,
  Login_NativeWallet,
  Login_ExternalWallet,
  Login_Success,
  Claim_GenerateSignature,
  Claim_CopySignature,
  Claim_Submitted,
  Claim_FundWithdraw,
  Vote,
}

interface OpenModal {
  modalId: ModalId;
  propsToPass?: any;
}

interface StoreState {
  isOpen: boolean;
  isLoading: boolean;
  direction: Direction;
  flows: ModalId[];
  toOpenLater: OpenModal | null;
  openModals: OpenModal[];
}

const initialState = {
  isOpen: false,
  isLoading: false,
  direction: Direction.START,
  flows: [],
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

    scheduleModal(state, action: PayloadAction<OpenModal>) {
      state.toOpenLater = action.payload;
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
      action: PayloadAction<{ modalId: ModalId; propsToPass?: any }>
    ) {
      state.direction = Direction.START;
      state.isOpen = true;
      state.openModals.push({
        modalId: action.payload.modalId,
        propsToPass: action.payload.propsToPass,
      });
    },

    replaceModal(
      state,
      action: PayloadAction<{
        modalId: ModalId;
        propsToPass?: any;
        direction: Direction;
      }>
    ) {
      state.direction = action.payload.direction;
      state.openModals.pop();
      state.openModals.push({
        modalId: action.payload.modalId,
        propsToPass: action.payload.propsToPass || {},
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
