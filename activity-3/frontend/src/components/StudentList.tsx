import { Student } from "../types/student";

interface StudentListProps {
    students: Student[];
    onEdit: (student: Student) => void;
    onDelete: (id: string) => void;
}

export const StudentList = ({
    students,
    onEdit,
    onDelete,
}: StudentListProps) => (
    <div className="student-list flex flex-col gap-4">
        {students.map((student) => (
            <div
                key={student.id}
                className="student-item bg-gray-100 p-4 rounded"
            >
                <div className="student-info flex gap-2">
                    <span className="text-lg">
                        {student.firstName} {student.lastName}
                    </span>
                    <span>Group: {student.groupName}</span>
                    <span>Role: {student.role}</span>
                    <span>Expected Salary: {student.expectedSalary}</span>
                    <span>
                        Expected Date of Defense:{" "}
                        {student.expectedDateOfDefense.split("T")[0]}
                    </span>
                </div>
                <div className="student-actions flex gap-2">
                    <button
                        onClick={() => onEdit(student)}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => student.id && onDelete(student.id)}
                        className="bg-red-500 text-white p-2 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))}
    </div>
);
