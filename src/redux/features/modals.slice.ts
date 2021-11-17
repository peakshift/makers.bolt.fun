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
  Vote,
}

interface OpenModal {
  modalId: ModalId;
  propsToPass: any;
}

interface StoreState {
  isOpen: boolean;
  isLoading: boolean;
  direction: Direction;
  openModals: OpenModal[];
}

const initialState = {
  isOpen: false,
  isLoading: false,
  direction: Direction.START,
  openModals: [] as OpenModal[],
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
      state.direction = Direction.START;
      state.isOpen = true;
      state.openModals.push({
        modalId: action.payload.modalId,
        propsToPass: action.payload.initialModalProps,
      });
    },

    replaceModal(
      state,
      action: PayloadAction<{
        modalId: ModalId;
        initialModalProps: any;
        direction: Direction;
      }>
    ) {
      state.direction = action.payload.direction;
      state.openModals.pop();
      state.openModals.push({
        modalId: action.payload.modalId,
        propsToPass: action.payload.initialModalProps || {},
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
} = modalSlice.actions;

export default modalSlice.reducer;
