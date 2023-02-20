import { AppInfo } from "../app-info/app-info";
import { SearchPanel } from "../search-panel/search-panel";
import { AppFilter } from "../app-filter/app-filter";
import { EmployeesList } from "../employees-list/employees-list";
import { EmployeesAddForm } from "../employees-add-form/employees-add-form";
import { EmployeeListTypes } from "../../interfaces/interfaces";
import { useState } from "react";
import { employeeDB } from "../../constants/constants";
import "./app.css";

export function App() {
  const [DBState, setDBState] = useState<EmployeeListTypes[]>(employeeDB);
  const [DBBackup, setDBBackup] = useState<EmployeeListTypes[]>(DBState);

  return (
    <div className="app">
      <AppInfo DBBackup={DBBackup} employeeDB={DBState} />

      <div className="search-panel">
        <SearchPanel
          DBBackup={DBBackup}
          setDBBackup={setDBBackup}
          employeeDB={DBState}
          setDBState={setDBState}
        />
        <AppFilter
          DBBackup={DBBackup}
          setDBBackup={setDBBackup}
          employeeDB={DBState}
          setDBState={setDBState}
        />
      </div>

      <EmployeesList
        employeeDB={DBState}
        setDBState={setDBState}
        setDBBackup={setDBBackup}
      />
      <EmployeesAddForm
        employeeDB={DBState}
        setDBState={setDBState}
        setDBBackup={setDBBackup}
      />
    </div>
  );
}
