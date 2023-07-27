import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { getInitialDataFromServer } from "../../store/server-requests-dispatch";

export const Loader = () => {
  const globalState = useAppSelector((state) => state.employeesReducer);
  const dispatch = useAppDispatch();
  const errorMessage = globalState.errorMessage;
  const isDataloading = globalState.isDataloading;
  const TryToGetDataAgain = () => {
    dispatch(getInitialDataFromServer());
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
