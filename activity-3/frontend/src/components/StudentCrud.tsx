import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudents, deleteStudent } from "../api/students";
import { StudentForm } from "./StudentForm";
import { StudentList } from "./StudentList";
import { Student } from "../types/student";

export default function StudentCrud() {
    const queryClient = useQueryClient();

    const [editingStudent, setEditingStudent] = useState<Student | undefined>();

    const { data: students, isLoading } = useQuery({
        queryKey: ["students"],
        queryFn: fetchStudents,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
    });

    return (
        <div className="student-crud container mx-auto p-4">
            <h2 className="text-2xl mb-4">
                {editingStudent ? "Edit Student" : "Add New Student"}
            </h2>
            <StudentForm
                editingStudent={editingStudent}
                onCancel={() => setEditingStudent(undefined)}
            />

            <h2 className="text-2xl mt-8 mb-4">Student List</h2>
            {isLoading ? (
                <div>Loading students...</div>
            ) : students?.length ? (
                <StudentList
                    students={students}
                    onEdit={setEditingStudent}
                    onDelete={(id) => deleteMutation.mutate(id)}
                />
            ) : (
                <div>No students found</div>
            )}
        </div>
    );
}
