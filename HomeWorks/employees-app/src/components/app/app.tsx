import { useState } from "react";
import { AppInfo } from "../app-info/app-info";
import { SearchPanel } from "../search-panel/search-panel";
import { AppFilter } from "../app-filter/app-filter";
import { EmployeesList } from "../employees-list/employees-list";
import { EmployeesAddForm } from "../employees-add-form/employees-add-form";
import { employeeDB } from "../../constants/employeeDB";
import type { EmployeeListTypes } from "../../types/types";
import "./app.css";

export const App = () => {
  const [employeesDBState, setEmployeesDBState] = useState(employeeDB);
  const [employeesDBBackup, setEmployeesDBBackup] = useState(employeesDBState);

  return (
    <div className="app">
      <AppInfo employeesDBBackup={employeesDBBackup} employeesDBState={employeesDBState} />

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
};
