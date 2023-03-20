import { useState, useEffect } from "react";

import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import { marvelService } from "../../services/marvelService";
import decoration from "../../resources/img/vision.png";
import { Spinner } from "../spinner/Spinner";
import { ErrorMessage } from "../errorMessage/ErrorMessage";

export const CharactersTable = () => {
  const [charactersArray, setCharactersArray] = useState();
  const [seletedCharacterID, setSelectedCharacterID] = useState(0);
  console.log(seletedCharacterID);

  const [isLoading, setIsLoading] = useState(false);
  const [isHaveError, setIsHaveError] = useState(false);
  const [isDataReady, setisDataReady] = useState(false);
  const getCharactersWithPagination = async () => {
    try {
      setIsHaveError(false);
      setIsLoading(true);
      const itemsFromServer = await marvelService
        .getAllCharacters()
        .then((resp) => {
          const {
            data: { results },
          } = resp;
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
    getCharactersWithPagination();
  }, []);
  if (isHaveError) return <ErrorMessage />;

  if (isDataReady) {
    return (
      <>
        <CharList
          charactersArray={charactersArray}
          setSelectedCharacterID={setSelectedCharacterID}
        />
        <CharInfo seletedCharacterID={seletedCharacterID} />
        <img className="bg-decoration" src={decoration} alt="vision" />
      </>
    );
  }

  return <Spinner />;
};
