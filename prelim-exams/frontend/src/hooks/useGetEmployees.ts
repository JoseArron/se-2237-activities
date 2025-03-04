import { useEffect, useState } from "react";
import { Employee } from "../types/employee";

const useGetEmployees = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/employees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const employees = await res.json();
      setData(employees);
    } catch {
      setError("Error fetching employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return { data, loading, error };
};

export default useGetEmployees;
