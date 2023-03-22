import axios from "axios";
import { AppDispatch } from ".";
import { randomCharSlice } from "./slices/randomCharSlice";
import { randomCharSliceActions } from "./slices/randomCharSlice";
import { marvelService } from "../services/marvelService";
import type { RandomCharData } from "./slices/randomCharSlice";
import { useAppDispatch } from "./hooks/redux-hooks";

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
          console.log(randomItemFromServer);
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
      console.log(message);
    }
  };
