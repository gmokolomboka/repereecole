import prisma from "../db/prisma";

export class AttendanceService {
  static async getAttendanceStats(schoolId: string, classId?: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let studentIds: string[] = [];

    if (classId) {
      const students = await prisma.student.findMany({
        where: {
          schoolId,
          classes: {
            some: {
              classId,
            },
          },
        },
        select: { id: true },
      });
      studentIds = students.map((s) => s.id);
    } else {
      const students = await prisma.student.findMany({
        where: { schoolId },
        select: { id: true },
      });
      studentIds = students.map((s) => s.id);
    }

    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        schoolId,
        studentId: { in: studentIds },
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const present = attendanceRecords.filter((a) => a.status === "PRESENT").length;
    const absent = attendanceRecords.filter((a) => a.status === "ABSENT").length;
    const late = attendanceRecords.filter((a) => a.status === "LATE").length;
    const justified = attendanceRecords.filter((a) => a.justificationStatus === "JUSTIFIED").length;

    const total = studentIds.length;
    const percentage = total > 0 ? Math.round(((present + late) / total) * 100) : 0;

    return {
      classId: classId || "all",
      present,
      absent,
      late,
      justified,
      total,
      percentage,
    };
  }

  static async getWeeklyTrend(schoolId: string, classId?: string) {
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
    const trend = [];

    let studentIds: string[] = [];

    if (classId) {
      const students = await prisma.student.findMany({
        where: {
          schoolId,
          classes: {
            some: {
              classId,
            },
          },
        },
        select: { id: true },
      });
      studentIds = students.map((s) => s.id);
    } else {
      const students = await prisma.student.findMany({
        where: { schoolId },
        select: { id: true },
      });
      studentIds = students.map((s) => s.id);
    }

    const today = new Date();
    let mondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay();

    for (let i = 0; i < 5; i++) {
      const dayDate = new Date(today);
      dayDate.setDate(dayDate.getDate() + mondayOffset + i);
      dayDate.setHours(0, 0, 0, 0);

      const dayEndDate = new Date(dayDate);
      dayEndDate.setHours(23, 59, 59, 999);

      const dayAttendance = await prisma.attendance.findMany({
        where: {
          schoolId,
          studentId: { in: studentIds },
          date: {
            gte: dayDate,
            lte: dayEndDate,
          },
        },
      });

      const present = dayAttendance.filter((a) => a.status === "PRESENT").length;
      const total = studentIds.length;
      const percentage = total > 0 ? Math.round(((present) / total) * 100) : 0;

      trend.push({
        day: days[i],
        percentage,
        date: dayDate.toISOString().split("T")[0],
      });
    }

    return trend;
  }

  static async getAbsentStudents(schoolId: string, classId?: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let query: any = {
      schoolId,
      status: "ABSENT",
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    };

    if (classId) {
      const students = await prisma.student.findMany({
        where: {
          schoolId,
          classes: {
            some: {
              classId,
            },
          },
        },
        select: { id: true },
      });
      const studentIds = students.map((s) => s.id);
      query.studentId = { in: studentIds };
    }

    const absentRecords = await prisma.attendance.findMany({
      where: query,
      include: {
        student: {
          select: { id: true, firstName: true, lastName: true, classes: true },
        },
      },
    });

    return absentRecords.map((record) => ({
      id: record.student.id,
      name: `${record.student.firstName} ${record.student.lastName}`,
      date: record.date,
      reason: record.reason,
      justificationStatus: record.justificationStatus,
    }));
  }

  static async getAllClasses(schoolId: string) {
    const classes = await prisma.class.findMany({
      where: { schoolId },
      select: { id: true, name: true, level: true },
      orderBy: { name: "asc" },
    });

    return classes;
  }
}
