export const serverURL = {
  allEmployees: "http://localhost:3010/employees",
  employee: (value: number) => {
    return `http://localhost:3010/employees/${value}`;
  },
};
