import { Employee } from "../../types/employee";

type EmployeeItemProps = { data: Employee };

const EmployeeItem = ({ data }: EmployeeItemProps) => {
  return (
    <tr key={data.id} className="flex flex-row gap-6 text-left">
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.role}</td>
      <td>{data.salary}</td>
    </tr>
  );
};

export default EmployeeItem;
