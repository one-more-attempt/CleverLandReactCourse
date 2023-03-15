import { useEffect } from "react";
import { AppInfo } from "../app-info/app-info";
import { SearchPanel } from "../search-panel/search-panel";
import { AppFilter } from "../app-filter/app-filter";
import { EmployeesList } from "../employees-list/employees-list";
import { EmployeesAddForm } from "../employees-add-form/employees-add-form";
import { Loader } from "../loader/loader";
import { getInitialDataFromServer } from "../../store/server-requests-dispatch";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import "./app.css";

export const App = () => {
  const globalState = useAppSelector((state) => state.employeesReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInitialDataFromServer());
  }, []);

  if (globalState.dataFromServerIsReady) {
    return (
      <div className="app">
        <AppInfo />
        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList />
        <EmployeesAddForm />
      </div>
    );
  }
  return <Loader />;
};
