import { useState, useEffect } from "react";

import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import { marvelService } from "../../services/marvelService";
import decoration from "../../resources/img/vision.png";
import { Spinner } from "../spinner/Spinner";

export const CharactersTable = () => {
  const [charactersArray, setCharactersArray] = useState<{}[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDataReady, setisDataReady] = useState(false);
  const getCharacters = async () => {
    try {
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
    } catch (e) {}
  };
  useEffect(() => {
    getCharacters();
  }, []);

  if (isDataReady) {
    return (
      <>
        <CharList charactersArray={charactersArray} />
        <CharInfo charactersArray={charactersArray} />
        <img className="bg-decoration" src={decoration} alt="vision" />
      </>
    );
  }

  return <Spinner />;
};
