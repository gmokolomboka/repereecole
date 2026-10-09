import prisma from "../db/prisma";
import { TaskInput } from "../types";

export class TaskService {
  static async getTasks(tenantId: string, schoolId?: string) {
    return prisma.task.findMany({
      where: {
        tenantId,
        ...(schoolId && { schoolId }),
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getTaskById(tenantId: string, id: string) {
    return prisma.task.findFirst({
      where: { id, tenantId },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  static async getTasksByPriority(tenantId: string, priority: string, schoolId?: string) {
    return prisma.task.findMany({
      where: {
        tenantId,
        priority: priority.toUpperCase(),
        ...(schoolId && { schoolId }),
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  static async createTask(tenantId: string, schoolId: string, createdById: string, input: TaskInput) {
    return prisma.task.create({
      data: {
        tenantId,
        schoolId,
        createdById,
        title: input.title,
        description: input.description,
        priority: input.priority || "NORMAL",
        status: input.status || "TODO",
        dueAt: input.dueAt,
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  static async updateTask(tenantId: string, id: string, input: Partial<TaskInput>) {
    const task = await prisma.task.findFirst({
      where: { id, tenantId },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return prisma.task.update({
      where: { id },
      data: {
        ...input,
        updatedAt: new Date(),
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  static async deleteTask(tenantId: string, id: string) {
    const task = await prisma.task.findFirst({
      where: { id, tenantId },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return prisma.task.delete({
      where: { id },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  static async calculateKPIs(tenantId: string, schoolId?: string) {
    const tasks = await prisma.task.findMany({
      where: {
        tenantId,
        ...(schoolId && { schoolId }),
      },
    });

    return {
      urgent: tasks.filter((t) => t.priority === "URGENT").length,
      overdue: tasks.filter((t) => t.priority === "HIGH").length,
      today: tasks.length,
      pinned: 0,
    };
  }
}
