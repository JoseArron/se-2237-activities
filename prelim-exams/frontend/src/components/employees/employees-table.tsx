import { Employee } from "../../types/employee";
import EmployeeItem from "./employee-item";

export type EmployeesTableProps = {
  data: Employee[];
  label?: string;
  className?: string;
};

const EmployeesTable = ({ data, label, className }: EmployeesTableProps) => {
  return (
    <table
      className={
        " bg-white text-black text-lg items-center flex flex-col max-h-fit text-left" +
        className
      }
    >
      {label && <th className="mt-2">{label}</th>}
      <tbody className="flex flex-col gap-2 p-8 h-96 overflow-y-scroll">
        <tr className="flex flex-row gap-6">
          <th>id</th>
          <th>name</th>
          <th>role</th>
          <th>salary</th>
        </tr>
        {data.map((employee) => {
          return <EmployeeItem data={employee} />;
        })}
      </tbody>
    </table>
  );
};

export default EmployeesTable;
