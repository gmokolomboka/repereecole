import { Router } from "express";
import { TenantRequest } from "../types";
import { TaskService } from "../services/TaskService";
import { sendSuccess, sendError, sendNotFound } from "../utils/response";

const router = Router();

router.get("/", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const schoolId = req.schoolId;
    const priority = req.query.priority as string;

    let tasks;
    if (priority) {
      tasks = await TaskService.getTasksByPriority(tenantId, priority, schoolId);
    } else {
      tasks = await TaskService.getTasks(tenantId, schoolId);
    }

    sendSuccess(res, tasks);
  } catch (error: any) {
    sendError(res, error.message || "Failed to fetch tasks", 500);
  }
});

router.post("/", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const schoolId = req.schoolId!;
    const { title, description, priority, status, dueAt } = req.body;

    if (!title) {
      return sendError(res, "Title is required", 422);
    }

    const createdById = req.body.createdById || "admin-user";

    const task = await TaskService.createTask(tenantId, schoolId, createdById, {
      title,
      description,
      priority,
      status,
      dueAt: dueAt ? new Date(dueAt) : undefined,
    });

    sendSuccess(res, task, 201);
  } catch (error: any) {
    sendError(res, error.message || "Failed to create task", 500);
  }
});

router.get("/:id", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const { id } = req.params;

    const task = await TaskService.getTaskById(tenantId, id);

    if (!task) {
      return sendNotFound(res, "Task not found");
    }

    sendSuccess(res, task);
  } catch (error: any) {
    sendError(res, error.message || "Failed to fetch task", 500);
  }
});

router.patch("/:id", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const { id } = req.params;

    const task = await TaskService.updateTask(tenantId, id, {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      dueAt: req.body.dueAt ? new Date(req.body.dueAt) : undefined,
    });

    sendSuccess(res, task);
  } catch (error: any) {
    if (error.message === "Task not found") {
      return sendNotFound(res, "Task not found");
    }
    sendError(res, error.message || "Failed to update task", 500);
  }
});

router.delete("/:id", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const { id } = req.params;

    const task = await TaskService.deleteTask(tenantId, id);

    sendSuccess(res, task);
  } catch (error: any) {
    if (error.message === "Task not found") {
      return sendNotFound(res, "Task not found");
    }
    sendError(res, error.message || "Failed to delete task", 500);
  }
});

router.get("/stats/kpi", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const schoolId = req.schoolId;

    const kpis = await TaskService.calculateKPIs(tenantId, schoolId);

    sendSuccess(res, kpis);
  } catch (error: any) {
    sendError(res, error.message || "Failed to calculate KPIs", 500);
  }
});

export default router;
