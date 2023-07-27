import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CharacterTableData = {
  id: number;
  name: string;
  photoURL: string;
};

export type backendArrayDetails = {
  allCharactersAmount: number;
  currentOffset: number;
};

export type CharacterTableStateType = {
  charactersArray: CharacterTableData[];
  backendArrayDetails: backendArrayDetails;
  dataFromServerIsReady: boolean;
  error: boolean;
  isDataloading: boolean;
  isFetchingMoreData: boolean;
  isDataUpdating: boolean;
  isHaveInitialData: boolean;
};

const INITIAL_STATE: CharacterTableStateType = {
  charactersArray: [
    {
      id: 0,
      name: "",
      photoURL: "",
    },
  ],
  backendArrayDetails: {
    allCharactersAmount: 0,
    currentOffset: 0,
  },
  dataFromServerIsReady: false,
  error: false,
  isDataloading: false,
  isFetchingMoreData: false,
  isDataUpdating: false,
  isHaveInitialData: false,
};

export const characterTableSlice = createSlice({
  name: "characterTableSlice",
  initialState: INITIAL_STATE,
  reducers: {
    fetchStart(state) {
      state.isDataloading = true;
      state.dataFromServerIsReady = false;
    },
    fetchSuccess(state, action: PayloadAction<CharacterTableData[]>) {
      state.charactersArray = action.payload;
      state.dataFromServerIsReady = true;
      state.isDataloading = false;
      state.isHaveInitialData = true;
    },
    fetchError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
      state.isDataloading = false;
      state.dataFromServerIsReady = false;
    },
    addBackEndArrayInfo(state, action: PayloadAction<backendArrayDetails>) {
      state.backendArrayDetails = action.payload;
    },
    setIsFetchingMoreData(state, action: PayloadAction<boolean>) {
      state.isFetchingMoreData = action.payload;
    },
    setIsDataUpdating(state, action: PayloadAction<boolean>) {
      state.isDataUpdating = action.payload;
    },
    updateCharacterArray(state, action: PayloadAction<CharacterTableData[]>) {
      state.charactersArray = [...state.charactersArray, ...action.payload];
    },
  },
});

export const characterTableSliceReducer = characterTableSlice.reducer;
export const characterTableSliceActions = characterTableSlice.actions;
