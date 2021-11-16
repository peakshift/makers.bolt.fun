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
  Login1,
  Login2,
}

interface StoreState {
  isOpen: boolean;
  isLoading: boolean;
  direction: Direction;
  openModalId: ModalId;
  initialModalProps: any;
}

const initialState = {
  isOpen: false,
  isLoading: false,
  direction: Direction.START,
  openModalId: ModalId.None,
} as StoreState;

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setDirection(state, action: PayloadAction<Direction>) {
      state.direction = action.payload;
    },

    openModal(
      state,
      action: PayloadAction<{ modalId: ModalId; initialModalProps: any }>
    ) {
      if (!state.isOpen) state.direction = Direction.START;
      state.isOpen = true;
      state.openModalId = action.payload.modalId;
      state.initialModalProps = action.payload.initialModalProps;
    },

    closeModal(state) {
      state.direction = Direction.EXIT;
      state.isOpen = false;
      state.openModalId = ModalId.None;
    },
  },
});

export const { closeModal, openModal, setDirection } = modalSlice.actions;

export default modalSlice.reducer;
