import express from "express";
import cors from "cors";

import employeesRoutes from "./routes/employees";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/employees", employeesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
