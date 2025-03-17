import express from "express";
import cors from "cors";
import studentsRouter from "./routes/students";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/students", studentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
