import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { Skeleton } from "../skeleton/Skeleton";
import { marvelService } from "../../services/marvelService";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import abyss from "../../resources/img/abyss.jpg";
import "./charInfo.scss";
import { getCharacterFromServerById } from "../../store/server-requests";
import { Spinner } from "../spinner/Spinner";
import type { SelectedCharacterComics } from "../../store/slices/selectedCharacterSlice";

export const CharInfo = () => {
  const selectedCharacterStateData = useAppSelector(
    stateSelectors.selectedCharacterSliceData
  );
  const dispatch = useAppDispatch();
  const characterId =
    selectedCharacterStateData.selectedCharacterData.selectedCharacterId;
  console.log(selectedCharacterStateData);
  useEffect(() => {
    if (characterId) {
      dispatch(getCharacterFromServerById(characterId));
    }
  }, [characterId]);

  const characterData = selectedCharacterStateData.selectedCharacterData;
  const сharacterDescription = characterData.description
    ? `${characterData.description.substr(0, 200)}...`
    : `Sorry, we don't have description for this character.`;
  const isComicsAvailable =
    selectedCharacterStateData.selectedCharacterData.availableComicsAmount;

  const characterComics =
    isComicsAvailable > 15
      ? selectedCharacterStateData.selectedCharacterData.comics?.slice(0, 15)
      : selectedCharacterStateData.selectedCharacterData.comics;

  const comics = (
    <>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {characterComics?.map((item: SelectedCharacterComics) => {
          return (
            <li className="char__comics-item" key={item.comicBookURL}>
              <a href={item.comicBookURL}>{item.comicBookName}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
  const comicsBlock = isComicsAvailable ? (
    comics
  ) : (
    <p>Sory, we don't have any comics with this character</p>
  );

  const dataFromServer = (
    <>
      <div className="char__info">
        <div className="char__basics">
          <img src={characterData.photoURL} alt="abyss" />

          <div>
            <div className="char__info-name">{characterData.name}</div>
            <div className="char__btns">
              <a href={characterData.homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a
                href={characterData.wikipage}
                className="button button__secondary"
              >
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{сharacterDescription}</div>
        {comicsBlock}
      </div>
    </>
  );
  console.log(selectedCharacterStateData.selectedCharacterData.comics);
  if (selectedCharacterStateData.isDataloading) return <Skeleton />;
  if (selectedCharacterStateData.error) return <ErrorMessage />;
  if (selectedCharacterStateData.dataFromServerIsReady)
    return <>{dataFromServer}</>;

  return <h3>Click to see more info</h3>;
};
