import prisma from "../db/prisma";
import { EventInput } from "../types";

export class EventService {
  static async getEvents(tenantId: string, schoolId?: string) {
    return prisma.event.findMany({
      where: {
        tenantId,
        ...(schoolId && { schoolId }),
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        participants: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
        },
      },
      orderBy: { startsAt: "desc" },
    });
  }

  static async getEventById(tenantId: string, id: string) {
    return prisma.event.findFirst({
      where: { id, tenantId },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        participants: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
        },
      },
    });
  }

  static async getEventsByType(tenantId: string, type: string, schoolId?: string) {
    return prisma.event.findMany({
      where: {
        tenantId,
        type: type.toLowerCase(),
        ...(schoolId && { schoolId }),
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        participants: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
        },
      },
    });
  }

  static async createEvent(tenantId: string, schoolId: string, createdById: string, input: EventInput) {
    return prisma.event.create({
      data: {
        tenantId,
        schoolId,
        createdById,
        title: input.title,
        description: input.description,
        type: input.type || "OTHER",
        status: input.status || "PLANNED",
        startsAt: input.startsAt,
        endsAt: input.endsAt,
        location: input.location,
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        participants: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
        },
      },
    });
  }

  static async updateEvent(tenantId: string, id: string, input: Partial<EventInput>) {
    const event = await prisma.event.findFirst({
      where: { id, tenantId },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    return prisma.event.update({
      where: { id },
      data: {
        ...input,
        updatedAt: new Date(),
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        participants: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
        },
      },
    });
  }

  static async deleteEvent(tenantId: string, id: string) {
    const event = await prisma.event.findFirst({
      where: { id, tenantId },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    return prisma.event.delete({
      where: { id },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        participants: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
        },
      },
    });
  }

  static async calculateEventStats(tenantId: string, schoolId?: string) {
    const events = await prisma.event.findMany({
      where: {
        tenantId,
        ...(schoolId && { schoolId }),
      },
    });

    return {
      total: events.length,
      reunions: events.filter((e) => e.type === "reunion").length,
      evenements: events.filter((e) => e.type === "evenement").length,
      formations: events.filter((e) => e.type === "formation").length,
    };
  }
}
