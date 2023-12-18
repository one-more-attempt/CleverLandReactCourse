import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedCharacterData = {
  selectedCharacterId: number;
  name: string;
  description: string;
  homepage: string;
  wikipage: string;
  photoURL: string;
  availableComicsAmount: number;
  comics?: SelectedCharacterComics[];
};
export type SelectedCharacterComics = {
  comicBookName: string;
  comicBookURL: string;
};

export type SelectedCharacterStateType = {
  selectedCharacterData: SelectedCharacterData;
  dataFromServerIsReady: boolean;
  error: boolean;
  isDataloading: boolean;
};

const INITIAL_STATE: SelectedCharacterStateType = {
  selectedCharacterData: {
    selectedCharacterId: 0,
    name: "",
    description: "",
    homepage: "",
    wikipage: "",
    photoURL: "",
    availableComicsAmount: 0,
  },
  dataFromServerIsReady: false,
  error: false,
  isDataloading: false,
};

export const selectedCharacterSlice = createSlice({
  name: "SelectedCharacterSlice",
  initialState: INITIAL_STATE,
  reducers: {
    fetchStart(state) {
      state.isDataloading = true;
      state.dataFromServerIsReady = false;
    },
    fetchSuccess(state, action: PayloadAction<SelectedCharacterData>) {
      state.selectedCharacterData = action.payload;
      state.dataFromServerIsReady = true;
      state.isDataloading = false;
    },

    fetchError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
      state.isDataloading = false;
      state.dataFromServerIsReady = false;
    },

    setSelectedCharacterID(state, action: PayloadAction<number>) {
      state.selectedCharacterData.selectedCharacterId = action.payload;
    },
  },
});

export const selectedCharacterSliceReducer = selectedCharacterSlice.reducer;
export const selectedCharacterSliceActions = selectedCharacterSlice.actions;
