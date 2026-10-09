import { Request, Response, NextFunction } from "express";
import { TenantRequest } from "../types";

export const tenantMiddleware = (
  req: TenantRequest,
  res: Response,
  next: NextFunction
) => {
  const tenantId = req.headers["x-tenant-id"] as string;
  const schoolId = req.headers["x-school-id"] as string;

  if (!tenantId) {
    return res.status(400).json({
      success: false,
      error: "MISSING_TENANT_ID",
      message: "X-Tenant-ID header is required",
    });
  }

  req.tenantId = tenantId;
  req.schoolId = schoolId || "school-1";

  next();
};
