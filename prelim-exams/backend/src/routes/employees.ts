import { Router } from "express";
import { employeesData } from "../utils/employeeData";

const router = Router();

router.get("/", (_req, res) => {
  console.log("get emnployees");
  res.status(200);
  res.send(employeesData);
});

export default router;
