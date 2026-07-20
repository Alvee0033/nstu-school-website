# 🤖 Agent Orchestration Document
# NSTU School Website — AI Agent Roles & Development Workflow

> **Version:** 1.0 | **Project:** NSTU School Website  
> **Stack:** NestJS · PostgreSQL · Prisma · Next.js 14

---

## 1. Agent Overview

This document defines the autonomous AI agents that will orchestrate the full-stack development of the NSTU School Website. Each agent has a specific domain of responsibility, a defined toolset, and clear input/output contracts.

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR AGENT                            │
│              (Master Coordinator & Planner)                      │
└──────┬──────────┬──────────┬──────────┬──────────┬─────────────┘
       │          │          │          │          │
       ▼          ▼          ▼          ▼          ▼
  ┌─────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
  │ Backend │ │Frontend│ │  DB &  │ │  Test  │ │ Security │
  │  Agent  │ │ Agent  │ │ Schema │ │  Agent │ │  Agent   │
  │(NestJS) │ │(Next.js│ │ Agent  │ │        │ │          │
  └─────────┘ └────────┘ └────────┘ └────────┘ └──────────┘
       │          │          │
       ▼          ▼          ▼
  ┌─────────┐ ┌────────┐ ┌────────┐
  │ DevOps  │ │Content │ │  SEO   │
  │  Agent  │ │  Agent │ │  Agent │
  └─────────┘ └────────┘ └────────┘
```

---

## 2. Agent Definitions

---

### 2.1 🎯 Orchestrator Agent

**Role:** Master coordinator — breaks down tasks, assigns to sub-agents, resolves blockers, tracks progress.

**Responsibilities:**
- Parse the `requirements.md` and create a phased implementation plan
- Spawn sub-agents with clear task definitions
- Monitor progress via `task.md`
- Resolve inter-agent conflicts (e.g., API contract mismatches between backend and frontend)
- Gate phase transitions (plan → build → test → deploy)

**Inputs:**
- `requirements.md` — Full feature list
- `architecture.md` — Technical constraints
- User feedback / change requests

**Outputs:**
- Phased `task.md` with assignments
- `implementation_plan.md` updated per milestone
- Blockers escalated to human for review

**Decision Authority:**
- ✅ Can assign tasks to any sub-agent
- ✅ Can reprioritize features within a phase
- ✅ Can approve architectural decisions within defined constraints
- ❌ Cannot change tech stack without human approval
- ❌ Cannot make breaking schema changes without schema agent review

---

### 2.2 🔧 Backend Agent (NestJS)

**Role:** Implements all NestJS modules, controllers, services, DTOs, and guards.

**Responsibilities:**
- Scaffold NestJS project with correct module structure (per `architecture.md`)
- Implement all API endpoints listed in `architecture.md §4`
- Write service layer business logic
- Integrate Prisma service for all database operations
- Implement JWT auth with Passport.js strategies
- Implement Redis caching via `@nestjs/cache-manager`
- Configure global guards, pipes, filters, interceptors
- Write Swagger/OpenAPI documentation for all endpoints
- Implement file upload service with R2/S3 integration
- Write `unit tests` for all services (Jest)

**Tools Used:**
- `write_to_file`, `multi_replace_file_content` — Code generation
- `run_command` — `nest generate`, `npx prisma generate`, `npm run test`
- `grep_search` — Find existing patterns before adding new code

**Key Files Owned:**
```
src/modules/**/*.{service,controller,module}.ts
src/common/**
src/config/**
src/prisma/**
test/unit/**
```

**Input Contract:**
- Receives: API spec from Orchestrator, Prisma schema from DB Agent
- Produces: Working REST API with Swagger docs at `/api/docs`

**Acceptance Criteria:**
- All endpoints return correct HTTP status codes
- Unit tests pass for all service methods
- `nest build` completes without TypeScript errors
- Swagger docs auto-generated and accurate

---

### 2.3 🎨 Frontend Agent (Next.js)

**Role:** Implements the public-facing website and the admin dashboard in Next.js 14.

**Responsibilities:**
- Scaffold Next.js 14 App Router project
- Implement all public pages per `design.md` specifications
- Implement admin dashboard pages (protected routes)
- Integrate with Backend API using `fetch` / `axios` / `react-query`
- Implement responsive design (mobile-first)
- Implement bilingual support (Bengali / English)
- Implement SEO: meta tags, JSON-LD, Open Graph, sitemap
- Integrate `next-auth` or custom JWT auth for admin section
- Optimize images with `next/image`
- Implement skeleton loading, error boundaries, 404/500 pages
- Write component tests with `@testing-library/react`

**Tools Used:**
- `write_to_file`, `multi_replace_file_content` — Component creation
- `run_command` — `npm run build`, `npm run lint`, `npm test`
- `generate_image` — Generate placeholder images / mockups

**Key Files Owned:**
```
app/(public)/           → Public website pages
app/(admin)/            → Admin dashboard pages
components/             → Shared UI components
lib/                    → API clients, utilities
styles/                 → CSS modules / global styles
```

**Input Contract:**
- Receives: API base URL + endpoint docs, design tokens from Design Agent
- Produces: Deployable Next.js app with passing build

**Acceptance Criteria:**
- `next build` succeeds with no errors
- All pages responsive on 375px, 768px, 1280px viewports
- Lighthouse score ≥ 90 for Performance, SEO, Accessibility
- All forms have proper validation feedback

---

### 2.4 🗄️ Database Schema Agent

**Role:** Owns the Prisma schema, migrations, and seed data.

**Responsibilities:**
- Design and maintain `prisma/schema.prisma`
- Create and run migrations: `prisma migrate dev`
- Write database seed script: `prisma/seed.ts`
- Set up database indexes for query performance
- Document all schema decisions with comments
- Review and approve any schema changes from other agents
- Set up connection pooling configuration
- Create Prisma Client custom queries where needed

**Tools Used:**
- `write_to_file` — Schema and migration files
- `run_command` — `prisma migrate dev`, `prisma db seed`, `prisma studio`

**Key Files Owned:**
```
prisma/schema.prisma
prisma/migrations/
prisma/seed.ts
```

**Input Contract:**
- Receives: Feature requirements from Orchestrator
- Produces: Validated schema with migrations applied, seed data loaded

**Acceptance Criteria:**
- `prisma validate` passes without errors
- All migrations run cleanly on fresh DB: `prisma migrate reset`
- Seed script populates demo data successfully
- All foreign key constraints and indexes in place

---

### 2.5 🧪 Test Agent

**Role:** Ensures code quality through unit, integration, and E2E testing.

**Responsibilities:**
- Write Jest unit tests for all NestJS services
- Write integration tests for API endpoints using `supertest`
- Write E2E tests for critical user flows (Playwright)
- Generate test coverage reports
- Flag test failures and report to Orchestrator
- Maintain test fixtures and factory functions

**Test Coverage Targets:**

| Layer | Tool | Target Coverage |
|-------|------|----------------|
| Unit (Services) | Jest | ≥ 80% |
| Integration (API) | Jest + Supertest | All endpoints |
| E2E (Critical Flows) | Playwright | 10 key user journeys |

**Critical E2E Flows:**
1. Admin login → create notice → publish notice → verify on public site
2. Student searches result by roll number
3. Admin uploads photo to gallery → visible on public gallery
4. Admin updates teacher profile
5. Public user browses notice board and downloads PDF
6. Admin changes password
7. Notice expires automatically
8. Admin creates class routine → students see updated timetable
9. Bulk result upload and publish
10. Mobile viewport navigation (hamburger menu, gallery swipe)

**Tools Used:**
- `run_command` — `npm run test`, `npm run test:cov`, `npx playwright test`
- `write_to_file` — Test files
- `grep_search` — Find existing test patterns

---

### 2.6 🔒 Security Agent

**Role:** Audits the codebase for security vulnerabilities and implements security hardening.

**Responsibilities:**
- Review all authentication and authorization code
- Verify JWT implementation (secret strength, expiry, rotation)
- Audit all file upload endpoints for path traversal, MIME spoofing
- Check for SQL injection risks (verify Prisma usage, no raw queries)
- Verify CORS configuration is strict
- Check rate limiting is applied to sensitive endpoints
- Audit environment variable handling (no secrets in code/logs)
- Verify bcrypt rounds are sufficient (≥ 12)
- Check for XSS vulnerability in any HTML rendering
- Verify HTTPS enforcement in deployment config
- Run `npm audit` and address HIGH/CRITICAL vulnerabilities
- Generate security checklist report

**Security Checklist Output:**
```markdown
## Security Audit Report

### Authentication
- [ ] JWT secrets ≥ 32 characters (random)
- [ ] Access token TTL: 15 minutes
- [ ] Refresh token rotation on every use
- [ ] Bcrypt salt rounds ≥ 12
- [ ] No passwords in logs

### Authorization
- [ ] All admin routes behind JwtAuthGuard
- [ ] RolesGuard applied to SUPER_ADMIN-only routes
- [ ] Public routes explicitly marked @Public()

### Input Validation
- [ ] ValidationPipe enabled globally with whitelist: true
- [ ] All DTOs use class-validator decorators
- [ ] File upload: MIME type + size validation

### Infrastructure
- [ ] CORS: strict origin allowlist
- [ ] Rate limiting: ThrottlerGuard on all controllers
- [ ] Helmet.js headers configured
- [ ] Database URL not logged
- [ ] .env.* in .gitignore

### Dependency Security
- [ ] npm audit: 0 HIGH/CRITICAL issues
- [ ] Dependencies up to date
```

---

### 2.7 🚀 DevOps Agent

**Role:** Sets up CI/CD pipeline, Docker configuration, and deployment infrastructure.

**Responsibilities:**
- Write `Dockerfile` (multi-stage build for NestJS)
- Write `docker-compose.yml` for local development (NestJS + PostgreSQL + Redis)
- Create GitHub Actions workflows:
  - `ci.yml` — On PR: lint, test, build
  - `deploy.yml` — On main merge: deploy to production
- Write Nginx configuration (reverse proxy, SSL, gzip)
- Write PM2 ecosystem file for process management
- Configure automated database backup script
- Write deployment runbook documentation
- Set up health check endpoint: `GET /health`

**Key Files Owned:**
```
Dockerfile
docker-compose.yml
docker-compose.prod.yml
.github/workflows/ci.yml
.github/workflows/deploy.yml
nginx/school.conf
ecosystem.config.js
scripts/backup.sh
```

---

### 2.8 📝 Content Agent

**Role:** Prepares demo/seed content and admin documentation.

**Responsibilities:**
- Write the database seed script with realistic sample data:
  - School info (NSTU placeholder)
  - 5 sample teachers with profiles
  - 10 sample notices across categories
  - 3 exam results sets
  - 2 photo gallery albums with placeholder images
  - Sample academic routines and syllabi
- Write the **Admin User Manual** (step-by-step, with screenshots)
- Translate all user-facing labels to Bengali equivalents
- Create `README.md` with project setup instructions

---

### 2.9 🔍 SEO Agent

**Role:** Ensures the public website is fully optimized for search engine indexing.

**Responsibilities:**
- Implement `<title>` and `<meta description>` for all pages
- Add JSON-LD structured data (School, FAQPage, BreadcrumbList)
- Configure Open Graph and Twitter Card meta tags
- Generate dynamic `sitemap.xml`
- Configure `robots.txt`
- Implement canonical URLs
- Add breadcrumb navigation (semantic HTML + schema)
- Verify heading hierarchy (`h1` → `h2` → `h3`) on all pages
- Optimize image `alt` attributes
- Run Lighthouse SEO audit (target: 95+)

---

## 3. Agent Interaction Protocol

### 3.1 Communication Flow

```
Orchestrator                Backend Agent
    │                            │
    ├──[Task: Implement notices module]──►│
    │                            │── Creates notices.module.ts
    │                            │── Creates notices.controller.ts
    │                            │── Creates notices.service.ts
    │◄──[Done: Notices API ready]──────────│
    │
    ├──[Task: Frontend notices page]──►Frontend Agent
    │                            │── Pulls API spec from Backend
    │                            │── Implements /notices page
    │◄──[Done: Notices page live]──────────│
    │
    ├──[Task: Security review]──►Security Agent
    │                            │── Audits notices endpoints
    │◄──[Report: 2 issues found]──────────│
    │
    ├──[Fix: File upload MIME check]──►Backend Agent
    │◄──[Done: Fixed]────────────────────│
```

### 3.2 Handoff Contracts

| Handoff | From | To | Artifact |
|---------|------|----|----------|
| Schema ready | DB Agent | Backend Agent | `prisma/schema.prisma` + migration applied |
| API ready | Backend Agent | Frontend Agent | Swagger JSON + base URL |
| Design tokens | Design Agent | Frontend Agent | `design.md` + CSS variables |
| Tests pass | Test Agent | Orchestrator | Coverage report + 0 failing tests |
| Security clear | Security Agent | DevOps Agent | Audit report with all items checked |
| Deploy ready | DevOps Agent | Orchestrator | Production URL + health check passing |

---

## 4. Development Phases

### Phase 1 — Foundation (Week 1)
```
[DB Agent]       → Create Prisma schema + migrations
[Backend Agent]  → NestJS scaffold + Prisma integration + Auth module
[DevOps Agent]   → Docker Compose + local dev setup
```

### Phase 2 — Core Features (Week 2–3)
```
[Backend Agent]  → All API modules (Notices, Teachers, Gallery, Results)
[Frontend Agent] → All public pages
[DB Agent]       → Seed data
```

### Phase 3 — Admin Dashboard (Week 4)
```
[Frontend Agent] → Admin dashboard all pages
[Backend Agent]  → Admin-specific endpoints + audit logs
[Content Agent]  → Admin user manual
```

### Phase 4 — Quality & Security (Week 5)
```
[Test Agent]     → Full test suite (unit + integration + E2E)
[Security Agent] → Security audit + fixes
[SEO Agent]      → Full SEO implementation
```

### Phase 5 — Deployment (Week 6)
```
[DevOps Agent]   → Production deployment + CI/CD
[Test Agent]     → Smoke tests on production
[Content Agent]  → README + documentation
```

---

## 5. Skills Required (skills.sh)

The following Antigravity skills should be imported for this project:

```bash
# skills.sh — Import all required skills for NSTU School Website

#!/bin/bash
echo "Importing skills for NSTU School Website project..."

# Backend Development
gsd import-skill backend-development-feature-development
gsd import-skill fastapi-pro           # NestJS patterns reference
gsd import-skill api-design-principles
gsd import-skill openapi-spec-generation

# Database
gsd import-skill postgresql
gsd import-skill database-migrations-sql-migrations
gsd import-skill database-migrations-migration-observability
gsd import-skill sql-pro

# Security
gsd import-skill backend-security-coder
gsd import-skill auth-implementation-patterns
gsd import-skill secrets-management
gsd import-skill security-scanning-security-sast

# Testing
gsd import-skill tdd-workflows-tdd-cycle
gsd import-skill unit-testing-test-generate
gsd import-skill e2e-testing-patterns
gsd import-skill python-testing-patterns

# Frontend
gsd import-skill nextjs-app-router-patterns
gsd import-skill react-state-management
gsd import-skill modern-web-guidance

# DevOps
gsd import-skill deployment-pipeline-design
gsd import-skill deployment-validation-config-validate
gsd import-skill bash-pro

# Code Quality
gsd import-skill code-review-excellence
gsd import-skill code-refactoring-tech-debt
gsd import-skill debugger

# SEO
gsd import-skill seo-meta-optimizer
gsd import-skill seo-content-writer
gsd import-skill seo-structure-architect

echo "✅ All skills imported successfully!"
```

---

*Agent orchestration document — update when adding new agents or changing responsibilities.*
