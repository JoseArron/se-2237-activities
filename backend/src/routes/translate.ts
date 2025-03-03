import { Router } from "express";
import { translateToChinese } from "../utils/translateToChinese";

const router = Router();

router.get("/", (req, res) => {
  res.send("this is the translate route");
});

router.post("/", (req, res) => {
  const { input } = req.body as { input: string };

  if (!input) {
    res.status(400);
    res.send({ error: "Input is empty" });
    return;
  }

  res.status(200);
  res.send({ message: translateToChinese(input) });
});

export default router;
