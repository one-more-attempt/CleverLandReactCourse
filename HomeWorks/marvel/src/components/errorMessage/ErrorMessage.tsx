import img from "./error.gif";
export const ErrorMessage = () => {
  return (
    // <img src={process.env.PUBLIC_URL + '/error.gif'} alt="error" />
    <img src={img} alt="Error" />
  );
};
