import { Dispatch } from "react";
import { FetchReducerActionType } from "../../store/";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";

type LoaderProps = {
  errorMessage: string;
  isDataloading: boolean;
  dispatchToReducer: Dispatch<FetchReducerActionType>;
  getInitialDataFromServer: (
    dispatchToReducer: Dispatch<FetchReducerActionType>
  ) => void;
};

export const Loader = ({
  errorMessage,
  isDataloading,
  getInitialDataFromServer,
  dispatchToReducer,
}: LoaderProps) => {
  const TryToGetDataAgain = () => {
    getInitialDataFromServer(dispatchToReducer);
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
