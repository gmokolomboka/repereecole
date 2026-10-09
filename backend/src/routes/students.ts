import { Router } from "express";
import { TenantRequest } from "../types";
import { StudentService } from "../services/StudentService";
import { sendSuccess, sendError, sendNotFound } from "../utils/response";

const router = Router();

router.get("/", async (req: TenantRequest, res) => {
  try {
    const schoolId = req.schoolId!;
    const classId = req.query.classId as string;
    const status = req.query.status as string;

    let students;
    if (classId) {
      students = await StudentService.getStudentsByClass(schoolId, classId);
    } else if (status) {
      students = await StudentService.getStudentsByStatus(schoolId, status);
    } else {
      students = await StudentService.getStudents(schoolId);
    }

    sendSuccess(res, students);
  } catch (error: any) {
    sendError(res, error.message || "Failed to fetch students", 500);
  }
});

router.post("/", async (req: TenantRequest, res) => {
  try {
    const schoolId = req.schoolId!;
    const { studentNumber, firstName, lastName, birthDate, gender, status } = req.body;

    if (!studentNumber || !firstName || !lastName) {
      return sendError(res, "studentNumber, firstName, and lastName are required", 422);
    }

    const student = await StudentService.createStudent(schoolId, {
      studentNumber,
      firstName,
      lastName,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      gender,
      status,
    });

    sendSuccess(res, student, 201);
  } catch (error: any) {
    sendError(res, error.message || "Failed to create student", 500);
  }
});

router.get("/:id", async (req: TenantRequest, res) => {
  try {
    const schoolId = req.schoolId!;
    const { id } = req.params;

    const student = await StudentService.getStudentById(schoolId, id);

    if (!student) {
      return sendNotFound(res, "Student not found");
    }

    sendSuccess(res, student);
  } catch (error: any) {
    sendError(res, error.message || "Failed to fetch student", 500);
  }
});

router.patch("/:id", async (req: TenantRequest, res) => {
  try {
    const schoolId = req.schoolId!;
    const { id } = req.params;

    const student = await StudentService.updateStudent(schoolId, id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate ? new Date(req.body.birthDate) : undefined,
      gender: req.body.gender,
      status: req.body.status,
    });

    sendSuccess(res, student);
  } catch (error: any) {
    if (error.message === "Student not found") {
      return sendNotFound(res, "Student not found");
    }
    sendError(res, error.message || "Failed to update student", 500);
  }
});

router.delete("/:id", async (req: TenantRequest, res) => {
  try {
    const schoolId = req.schoolId!;
    const { id } = req.params;

    const student = await StudentService.deleteStudent(schoolId, id);

    sendSuccess(res, student);
  } catch (error: any) {
    if (error.message === "Student not found") {
      return sendNotFound(res, "Student not found");
    }
    sendError(res, error.message || "Failed to delete student", 500);
  }
});

router.get("/stats/summary", async (req: TenantRequest, res) => {
  try {
    const schoolId = req.schoolId!;

    const stats = await StudentService.calculateStudentStats(schoolId);

    sendSuccess(res, stats);
  } catch (error: any) {
    sendError(res, error.message || "Failed to calculate student stats", 500);
  }
});

export default router;
