import { useState, useEffect } from "react";
import { RandomCharInfo } from "./randomCharInfo";
import { Spinner } from "../spinner/Spinner";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import { marvelService } from "../../services/marvelService";
import mjolnir from "../../resources/img/mjolnir.png";
import "./randomChar.scss";

const RandomChar = () => {
  const [charState, setCharState] = useState({
    name: "",
    description: "",
    homepage: "",
    wikipage: "",
    photoURL: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const getRandomChar = async () => {
    try {
      setIsLoading(true);
      const randItemFromServer = await marvelService
        .getAllCharacters()
        .then((resp) => {
          const {
            data: { results },
          } = resp;
          console.log(results);
          
          const maxValueOfRandom = results.length - 1;
          const randValue =
            Math.floor(Math.random() * (maxValueOfRandom - 0 + 1)) + 0;
          const randItemFromServer = results[randValue];
          return randItemFromServer;
        });

      console.log(randItemFromServer);

      const charName = randItemFromServer.name;
      const charDescription = randItemFromServer.description;
      const charPhotoURL = `${randItemFromServer.thumbnail.path}.${randItemFromServer.thumbnail.extension}`;
      const charHomePageURL = `${randItemFromServer.urls[0].url}`;
      const charWikiURL = `${randItemFromServer.urls[1].url}`;
      setIsLoading(false);
      setErrorStatus(false);
      setCharState({
        name: `${charName}`,
        description: `${charDescription}`,
        homepage: `${charHomePageURL}`,
        wikipage: `${charWikiURL}`,
        photoURL: `${charPhotoURL}`,
      });
    } catch (err: any) {
      setErrorStatus(true);
      console.log(err);
    }
  };

  useEffect(() => {
    getRandomChar();
  }, []);

  let randomCharFromServer = <RandomCharInfo charState={charState} />;

  if (isLoading) {
    randomCharFromServer = <Spinner />;
  }
  if (errorStatus) randomCharFromServer = <ErrorMessage />;

  return (
    <div className="randomchar">
      <div className="randomchar__block">{randomCharFromServer}</div>
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
            getRandomChar();
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
