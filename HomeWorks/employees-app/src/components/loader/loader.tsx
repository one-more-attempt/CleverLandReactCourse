import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";

type LoaderProps = {
  errorMessage: string;
  getDataFromServer: () => void;
  isDataloading: boolean;
};

export const Loader = ({
  errorMessage,
  isDataloading,
  getDataFromServer,
}: LoaderProps) => {
  const TryToGetDataAgain = () => {
    getDataFromServer();
  };

  const loaderBlock = (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );

  const tryAgainBlock = (
    <>
      <h2 className="error-message">{errorMessage}</h2>
      <div className="try-again-button">
        <Button variant="outlined" onClick={TryToGetDataAgain}>
          Try Again
        </Button>
      </div>
    </>
  );

  return (
    <div className="loader-wrapper">
      {isDataloading ? loaderBlock : tryAgainBlock}
    </div>
  );
};
