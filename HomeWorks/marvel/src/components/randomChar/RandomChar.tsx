import { useState, useEffect } from "react";
import { RandomCharInfo } from "./randomCharInfo";
import { Spinner } from "../spinner/Spinner";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import { getRandomCharacterFromServer } from "../../store/server-requests";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import mjolnir from "../../resources/img/mjolnir.png";
import "./randomChar.scss";

const RandomChar = () => {
  const randomCharacterState = useAppSelector(
    stateSelectors.randomCharSliceData
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRandomCharacterFromServer());
  }, []);

  const checkCharacterInfoBlockStatus = () => {
    let checkedCharacterInfoBlock;
    if (randomCharacterState.isDataloading) {
      checkedCharacterInfoBlock = <Spinner />;
    } else if (randomCharacterState.errorMessage) {
      checkedCharacterInfoBlock = <ErrorMessage />;
    } else if (randomCharacterState.dataFromServerIsReady) {
      checkedCharacterInfoBlock = (
        <RandomCharInfo characterData={randomCharacterState.randomCharData} />
      );
    }
    return checkedCharacterInfoBlock;
  };
  const characterInfoBlock = checkCharacterInfoBlockStatus();

  return (
    <div className="randomchar">
      <div className="randomchar__block">{characterInfoBlock}</div>
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className="button button__main"
          onClick={() => {
            dispatch(getRandomCharacterFromServer());
          }}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;
