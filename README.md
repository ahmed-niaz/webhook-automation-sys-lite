# Webhook Automation Sys Lite

A modular Express.js TypeScript monorepo managed with **pnpm workspaces**, demonstrating webhook event dispatching between an LMS service and an Automator service.

## Folder Structure

```text
webhook_automation_sys_lite/
├── apps/
│   ├── automator/
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── lms/
│       ├── src/
│       │   ├── webhooks/
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── .env
├── .gitignore
├── bts.jsonc
├── package.json
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.json
```

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)

### 2. Environment Configuration
Create a `.env` file at the root:
```env
SECRET_WEBHOOK_TOKEN="loser-have-no-secret"
```

### 3. Installation
Install all dependencies across the workspace:
```bash
pnpm install
```

### 4. Development
Run both applications concurrently:
```bash
pnpm dev:all
```

Or run them individually:
```bash
# LMS server on http://localhost:4000
pnpm dev:lms

# Automator server on http://localhost:4001
pnpm dev:automator
```

### 5. Build
Compile TypeScript to JavaScript for production:
```bash
pnpm build
```

### 6. Production
Start the compiled LMS server:
```bash
pnpm start
```

---

## API Endpoints & Webhook Workflow

### 1. LMS Service (`http://localhost:4000`)
- `GET /` - Service info
- `GET /health` - Health check
- `POST /api/register-webhook` - Register a webhook endpoint:
  ```json
  {
    "url": "http://localhost:4001/webhook",
    "token": "loser-have-no-secret",
    "event": "purchase"
  }
  ```
- `POST /api/purchase` - Trigger a course purchase event:
  ```json
  {
    "name": "Ahmed",
    "email": "ahmed@example.com",
    "courseTitle": "TypeScript Monorepo Mastery"
  }
  ```

### 2. Automator Service (`http://localhost:4001`)
- `GET /` - Service info
- `GET /health` - Health check
- `POST /webhook` - Receives incoming webhook events:
  - Validates `x-webhook-token` header against `SECRET_WEBHOOK_TOKEN`
  - Processes automated actions (e.g. invite dispatch)
