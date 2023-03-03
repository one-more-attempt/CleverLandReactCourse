import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import { AppInfo } from "../app-info/app-info";
import { SearchPanel } from "../search-panel/search-panel";
import { AppFilter } from "../app-filter/app-filter";
import { EmployeesList } from "../employees-list/employees-list";
import { EmployeesAddForm } from "../employees-add-form/employees-add-form";
import { Loader } from "../loader/loader";

import { fetchReducer, INITIAL_STATE } from "../../reducer/reducer";
import { FetchReducerActions } from "../../enums/fetchReducerActions";

import { serverURL } from "../../constants/server-urls";
import "./app.css";

export const App = () => {
  const [globalState, dispatchToFetchReducer] = useReducer(
    fetchReducer,
    INITIAL_STATE
  );

  const getDataFromServer = () => {
    dispatchToFetchReducer({ type: FetchReducerActions.FETCH_START });
    axios
      .get(serverURL.allEmployees)
      .then((response) => {
        const dataFromServer = response.data;
        dispatchToFetchReducer({
          type: FetchReducerActions.FETCH_SUCCESS,
          payload: dataFromServer,
        });
      })
      .catch((error) => {
        const errorMessage: string = error.message;
        dispatchToFetchReducer({
          type: FetchReducerActions.FETCH_ERROR,
          payload: errorMessage,
        });
      });
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  if (globalState.dataFromServerIsReady) {
    return (
      <div className="app">
        <AppInfo
          globalState={globalState}
          dispatchToFetchReducer={dispatchToFetchReducer}
        />

        <div className="search-panel">
          <SearchPanel
            globalState={globalState}
            dispatchToFetchReducer={dispatchToFetchReducer}
          />
          <AppFilter
            globalState={globalState}
            dispatchToFetchReducer={dispatchToFetchReducer}
          />
        </div>

        <EmployeesList
          globalState={globalState}
          dispatchToFetchReducer={dispatchToFetchReducer}
        />
        <EmployeesAddForm
          globalState={globalState}
          dispatchToFetchReducer={dispatchToFetchReducer}
        />
      </div>
    );
  }
  return (
    <Loader
      errorMessage={globalState.errorMessage}
      getDataFromServer={getDataFromServer}
      isDataloading={globalState.isDataloading}
    />
  );
};
