import { Router } from "express";
import { employeesData } from "../utils/employeeData";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json(employeesData);
});

export default router;
