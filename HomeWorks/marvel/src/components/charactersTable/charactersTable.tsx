import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { marvelService } from "../../services/marvelService";
import {
  getCharactersListFromServer,
  getNewCharactersListFromServer,
  ServerRequestsInitialParams,
} from "../../store/server-requests";
import { characterTableSliceActions } from "../../store/slices/charactersListSlice";
import { CharInfo } from "../charInfo/CharInfo";
import { CharList } from "../charList/CharList";
import { Spinner } from "../spinner/Spinner";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import decoration from "../../resources/img/vision.png";

export const CharactersTable = () => {
  const сharactersListState = useAppSelector(
    stateSelectors.characterTableSliceData
  );
  const selectedCharacterState = useAppSelector(
    stateSelectors.selectedCharacterSliceData
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCharactersListFromServer());
  }, []);

  useEffect(() => {
    if (сharactersListState.isFetchingMoreData) {
      const currentRequestOffsetValue =
        сharactersListState.backendArrayDetails.currentOffset;
      const requestMaxValue =
        сharactersListState.backendArrayDetails.allCharactersAmount;
      const requestLimitValue = ServerRequestsInitialParams.limit;
      const nextOffsetValue = currentRequestOffsetValue + requestLimitValue;
      const lastArrayAmoutValue = requestMaxValue - currentRequestOffsetValue;

      //can get full 9 objects pull from backend
      if (nextOffsetValue < requestMaxValue) {
        dispatch(getNewCharactersListFromServer(nextOffsetValue));
      }
      //can't get full 9 objects pull from backend, so we need to get last objects (!== 9)
      if (nextOffsetValue > requestMaxValue && lastArrayAmoutValue !== 0) {
        const offsetValue = currentRequestOffsetValue + lastArrayAmoutValue;
        dispatch(getNewCharactersListFromServer(offsetValue));
      }
    }
  }, [сharactersListState.isFetchingMoreData]);

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      50
    )
      dispatch(characterTableSliceActions.setIsFetchingMoreData(true));
  };

  if (сharactersListState.dataFromServerIsReady) {
    return (
      <>
        <CharList scrollHandler={scrollHandler} />

        <CharInfo />
        <img className="bg-decoration" src={decoration} alt="vision" />
      </>
    );
  }

  return <Spinner />;
};
