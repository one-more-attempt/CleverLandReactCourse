import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
import { useEffect, useState } from "react";
import { Spinner } from "../spinner/Spinner";

const CharList = ({
  charactersArray,
  setSelectedCharacterID,
  isFetchingMoreData,
}: any) => {
  const loadingStatus = isFetchingMoreData ? <Spinner /> : null;
  return (
    <div className="char__list">
      <ul className="char__grid">
        {charactersArray
          ? charactersArray.map((item: any) => {
              const charPhotoURL = `${item.thumbnail.path}.${item.thumbnail.extension}`;
              return (
                <li
                  className="char__item"
                  key={item.id}
                  onClick={() => {
                    setSelectedCharacterID(item.id);
                  }}
                >
                  <img src={charPhotoURL} alt="abyss" />
                  <div className="char__name">{item.name}</div>
                </li>
              );
            })
          : null}
      </ul>

      {loadingStatus}
    </div>
  );
};

export default CharList;
