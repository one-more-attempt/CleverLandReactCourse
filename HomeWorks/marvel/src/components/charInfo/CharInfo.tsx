import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import { Skeleton } from "../skeleton/Skeleton";
import { marvelService } from "../../services/marvelService";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../errorMessage/ErrorMessage";

const CharInfo = ({ seletedCharacterID }: any) => {
  console.log(seletedCharacterID);
  const [isLoading, setIsLoading] = useState(false);
  const [isHaveError, setIsHaveError] = useState(false);
  const [isDataReady, setisDataReady] = useState(false);
  const [currentCharData, setCurrentCharData] = useState();
  console.log(currentCharData);

  const getCharacterById = async (seletedCharacterID: any) => {
    try {
      setIsHaveError(false);
      setIsLoading(true);
      const itemFromServer = await marvelService
        .getCharacterById(seletedCharacterID)
        .then((resp) => {
          const {
            data: { results },
          } = resp;
          setCurrentCharData(results);
          return results;
        });
      console.log(itemFromServer);
      setIsLoading(false);
      setisDataReady(true);
    } catch (e) {
      setIsHaveError(true);
      setisDataReady(false);
    }
  };

  useEffect(() => {
    if (seletedCharacterID) {
      getCharacterById(seletedCharacterID);
    }
  }, [seletedCharacterID]);

  if (isLoading) {
    return (
      <div className="char__info">
        <Skeleton />
      </div>
    );
  }

  if (isHaveError) return <ErrorMessage />;

  if (isDataReady && currentCharData) {
    console.log(currentCharData[0]);
    const currentChar: any = currentCharData[0];
    const selectedCharacterImgURL = `${currentChar.thumbnail.path}.${currentChar.thumbnail.extension}`;
    const selectedCharacterName = `${currentChar.name}`;
    const selectedCharacterHomePageURL = `${currentChar.urls[0].url}`;
    const selectedCharacterWikiURL = `${currentChar.urls[1].url}`;
    const selectedCharacterDescription = currentChar.description
      ? `${currentChar.description.substr(0, 200)}...`
      : `Sorry, we don't have description for this character.`;

    let comicsBlock;
    if (currentChar.comics.items.length) {
      const comicsListFromServer =
        currentChar.comics.items.length > 15
          ? currentChar.comics.items.slice(0, 10)
          : currentChar.comics.items;

      const comicsList = comicsListFromServer.map((item: any, indx: any) => {
        return (
          <li className="char__comics-item" key={indx}>
            <a href={selectedCharacterWikiURL}>{item.name}</a>
          </li>
        );
      });

      comicsBlock = (
        <>
          <div className="char__comics">Comics:</div>
          <ul className="char__comics-list">{comicsList}</ul>
        </>
      );
    } else {
      comicsBlock = <p>No comics Available</p>;
    }

    return (
      <div className="char__info">
        <div className="char__basics">
          <img src={selectedCharacterImgURL} alt="abyss" />

          <div>
            <div className="char__info-name">{selectedCharacterName}</div>
            <div className="char__btns">
              <a
                href={selectedCharacterHomePageURL}
                className="button button__main"
              >
                <div className="inner">homepage</div>
              </a>
              <a
                href={selectedCharacterWikiURL}
                className="button button__secondary"
              >
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{selectedCharacterDescription}</div>
        {comicsBlock}
      </div>
    );
  }
  return <h3>Click to see more info.</h3>;
};

export default CharInfo;
