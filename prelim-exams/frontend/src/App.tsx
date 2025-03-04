import EmployeesTable from "./components/employees/employees-table";
import useGetEmployees from "./hooks/useGetEmployees";

export default  function App() {
  const {data: employees, loading, error} = useGetEmployees()

  if (error) return <div>{error}</div>

  if (loading) return <div className="animate-spin" > Loading..</div>

  return (
    <div className="flex sm:flex-row flex-col mx-4 min-h-screen gap-4 w-full">
     <EmployeesTable data ={employees} label="All Employees"/>
     <EmployeesTable data ={employees.filter((employee) => employee.salary < 50000)} label="Entry Level" />
     <EmployeesTable data ={employees.filter((employee) => employee.salary >= 50000)} label="Senior"/>
    </div>
  );
}
