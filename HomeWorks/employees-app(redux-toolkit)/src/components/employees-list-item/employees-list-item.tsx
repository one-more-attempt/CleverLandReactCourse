import classNames from "classnames";
import type { EmployeeListTypes } from "../../types/types";
import {
  onDeleteItemFromServer,
  onChangeSalaryBonusOnServer,
  onChangeRiseStatusOnServer,
} from "../../store/server-requests-dispatch";
import "./employees-list-item.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";

type EmployeesListItemProps = {
  listItem: EmployeeListTypes;
};

export const EmployeesListItem = ({ listItem }: EmployeesListItemProps) => {
  const globalState = useAppSelector((state) => state.employeesReducer);
  const dispatch = useAppDispatch();

  const findCurrentEmployeeInDB = () => {
    const foundItem = globalState.employeesData.find(
      ({ id }) => id === listItem.id
    );
    return foundItem;
  };
  const giveSalaryBonusToEmployee = () => {
    const item = findCurrentEmployeeInDB();
    if (item) dispatch(onChangeSalaryBonusOnServer(item));
  };

  const deleteEmployee = () => {
    const item = findCurrentEmployeeInDB();
    if (item) dispatch(onDeleteItemFromServer(item));
  };

  const riseEmployee = () => {
    const item = findCurrentEmployeeInDB();
    if (item) dispatch(onChangeRiseStatusOnServer(item));
  };

  const itemStyle = classNames(
    "list-group-item d-flex justify-content-between ",
    {
      increase: listItem.isHaveSalaryBonus,
      like: listItem.onRise,
    }
  );

  return (
    <li className={itemStyle}>
      <span className="list-group-item-label" onClick={riseEmployee}>
        {listItem.name}{" "}
      </span>
      <input
        type="text"
        className="list-group-item-input"
        defaultValue={`${listItem.salary}$`}
      />
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn-cookie btn-sm "
          onClick={giveSalaryBonusToEmployee}
        >
          <i className="fas fa-cookie"></i>
        </button>

        <button
          type="button"
          className="btn-trash btn-sm "
          onClick={deleteEmployee}
        >
          <i className="fas fa-trash"></i>
        </button>

        <i className="fas fa-star"></i>
      </div>
    </li>
  );
};
