import React from "react";
import { Student } from "../types/student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent, updateStudent } from "../api/students";

interface StudentFormProps {
    editingStudent?: Student;
    onCancel: () => void;
}

export const StudentForm = ({ editingStudent, onCancel }: StudentFormProps) => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
    });
    const updateMutation = useMutation({
        mutationFn: (student: Student) => updateStudent(student.id!, student),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const studentData = Object.fromEntries(formData.entries());

        const student: Student = {
            ...studentData,
            expectedSalary: Number(studentData.expectedSalary),
            expectedDateOfDefense: studentData.expectedDateOfDefense,
        } as Student;

        if (editingStudent?.id) {
            updateMutation.mutate({ ...student, id: editingStudent.id });
        } else {
            createMutation.mutate(student);
        }
        onCancel();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
        >
            <input
                name="firstName"
                placeholder="First Name"
                defaultValue={editingStudent?.firstName}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <input
                name="lastName"
                placeholder="Last Name"
                defaultValue={editingStudent?.lastName}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <input
                name="groupName"
                placeholder="Group Name"
                defaultValue={editingStudent?.groupName}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <input
                name="role"
                placeholder="Role"
                defaultValue={editingStudent?.role}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <input
                name="expectedSalary"
                type="number"
                placeholder="Expected Salary"
                defaultValue={editingStudent?.expectedSalary}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <input
                name="expectedDateOfDefense"
                type="date"
                defaultValue={
                    editingStudent?.expectedDateOfDefense.split("T")[0]
                }
                required
                className="p-2 border border-gray-300 rounded"
            />
            <div className="form-actions flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    {editingStudent ? "Update" : "Create"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-200 text-gray-600 p-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};
