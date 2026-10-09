import { Router } from "express";
import { TenantRequest } from "../types";
import { AttendanceService } from "../services/AttendanceService";
import { sendSuccess, sendError } from "../utils/response";

const router = Router();

router.get("/", async (req: TenantRequest, res) => {
  try {
    const schoolId = req.schoolId!;
    const classId = req.query.classId as string;

    const stats = await AttendanceService.getAttendanceStats(schoolId, classId);

    sendSuccess(res, stats);
  } catch (error: any) {
    sendError(res, error.message || "Failed to fetch attendance stats", 500);
  }
});

router.get("/weekly", async (req: TenantRequest, res) => {
  try {
    const schoolId = req.schoolId!;
    const classId = req.query.classId as string;

    const trend = await AttendanceService.getWeeklyTrend(schoolId, classId);

    sendSuccess(res, trend);
  } catch (error: any) {
    sendError(res, error.message || "Failed to fetch weekly trend", 500);
  }
});

router.get("/absent", async (req: TenantRequest, res) => {
  try {
    const schoolId = req.schoolId!;
    const classId = req.query.classId as string;

    const absents = await AttendanceService.getAbsentStudents(schoolId, classId);

    sendSuccess(res, absents);
  } catch (error: any) {
    sendError(res, error.message || "Failed to fetch absent students", 500);
  }
});

router.get("/classes", async (req: TenantRequest, res) => {
  try {
    const schoolId = req.schoolId!;

    const classes = await AttendanceService.getAllClasses(schoolId);

    sendSuccess(res, classes);
  } catch (error: any) {
    sendError(res, error.message || "Failed to fetch classes", 500);
  }
});

export default router;
