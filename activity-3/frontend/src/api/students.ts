import { Student } from "../types/student";

const API_URL = "http://localhost:3000/api/students/";

export const fetchStudents = async (): Promise<Student[]> => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createStudent = async (student: Student): Promise<Student> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
    });
    return response.json();
};

export const updateStudent = async (
    id: string,
    student: Student,
): Promise<Student> => {
    const response = await fetch(`${API_URL}${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
    });
    return response.json();
};

export const deleteStudent = async (id: string): Promise<void> => {
    await fetch(`${API_URL}${id}`, { method: "DELETE" });
};
