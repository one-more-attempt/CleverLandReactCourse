import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import { Skeleton } from "../skeleton/Skeleton";
import { marvelService } from "../../services/marvelService";
import { useEffect, useState } from "react";

const CharInfo = ({ charactersArray }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(
    charactersArray[0]
  );
  const selectedCharacterImgURL = `${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`;
  const selectedCharacterHomePageURL = `${selectedCharacter.urls[0].url}`;
  const selectedCharacterWikiURL = `${selectedCharacter.urls[1].url}`;

  if (isLoading)
    return (
      <div className="char__info">
        <Skeleton />
      </div>
    );
  return (
    <div className="char__info">
      <div className="char__basics">
        <img src={selectedCharacterImgURL} alt="abyss" />

        <div>
          <div className="char__info-name">{selectedCharacter.name}</div>
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
      <div className="char__descr">
        In Norse mythology, Loki is a god or eferred to as the father of Váli in
        the Prose Edda.
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        <li className="char__comics-item">
          All-Winners Squad: Band of Heroes (2011) #3
        </li>
        <li className="char__comics-item">Alpha Flight (1983) #50</li>
      </ul>
    </div>
  );
};

export default CharInfo;
