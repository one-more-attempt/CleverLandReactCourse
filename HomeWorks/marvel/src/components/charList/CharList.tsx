import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
import { useEffect, useState } from "react";

const CharList = ({ charactersArray, setSelectedCharacterID }: any) => {
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
                  onClick={() => {setSelectedCharacterID(item.id)}}
                >
                  <img src={charPhotoURL} alt="abyss" />
                  <div className="char__name">{item.name}</div>
                </li>
              );
            })
          : null}
      </ul>
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
