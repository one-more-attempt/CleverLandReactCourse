import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { selectedCharacterSliceActions } from "../../store/slices/selectedCharacterSlice";
import { stateSelectors } from "../../store";
import { Spinner } from "../spinner/Spinner";
import type {
  CharacterTableStateType,
  CharacterTableData,
} from "../../store/slices/charactersListSlice";
import "./charList.scss";

type CharListProps = {
  scrollHandler: () => void;
};

export const CharList = ({ scrollHandler }: CharListProps) => {
  const сharactersListState = useAppSelector(
    stateSelectors.characterTableSliceData
  );
  const dispatch = useAppDispatch();
  const setSelectedCharacterID = (itemId: number) => {
    dispatch(selectedCharacterSliceActions.setSelectedCharacterID(itemId));
  };

  const charactersArray = сharactersListState.charactersArray;
  const loadingStatus = сharactersListState.isDataUpdating ? <Spinner /> : null;
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="char__list">
      <ul className="char__grid">
        {charactersArray.map((item: CharacterTableData) => {
          return (
            <li
              className="char__item"
              key={item.id}
              onClick={() => {
                setSelectedCharacterID(item.id);
              }}
            >
              <img src={item.photoURL} alt="abyss" />
              <div className="char__name">{item.name}</div>
            </li>
          );
        })}
      </ul>
      {loadingStatus}
    </div>
  );
};
