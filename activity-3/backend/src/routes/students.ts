import { Router } from "express";
import { prisma } from "../db/client";
import { StudentInput } from "../types/student";

const router = Router();

router.get("/", async (req, res) => {
    prisma.students
        .findMany()
        .then((students) => {
            res.status(200).json(students);
        })
        .catch(() => {
            res.status(500).json({ message: "Failed to fetch students" });
        })
        .finally(() => res.status(200));
});

router.post("/", async (req, res) => {
    const data: StudentInput = req.body;
    prisma.students
        .create({
            data: {
                ...data,
                // convert received date string to Date object
                expectedDateOfDefense: new Date(data.expectedDateOfDefense),
            },
        })
        .then((student) => {
            res.status(201).json(student);
        })
        .catch(() => {
            res.status(500).json({ message: "Failed to create student" });
        });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const newData: StudentInput = req.body;
    prisma.students
        .update({
            where: { id },
            data: {
                ...newData,
                expectedDateOfDefense: new Date(newData.expectedDateOfDefense),
            },
        })
        .then((student) => {
            res.status(202).json(student);
        })
        .catch(() => {
            res.status(500).json({ message: `Failed to update student ${id}` });
        });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    prisma.students
        .delete({
            where: { id },
        })
        .then((student) => {
            res.status(203).json(student);
        })
        .catch(() => {
            res.status(500).json({ message: `Failed to delete student ${id}` });
        });
});

export default router;
