# Webhook Automation Sys Lite

A modular Express.js TypeScript monorepo managed with **pnpm workspaces**.

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
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
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

### 2. Installation
Install all dependencies across the workspace:
```bash
pnpm install
```

### 3. Development
Run the LMS Express server :
```bash
pnpm dev:lms
```

Run the Automator server :
```bash
pnpm dev:automator
```

Or run all applications concurrently:
```bash
pnpm dev:all
```

### 4. Build
Compile TypeScript to JavaScript for production:
```bash
pnpm build
```

### 5. Production
Start the compiled LMS server:
```bash
pnpm start
```

## API Endpoints

### LMS Server 
- `GET /` - Service info
- `GET /health` - Health check
- `GET /api/courses` - Sample courses list
- `POST /api/webhook` - Webhook receiver

### Automator Server 
- `GET /` - Service info
- `GET /health` - Health check
- `POST /trigger` - Automation task trigger

