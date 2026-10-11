import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: [".env", "../../.env"] });

const app: Express = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export type Payload = {
  id: string;
  name: string;
  email: string;
  courseTitle: string;
};

// Root Route
app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "Automator Service API",
    status: "running",
    version: "1.0.0"
  });
});

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "automator",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.post('/webhook',(req: Request, res: Response) => {

// console.log('headers', req.headers)
if(req.headers['x-webhook-token'] !== process.env.SECRET_WEBHOOK_TOKEN) {
return res.status(401).json({message: 'token mismatch'})
}

const {id,name,email, courseTitle} = req.body;

// todo: create discord invite

// todo:send email to the student

console. log(`Invite sent to ${name} on ${email} for course ${courseTitle}`);

  return res.json({
    message: 'OK'
  })
})

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
  console.log(`[Automator] Server running on ${PORT}`);
});

export default app;
