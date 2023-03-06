import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import { AppInfo } from "../app-info/app-info";
import { SearchPanel } from "../search-panel/search-panel";
import { AppFilter } from "../app-filter/app-filter";
import { EmployeesList } from "../employees-list/employees-list";
import { EmployeesAddForm } from "../employees-add-form/employees-add-form";
import { Loader } from "../loader/loader";

import { fetchReducer, INITIAL_STATE } from "../../store/main-page";
import {
  fetchStart,
  fetchError,
  fetchSuccess,
  updadateLocal,
} from "../../store/main-page/actions";

import { serverURL } from "../../constants/server-urls";
import "./app.css";

export const App = () => {
  const [globalState, dispatchToReducer] = useReducer(
    fetchReducer,
    INITIAL_STATE
  );

  const getDataFromServer = async () => {
    dispatchToReducer(fetchStart());
    try {
      await axios.get(serverURL.allEmployees).then((response) => {
        dispatchToReducer(fetchSuccess(response.data));
      });
    } catch ({ message }) {
      dispatchToReducer(fetchError(message));
    }
  };

  useEffect(() => {
    getDataFromServer();
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
      getDataFromServer={getDataFromServer}
      isDataloading={globalState.isDataloading}
    />
  );
};
