import { Router } from "express";
import tasksRouter from "./tasks";
import eventsRouter from "./events";
import studentsRouter from "./students";
import attendanceRouter from "./attendance";

const router = Router();

router.use("/tasks", tasksRouter);
router.use("/events", eventsRouter);
router.use("/students", studentsRouter);
router.use("/attendance", attendanceRouter);

export default router;
