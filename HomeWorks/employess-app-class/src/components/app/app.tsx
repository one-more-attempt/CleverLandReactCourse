import { Component } from "react";
import { AppInfo } from "../app-info/app-info";
import { SearchPanel } from "../search-panel/search-panel";
import { AppFilter } from "../app-filter/app-filter";
import { EmployeesList } from "../employees-list/employees-list";
import { EmployeesAddForm } from "../employees-add-form/employees-add-form";
import { employeeDB } from "../../constants/employeeDB";
import type { EmployeeListTypes } from "../../types/types";
import "./app.css";

type AppState = {
  employeesDBState: EmployeeListTypes[];
  employeesDBStateCopy: EmployeeListTypes[];
};

export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      employeesDBState: employeeDB,
      employeesDBStateCopy: employeeDB,
    };

    this.setState({
      employeesDBStateCopy: this.state.employeesDBState,
    });
  }

  setEmployeesDBState = (value: EmployeeListTypes[]) => {
    this.setState({ employeesDBState: value });
  };
  setEmployeesDBStateCopy = (value: EmployeeListTypes[]) => {
    this.setState({ employeesDBStateCopy: value });
  };

  render() {
    const employeesDBState = this.state.employeesDBState;
    const employeesDBStateCopy = this.state.employeesDBStateCopy;
    const setEmployeesDBState = this.setEmployeesDBState;
    const setEmployeesDBStateCopy = this.setEmployeesDBStateCopy;

    return (
      <div className="app">
        <AppInfo
          employeesDBStateCopy={employeesDBStateCopy}
          setEmployeesDBStateCopy={setEmployeesDBStateCopy}
        />
        <div className="search-panel">
          <SearchPanel
            employeesDBState={employeesDBState}
            employeesDBStateCopy={employeesDBStateCopy}
            setEmployeesDBState={setEmployeesDBState}
            setEmployeesDBStateCopy={setEmployeesDBStateCopy}
          />
          <AppFilter
            employeesDBState={employeesDBState}
            employeesDBStateCopy={employeesDBStateCopy}
            setEmployeesDBState={setEmployeesDBState}
            setEmployeesDBStateCopy={setEmployeesDBStateCopy}
          />
        </div>
        <EmployeesList
          employeesDBState={employeesDBState}
          setEmployeesDBState={setEmployeesDBState}
        />
        <EmployeesAddForm
          employeesDBState={employeesDBState}
          setEmployeesDBState={setEmployeesDBState}
        />
      </div>
    );
  }
}
