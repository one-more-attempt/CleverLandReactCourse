import "./skeleton.scss";

export const Skeleton = () => {
  return (
    <>
      <div className="skeleton">
        <h3>Loading...</h3>
        <br />
        <div className="pulse skeleton__header">
          <div className="pulse skeleton__circle"></div>
          <div className="pulse skeleton__mini"></div>
        </div>
        <div className="pulse skeleton__block"></div>
        <div className="pulse skeleton__block"></div>
        <div className="pulse skeleton__block"></div>
      </div>
    </>
  );
};
