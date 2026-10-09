import prisma from "../db/prisma";
import { StudentInput } from "../types";

export class StudentService {
  static async getStudents(schoolId: string) {
    return prisma.student.findMany({
      where: { schoolId },
      include: {
        classes: {
          include: {
            class: {
              select: { id: true, name: true, level: true },
            },
          },
        },
        attendance: {
          orderBy: { date: "desc" },
          take: 10,
        },
      },
      orderBy: { lastName: "asc" },
    });
  }

  static async getStudentById(schoolId: string, id: string) {
    return prisma.student.findFirst({
      where: { id, schoolId },
      include: {
        classes: {
          include: {
            class: {
              select: { id: true, name: true, level: true },
            },
          },
        },
        guardians: {
          include: {
            guardian: {
              select: { id: true, firstName: true, lastName: true, email: true, phone: true },
            },
          },
        },
        attendance: {
          orderBy: { date: "desc" },
          take: 30,
        },
      },
    });
  }

  static async getStudentsByClass(schoolId: string, classId: string) {
    return prisma.student.findMany({
      where: {
        schoolId,
        classes: {
          some: {
            classId,
          },
        },
      },
      include: {
        classes: {
          include: {
            class: {
              select: { id: true, name: true, level: true },
            },
          },
        },
      },
      orderBy: { lastName: "asc" },
    });
  }

  static async getStudentsByStatus(schoolId: string, status: string) {
    return prisma.student.findMany({
      where: {
        schoolId,
        status: status.toUpperCase(),
      },
      include: {
        classes: {
          include: {
            class: {
              select: { id: true, name: true, level: true },
            },
          },
        },
      },
      orderBy: { lastName: "asc" },
    });
  }

  static async createStudent(schoolId: string, input: StudentInput) {
    return prisma.student.create({
      data: {
        schoolId,
        studentNumber: input.studentNumber,
        firstName: input.firstName,
        lastName: input.lastName,
        birthDate: input.birthDate,
        gender: input.gender,
        status: input.status || "ACTIVE",
      },
      include: {
        classes: {
          include: {
            class: {
              select: { id: true, name: true, level: true },
            },
          },
        },
      },
    });
  }

  static async updateStudent(schoolId: string, id: string, input: Partial<StudentInput>) {
    const student = await prisma.student.findFirst({
      where: { id, schoolId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    return prisma.student.update({
      where: { id },
      data: {
        ...input,
        updatedAt: new Date(),
      },
      include: {
        classes: {
          include: {
            class: {
              select: { id: true, name: true, level: true },
            },
          },
        },
      },
    });
  }

  static async deleteStudent(schoolId: string, id: string) {
    const student = await prisma.student.findFirst({
      where: { id, schoolId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    return prisma.student.delete({
      where: { id },
      include: {
        classes: {
          include: {
            class: {
              select: { id: true, name: true, level: true },
            },
          },
        },
      },
    });
  }

  static async calculateStudentStats(schoolId: string) {
    const students = await prisma.student.findMany({
      where: { schoolId },
    });

    return {
      total: students.length,
      active: students.filter((s) => s.status === "ACTIVE").length,
      inactive: students.filter((s) => s.status === "INACTIVE").length,
      transferred: students.filter((s) => s.status === "TRANSFERRED").length,
      graduated: students.filter((s) => s.status === "GRADUATED").length,
    };
  }
}
