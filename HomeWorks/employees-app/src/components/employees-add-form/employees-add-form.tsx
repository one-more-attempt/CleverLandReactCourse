import "./employees-add-form.css";
import { useState } from "react";
import { EmployeeListTypes } from "../../interfaces/interfaces";

interface EmployeesAddFormProps {
  employeeDB: EmployeeListTypes[];
  setDBState: React.Dispatch<React.SetStateAction<EmployeeListTypes[]>>;
  setDBBackup: React.Dispatch<React.SetStateAction<EmployeeListTypes[]>>;
}

export const EmployeesAddForm = ({
  employeeDB,
  setDBState,
  setDBBackup
}: EmployeesAddFormProps) => {
  const [inputName, setInputName] = useState<string>("");
  const [inputSalary, setInputSalary] = useState<string>("");

  const inputNameChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setInputName(newValue);
  };

  const inputSalaryChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const newValue = event.currentTarget.value;
    setInputSalary(newValue);
  };

  const addNewItemHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputSalary.length >= 2 && inputName.length >= 5) {
      let lastID: number = Math.max(...employeeDB.map((item) => item.id));
      const newID = lastID + 1;

      const newItem: EmployeeListTypes = {
        name: inputName,
        salary: Number(inputSalary),
        id: newID,
        increase: false,
      };

      const newItemList: EmployeeListTypes[] = [...employeeDB, newItem];
      setDBState(newItemList);
      setDBBackup(newItemList)
      setInputName("");
      setInputSalary("");
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
          onChange={inputNameChangeHandler}
        />

        <input
          type="number"
          className="form-control new-post-label"
          placeholder="З/П в $?"
          value={inputSalary}
          onChange={inputSalaryChangeHandler}
        />

        <button
          type="submit"
          className="btn btn-outline-light"
          onClick={addNewItemHandler}
        >
          Добавить
        </button>
      </form>
    </div>
  );
};
