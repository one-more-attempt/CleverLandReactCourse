import { useState, useEffect } from "react";

import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import { marvelService } from "../../services/marvelService";
import decoration from "../../resources/img/vision.png";
import { Spinner } from "../spinner/Spinner";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import { type } from "os";

export const CharactersTable = () => {
  const [charactersArray, setCharactersArray] = useState<any>();
  const [seletedCharacterID, setSelectedCharacterID] = useState(0);
  console.log(seletedCharacterID);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMoreData, setIsFetchingMoreData] = useState(false);
  const [isHaveError, setIsHaveError] = useState(false);
  const [isDataReady, setisDataReady] = useState(false);

  const getCharacters = async () => {
    try {
      setIsHaveError(false);
      setIsLoading(true);
      const itemsFromServer = await marvelService
        .getAllCharacters()
        .then((resp) => {
          const {
            data: { results },
          } = resp;
          console.log(resp.data);

          setCharactersArray(results);
          return results;
        });
      console.log(itemsFromServer);
      setIsLoading(false);
      setisDataReady(true);
    } catch (e) {
      setIsHaveError(true);
    }
  };
  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (isFetchingMoreData) {
      getMoreCharacters();
    }
  }, [isFetchingMoreData]);

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100
    )
      setIsFetchingMoreData(true);
  };

  const getMoreCharacters = async () => {
    const offsetValue = charactersArray.length;
    try {
      const itemsFromServer = await marvelService
        .loadMoreCharacters(`${offsetValue}`)
        .then((resp) => {
          const {
            data: { results },
          } = resp;
          return results;
        });
      console.log(itemsFromServer);
      const newState: any = [...charactersArray, ...itemsFromServer];
      setIsFetchingMoreData(false);
      setCharactersArray(newState);
    } catch (e) {
      console.log(e);
      setIsFetchingMoreData(false);
    }
  };
  if (isHaveError) return <ErrorMessage />;

  if (isDataReady) {
    return (
      <>
        <CharList
          charactersArray={charactersArray}
          setSelectedCharacterID={setSelectedCharacterID}
          getMoreCharacters={getMoreCharacters}
          isFetchingMoreData={isFetchingMoreData}
        />
        <CharInfo seletedCharacterID={seletedCharacterID} />
        <img className="bg-decoration" src={decoration} alt="vision" />
      </>
    );
  }

  return <Spinner />;
};
