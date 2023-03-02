import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import axios from "axios";
import { FetchReducerActions } from "../../enums/fetchReducerActions";
import {
  FetchReducerStateTypes,
  FetchReducerActionType,
} from "../../reducer/reducer";
import { serverURL } from "../../constants/server-urls";
import type { EmployeeListTypes } from "../../types/types";
import "./employees-add-form.css";

type EmployeesAddFormProps = {
  globalState: FetchReducerStateTypes;
  dispatchToFetchReducer: Dispatch<FetchReducerActionType>;
};

export const EmployeesAddForm = ({
  globalState,
  dispatchToFetchReducer,
}: EmployeesAddFormProps) => {
  const [inputName, setInputName] = useState<string>("");
  const [inputSalary, setInputSalary] = useState<string>("");

  const changeInputName = (event: React.FormEvent<HTMLInputElement>) => {
    const newInputNameValue = event.currentTarget.value;
    setInputName(newInputNameValue);
  };

  const changeInputSalary = (event: React.FormEvent<HTMLInputElement>) => {
    const newInputSalaryValue = event.currentTarget.value;
    setInputSalary(newInputSalaryValue);
  };

  const addNewEmployee = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (inputSalary.length >= 2 && inputName.length >= 5) {
      let currentLastIdInDB: number = Math.max(
        ...globalState.employeesData.map(({ id }) => id)
      );
      const newLastID = currentLastIdInDB + 1;

      const newEmployeeItem: EmployeeListTypes = {
        name: inputName,
        salary: Number(inputSalary),
        id: newLastID,
        isHaveSalaryBonus: false,
        onRise: false,
      };

      dispatchToFetchReducer({ type: FetchReducerActions.FETCH_START });
      axios
        .post(serverURL.allEmployees, newEmployeeItem)
        .then(() => {
          axios.get(serverURL.allEmployees).then((response) => {
            const dataFromServer = response.data;
            dispatchToFetchReducer({
              type: FetchReducerActions.FETCH_SUCCESS,
              payload: dataFromServer,
            });
          });
        })
        .catch(function (error) {
          const errorMessage: string = error.message;
          dispatchToFetchReducer({
            type: FetchReducerActions.FETCH_ERROR,
            payload: errorMessage,
          });
        });
    }
  };
  return (
    <div className="app-add-form">
      <h3>Добавьте нового сотрудника</h3>
      <form className="add-form d-flex">
        <input
          type="text"
          className="form-control new-post-label"
          placeholder="Как его зовут?"
          value={inputName}
          onChange={changeInputName}
        />

        <input
          type="number"
          className="form-control new-post-label"
          placeholder="З/П в $?"
          value={inputSalary}
          onChange={changeInputSalary}
        />

        <button
          type="submit"
          className="btn btn-outline-light"
          onClick={addNewEmployee}
        >
          Добавить
        </button>
      </form>
    </div>
  );
};
