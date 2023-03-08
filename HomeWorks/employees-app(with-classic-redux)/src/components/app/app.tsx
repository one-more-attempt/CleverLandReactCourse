import { useEffect } from "react";
import { AppInfo } from "../app-info/app-info";
import { SearchPanel } from "../search-panel/search-panel";
import { AppFilter } from "../app-filter/app-filter";
import { EmployeesList } from "../employees-list/employees-list";
import { EmployeesAddForm } from "../employees-add-form/employees-add-form";
import { Loader } from "../loader/loader";
import { getInitialDataFromServer } from "../../store/server-requests-middleware";
import { useTypedSelector, useTypedDispatch } from "../../store/index";
import "./app.css";

export const App = () => {
  const globalState = useTypedSelector((state) => state);
  const dispatchToReducer = useTypedDispatch ();

  //demonstration of how redux thunk works
  //allow to dispatch function, not only objects!
  const dispatchGetInitialDataFromServer = () => {
    dispatchToReducer(getInitialDataFromServer());
  };

  useEffect(() => {
    dispatchGetInitialDataFromServer();
  }, []);

  if (globalState.dataFromServerIsReady) {
    return (
      <div className="app">
        <AppInfo
          globalState={globalState}
          dispatchToReducer={dispatchToReducer}
        />

        <div className="search-panel">
          <SearchPanel
            globalState={globalState}
            dispatchToReducer={dispatchToReducer}
          />
          <AppFilter
            globalState={globalState}
            dispatchToReducer={dispatchToReducer}
          />
        </div>

        <EmployeesList
          globalState={globalState}
          dispatchToReducer={dispatchToReducer}
        />
        <EmployeesAddForm
          globalState={globalState}
          dispatchToReducer={dispatchToReducer}
        />
      </div>
    );
  }
  return (
    <Loader
      errorMessage={globalState.errorMessage}
      getInitialDataFromServer={getInitialDataFromServer}
      isDataloading={globalState.isDataloading}
      dispatchToReducer={dispatchToReducer}
    />
  );
};
