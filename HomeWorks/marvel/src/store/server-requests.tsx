import { AppDispatch, stateSelectors } from ".";
import { randomCharSliceActions } from "./slices/randomCharSlice";
import { marvelService } from "../services/marvelService";
import type { RandomCharData } from "./slices/randomCharSlice";
import type {
  SelectedCharacterData,
  SelectedCharacterComics,
} from "./slices/selectedCharacterSlice";

import { characterTableSliceActions } from "./slices/charactersListSlice";
import { useAppSelector } from "./hooks/redux-hooks";
import { selectedCharacterSliceActions } from "./slices/selectedCharacterSlice";

export const ServerRequestsInitialParams = {
  limit: 9,
  offset: 1520,
};

export const getRandomCharacterFromServer =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(randomCharSliceActions.fetchStart());
      await marvelService
        .getCharactersForRandom()
        .then((resp) => {
          const {
            data: { results },
          } = resp;
          const maxValueOfRandom = results.length - 1;
          const randValue =
            Math.floor(Math.random() * (maxValueOfRandom - 0 + 1)) + 0;
          const randomItemFromServer = results[randValue];
          return randomItemFromServer;
        })
        .then((responseFromServer) => {
          const charName = responseFromServer.name;
          const charDescription = responseFromServer.description;
          const charPhotoURL = `${responseFromServer.thumbnail.path}.${responseFromServer.thumbnail.extension}`;
          const charHomePageURL = `${responseFromServer.urls[0].url}`;
          const charWikiURL = `${responseFromServer.urls[1].url}`;

          const newRandomCharacter: RandomCharData = {
            name: charName,
            description: charDescription,
            homepage: charHomePageURL,
            wikipage: charWikiURL,
            photoURL: charPhotoURL,
          };

          dispatch(randomCharSliceActions.fetchSuccess(newRandomCharacter));
        });
    } catch (message) {
      dispatch(randomCharSliceActions.fetchError(!!message));
    }
  };

export const getCharactersListFromServer =
  (
    requestOffset: number = ServerRequestsInitialParams.offset,
    requestimit: number = ServerRequestsInitialParams.limit
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(characterTableSliceActions.fetchStart());
      await marvelService
        .getCharactersListWithLimitAndOffset(requestOffset, requestimit)
        .then((resp) => {
          const charactersArray = resp.data.results.map(
            (item: {
              id: number;
              name: string;
              thumbnail: { path: string; extension: string };
            }) => {
              return {
                id: item.id,
                name: item.name,
                photoURL: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              };
            }
          );
          const backEndArrayInfo: {
            allCharactersAmount: number;
            currentOffset: number;
          } = {
            allCharactersAmount: resp.data.total,
            currentOffset: resp.data.offset,
          };
          dispatch(
            characterTableSliceActions.addBackEndArrayInfo(backEndArrayInfo)
          );
          // const newRequestOffsetValue = requestOffset+requestimit
          // dispatch(characterTableSliceActions.updateCurrentOffset(newRequestOffsetValue));
          dispatch(characterTableSliceActions.fetchSuccess(charactersArray));
        });
    } catch (error) {
      dispatch(characterTableSliceActions.fetchError(!!error));
    }
  };

export const getNewCharactersListFromServer =
  (
    requestOffset: number,
    requestLimit: number = ServerRequestsInitialParams.limit
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(characterTableSliceActions.setIsDataUpdating(true));
      await marvelService
        .getCharactersListWithLimitAndOffset(requestOffset, requestLimit)
        .then((resp) => {
          const charactersArray = resp.data.results.map(
            (item: {
              id: number;
              name: string;
              thumbnail: { path: string; extension: string };
            }) => {
              return {
                id: item.id,
                name: item.name,
                photoURL: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              };
            }
          );
          const backEndArrayInfo: {
            allCharactersAmount: number;
            currentOffset: number;
          } = {
            allCharactersAmount: resp.data.total,
            currentOffset: resp.data.offset,
          };
          dispatch(
            characterTableSliceActions.addBackEndArrayInfo(backEndArrayInfo)
          );
          dispatch(
            characterTableSliceActions.updateCharacterArray(charactersArray)
          );
          dispatch(characterTableSliceActions.setIsDataUpdating(false));
          dispatch(characterTableSliceActions.setIsFetchingMoreData(false));
          // dispatch(
          //   characterTableSliceActions.updateCurrentOffset(requestLimit)
          // );
        });
    } catch (error) {
      dispatch(characterTableSliceActions.fetchError(!!error));
    }
  };

export const getCharacterFromServerById =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(selectedCharacterSliceActions.fetchStart());
      await marvelService
        .getCharacterById(id)
        .then((resp) => {
          const randomItemFromServer = resp.data.results;
          return randomItemFromServer[0];
        })
        .then((responseFromServer) => {
          const charId: number = responseFromServer.name.id;
          const charName: string = responseFromServer.name;
          const charDescription: string = responseFromServer.description;
          const charPhotoURL = `${responseFromServer.thumbnail.path}.${responseFromServer.thumbnail.extension}`;
          const charHomePageURL = `${responseFromServer.urls[0].url}`;
          const charWikiURL = `${responseFromServer.urls[1].url}`;
          const availableComicsAmount: number =
            responseFromServer.comics.available;
          const comics = responseFromServer.comics.items;
          let comicsArray: SelectedCharacterComics[] = [
            { comicBookName: "", comicBookURL: "" },
          ];

          if (availableComicsAmount) {
            comicsArray = comics.map(
              (item: { name: string; resourceURI: string }) => {
                return {
                  comicBookName: item.name,
                  comicBookURL: item.resourceURI,
                };
              }
            );
          }
          const newSelectedCharacter: SelectedCharacterData = {
            selectedCharacterId: charId,
            name: charName,
            description: charDescription,
            homepage: charHomePageURL,
            wikipage: charWikiURL,
            photoURL: charPhotoURL,
            availableComicsAmount,
            comics: availableComicsAmount ? comicsArray : undefined,
          };
          dispatch(
            selectedCharacterSliceActions.fetchSuccess(newSelectedCharacter)
          );
        });

      // });
    } catch (message) {
      dispatch(selectedCharacterSliceActions.fetchError(!!message));
    }
  };
