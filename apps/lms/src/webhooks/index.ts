import { Router, type Request, type Response } from "express";

export type Event = "purchase" | "completed";

export type Webhook = {
  id: string;
  url: string;
  token: string;
  event: Event;
};

export type Payload = {
  id: string;
  name: string;
  email: string;
  courseTitle: string;
};

export const db: Webhook[] = [];

export const webhookRouter = Router();

webhookRouter.post("/register-webhook", (req: Request, res: Response) => {
  const { url, token, event } = req.body;

  db.push({
    id: Date.now().toString(),
    url,
    token,
    event,
  });

  console.log("databse", db);

  return res.json({
    data: db,
    message: "OK",
  });
});

export async function sendWebhooks(webhooks: Webhook[], payload: Payload) {
  for (const webhook of webhooks) {
    try {
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-Webhook-Token": webhook.token,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(`[Webhook] Delivery to ${webhook.url} returned status ${response.status}: ${text}`);
      }
    } catch (err) {
      console.error(`[Webhook] Delivery to ${webhook.url} failed:`, err);
    }
  }
}

