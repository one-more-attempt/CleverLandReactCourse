import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import { AppInfo } from "../app-info/app-info";
import { SearchPanel } from "../search-panel/search-panel";
import { AppFilter } from "../app-filter/app-filter";
import { EmployeesList } from "../employees-list/employees-list";
import { EmployeesAddForm } from "../employees-add-form/employees-add-form";
import { Loader } from "../loader/loader";

import { fetchReducer, INITIAL_STATE } from "../../store";
import { getInitialDataFromServer } from "../../store/server-requests";
import { serverURL } from "../../constants/server-urls";

import "./app.css";

export const App = () => {
  // const [globalState, dispatchToReducer] = useReducer(
  //   fetchReducer,
  //   INITIAL_STATE
  // );

  // useEffect(() => {
  //   getInitialDataFromServer(dispatchToReducer);
  // }, []);

  // if (globalState.dataFromServerIsReady) {
  //   return (
  //     <div className="app">
  //       <AppInfo
  //         globalState={globalState}
  //         dispatchToReducer={dispatchToReducer}
  //       />

  //       <div className="search-panel">
  //         <SearchPanel
  //           globalState={globalState}
  //           dispatchToReducer={dispatchToReducer}
  //         />
  //         <AppFilter
  //           globalState={globalState}
  //           dispatchToReducer={dispatchToReducer}
  //         />
  //       </div>

  //       <EmployeesList
  //         globalState={globalState}
  //         dispatchToReducer={dispatchToReducer}
  //       />
  //       <EmployeesAddForm
  //         globalState={globalState}
  //         dispatchToReducer={dispatchToReducer}
  //       />
  //     </div>
  //   );
  // }
  return (
    <div>lol</div>
    //   <Loader
    //     errorMessage={globalState.errorMessage}
    //     getInitialDataFromServer={getInitialDataFromServer}
    //     isDataloading={globalState.isDataloading}
    //     dispatchToReducer={dispatchToReducer}
    //   />
  );
};
