import { useState, useEffect } from "react";
import axios from "axios";

import { AppInfo } from "../app-info/app-info";
import { SearchPanel } from "../search-panel/search-panel";
import { AppFilter } from "../app-filter/app-filter";
import { EmployeesList } from "../employees-list/employees-list";
import { EmployeesAddForm } from "../employees-add-form/employees-add-form";
import { Loader } from "../loader/loader";

import { employeeDB as employeeMockedinitialState } from "../../constants/employeeDB";
import { serverURL } from "../../constants/server-url";
import type { EmployeeListTypes } from "../../types/types";
import "./app.css";

export const App = () => {
  const [employeesDBState, setEmployeesDBState] = useState(
    employeeMockedinitialState
  );
  const [employeesDBBackup, setEmployeesDBBackup] = useState(employeesDBState);
  const [dataFromServerIsIsReady, setDataFromServerIsIsReady] = useState(false);

  useEffect(() => {
    axios.get(serverURL.allEmployees).then((response) => {
      const dataFromServer = response.data;
      setEmployeesDBState(dataFromServer);
      setDataFromServerIsIsReady(true);
    });
  }, []);

  if (dataFromServerIsIsReady) {
    return (
      <div className="app">
        <AppInfo
          employeesDBBackup={employeesDBBackup}
          employeesDBState={employeesDBState}
        />

        <div className="search-panel">
          <SearchPanel
            employeesDBBackup={employeesDBBackup}
            setEmployeesDBBackup={setEmployeesDBBackup}
            employeesDBState={employeesDBState}
            setEmployeesDBState={setEmployeesDBState}
          />
          <AppFilter
            employeesDBBackup={employeesDBBackup}
            setEmployeesDBBackup={setEmployeesDBBackup}
            employeesDBState={employeesDBState}
            setEmployeesDBState={setEmployeesDBState}
          />
        </div>

        <EmployeesList
          employeesDBState={employeesDBState}
          setEmployeesDBState={setEmployeesDBState}
          setEmployeesDBBackup={setEmployeesDBBackup}
        />
        <EmployeesAddForm
          employeesDBState={employeesDBState}
          setEmployeesDBState={setEmployeesDBState}
          setEmployeesDBBackup={setEmployeesDBBackup}
        />
      </div>
    );
  } else {
    return <Loader />;
  }
};
