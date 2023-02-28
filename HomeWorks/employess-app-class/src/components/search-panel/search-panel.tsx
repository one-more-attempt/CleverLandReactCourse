import { Component, FormEvent } from "react";
import "./search-panel.css";
import type { EmployeeListTypes } from "../../types/types";

type SearchPanelProps = {
  employeesDBState: EmployeeListTypes[];
  employeesDBStateCopy: EmployeeListTypes[];
  setEmployeesDBState: (value: EmployeeListTypes[]) => void;
  setEmployeesDBStateCopy: (value: EmployeeListTypes[]) => void;
};

type SearchPanelState = {
  inputSearchValue: string;
};

export class SearchPanel extends Component<SearchPanelProps, SearchPanelState> {
  constructor(props: SearchPanelProps) {
    super(props);
    this.state = {
      inputSearchValue: "",
    };
  }

  render() {
    const { inputSearchValue } = this.state;
    const { employeesDBStateCopy, setEmployeesDBState } = this.props;

    const findEmployee = (event: FormEvent<HTMLInputElement>) => {
      const newInputValue = event.currentTarget.value;
      this.setState({ inputSearchValue: newInputValue });

      const newList = employeesDBStateCopy.filter(({ name }) =>
        name.toLocaleLowerCase().includes(newInputValue.toLowerCase())
      );
      setEmployeesDBState(newList);
    };

    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="Найти сотрудника"
        value={inputSearchValue}
        onChange={findEmployee}
      />
    );
  }
}


