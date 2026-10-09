import { Router } from "express";
import { TenantRequest } from "../types";
import { EventService } from "../services/EventService";
import { sendSuccess, sendError, sendNotFound } from "../utils/response";

const router = Router();

router.get("/", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const schoolId = req.schoolId;
    const type = req.query.type as string;

    let events;
    if (type) {
      events = await EventService.getEventsByType(tenantId, type, schoolId);
    } else {
      events = await EventService.getEvents(tenantId, schoolId);
    }

    sendSuccess(res, events);
  } catch (error: any) {
    sendError(res, error.message || "Failed to fetch events", 500);
  }
});

router.post("/", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const schoolId = req.schoolId!;
    const { title, description, type, status, startsAt, endsAt, location } = req.body;

    if (!title || !startsAt) {
      return sendError(res, "Title and startsAt are required", 422);
    }

    const createdById = req.body.createdById || "admin-user";

    const event = await EventService.createEvent(tenantId, schoolId, createdById, {
      title,
      description,
      type,
      status,
      startsAt: new Date(startsAt),
      endsAt: endsAt ? new Date(endsAt) : undefined,
      location,
    });

    sendSuccess(res, event, 201);
  } catch (error: any) {
    sendError(res, error.message || "Failed to create event", 500);
  }
});

router.get("/:id", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const { id } = req.params;

    const event = await EventService.getEventById(tenantId, id);

    if (!event) {
      return sendNotFound(res, "Event not found");
    }

    sendSuccess(res, event);
  } catch (error: any) {
    sendError(res, error.message || "Failed to fetch event", 500);
  }
});

router.patch("/:id", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const { id } = req.params;

    const event = await EventService.updateEvent(tenantId, id, {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      status: req.body.status,
      startsAt: req.body.startsAt ? new Date(req.body.startsAt) : undefined,
      endsAt: req.body.endsAt ? new Date(req.body.endsAt) : undefined,
      location: req.body.location,
    });

    sendSuccess(res, event);
  } catch (error: any) {
    if (error.message === "Event not found") {
      return sendNotFound(res, "Event not found");
    }
    sendError(res, error.message || "Failed to update event", 500);
  }
});

router.delete("/:id", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const { id } = req.params;

    const event = await EventService.deleteEvent(tenantId, id);

    sendSuccess(res, event);
  } catch (error: any) {
    if (error.message === "Event not found") {
      return sendNotFound(res, "Event not found");
    }
    sendError(res, error.message || "Failed to delete event", 500);
  }
});

router.get("/stats/summary", async (req: TenantRequest, res) => {
  try {
    const tenantId = req.tenantId!;
    const schoolId = req.schoolId;

    const stats = await EventService.calculateEventStats(tenantId, schoolId);

    sendSuccess(res, stats);
  } catch (error: any) {
    sendError(res, error.message || "Failed to calculate event stats", 500);
  }
});

export default router;
