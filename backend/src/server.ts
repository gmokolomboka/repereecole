import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { tenantMiddleware } from "./middleware/tenant";
import apiRoutes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? ["https://repereecole.com"] : ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Tenant-ID", "X-School-ID"],
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "REPÈRE ÉCOLE Backend API",
    version: "1.0.0",
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1", tenantMiddleware, apiRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "NOT_FOUND",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    success: false,
    error: err.code || "INTERNAL_SERVER_ERROR",
    message: err.message || "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`REPÈRE ÉCOLE Backend running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
