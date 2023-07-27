import type { RandomCharData } from "../../store/slices/randomCharSlice";

type RandomCharInfoProps = {
  characterData: RandomCharData;
};

export const RandomCharInfo = ({ characterData }: RandomCharInfoProps) => {
  const charDescription = characterData.description
    ? `${characterData.description.substr(0, 200)}...`
    : `Sorry, we don't have description for this character.`;

  return (
    <>
      <img
        src={characterData.photoURL}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{characterData.name}</p>
        <p className="randomchar__descr">{charDescription}</p>
        <div className="randomchar__btns">
          <a href={characterData.homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={characterData.wikipage} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </>
  );
};
