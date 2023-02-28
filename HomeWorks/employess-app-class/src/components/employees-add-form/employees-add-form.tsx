import { Component, FormEvent } from "react";
import type { EmployeeListTypes } from "../../types/types";
import "./employees-add-form.css";

type EmployeesAddFormProps = {
  setEmployeesDBState: (value: any) => any;
  employeesDBState: EmployeeListTypes[];
};

type EmployeesAddFormState = {
  employeeInputName: string;
  employeeInputSalary: string;
};

export class EmployeesAddForm extends Component<
  EmployeesAddFormProps,
  EmployeesAddFormState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      employeeInputName: "",
      employeeInputSalary: "",
    };
  }

  render() {
    const { employeeInputName, employeeInputSalary } = this.state;
    const { employeesDBState, setEmployeesDBState } = this.props;

    const changemployeeInputName = (event: FormEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      this.setState({
        employeeInputName: newValue,
      });
    };

    const changemployeeInputSalary = (event: FormEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      this.setState({
        employeeInputSalary: newValue,
      });
    };

    const addNewEmployee = (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (employeeInputSalary.length >= 2 && employeeInputName.length >= 5) {
        let currentLastIdInDB: number = Math.max(
          ...employeesDBState.map(({ id }) => id)
        );
        const newLastID = currentLastIdInDB + 1;
        const newEmployeeItem: EmployeeListTypes = {
          name: employeeInputName,
          salary: Number(employeeInputSalary),
          id: newLastID,
          salaryBonus: false,
          onRise: false,
        };

        const newItemList: EmployeeListTypes[] = [
          ...employeesDBState,
          newEmployeeItem,
        ];
        setEmployeesDBState(newItemList);
        this.setState({ employeeInputName: "", employeeInputSalary: "" });
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
            value={employeeInputName}
            onChange={changemployeeInputName}
          />
          <input
            type="number"
            className="form-control new-post-label"
            placeholder="З/П в $?"
            value={employeeInputSalary}
            onChange={changemployeeInputSalary}
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
  }
}
