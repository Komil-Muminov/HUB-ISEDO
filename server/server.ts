import express, { Request, Response, Router } from "express";
import createUser from "./routes/users/createUser";
import userRoutes from "./routes/users";
// import organizationsRoutes from "./routes/organizations";
import organizationsRoutes from "./routes/organizations";
import documentsRoutes from "./routes/documents";
import workingHoursRoutes from "./routes/workingHours";
import cors from "cors";

// const router = Router();

const app = express();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/users", userRoutes);
app.use("/organizations", organizationsRoutes);
app.use("/documents", documentsRoutes);
app.use("/workingHours", workingHoursRoutes);

// app.use(router);
app.use(express.static("uploads"));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT} порту`);
});
