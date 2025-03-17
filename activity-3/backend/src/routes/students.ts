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

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

export default router;
