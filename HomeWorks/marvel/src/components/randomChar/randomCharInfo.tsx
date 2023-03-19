export const RandomCharInfo = ({ charState }: any) => {

  
  const charDescription = charState.description
    ? `${charState.description.substr(0, 200)}...`
    : `Sorry, we don't have description for this character.`;
  return (
    <>
      <img
        src={charState.photoURL}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{charState.name}</p>
        <p className="randomchar__descr">{charDescription}</p>
        <div className="randomchar__btns">
          <a href={charState.homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={charState.wikipage} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </>
  );
};
