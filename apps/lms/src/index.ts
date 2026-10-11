import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { webhookRouter, sendWebhooks, db, type Payload } from "./webhooks/index.js";

dotenv.config({ path: [".env", "../../.env"] });

const app: Express = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "LMS Service API",
    status: "running",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      api: "/api"
    }
  });
});

// Health Check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
const apiRouter = express.Router();

apiRouter.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to LMS API" });
});

// Webhook Routes
apiRouter.use(webhookRouter);

apiRouter.post('/purchase', (req: Request, res: Response) => {
  const { name, email, courseTitle } = req.body;
  // initial purchase processing
  // sending webhooks
  const payload: Payload = {
    id: Date.now().toString(),
    name,
    email,
    courseTitle
  };

  // async
  const webhooks = db.filter((webhook) => webhook.event === 'purchase');
  if (webhooks.length === 0) {
    console.log('[LMS] Warning: No webhooks registered in memory for event "purchase". Call POST /api/register-webhook first.');
  }

  sendWebhooks(webhooks, payload)
    .then(() => {
      console.log(`[LMS] Webhooks dispatched (${webhooks.length} sent).`);
    })
    .catch((err) => {
      console.error('[LMS] Error dispatching webhooks:', err);
    });

  return res.json({ message: 'course purchse successfull' });
});

app.use("/api", apiRouter);

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[LMS] Server running on http://localhost:${PORT}`);
});

export default app;
