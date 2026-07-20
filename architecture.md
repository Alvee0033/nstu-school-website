# 🏗️ Architecture Document
# NSTU School Website — NestJS + PostgreSQL + Prisma

> **Version:** 1.0 | **Date:** July 2026  
> **Stack:** NestJS · PostgreSQL 16 · Prisma ORM · Next.js 14 · Redis · Cloudflare R2

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT TIER                                 │
│                                                                     │
│   ┌──────────────────┐          ┌──────────────────────────────┐   │
│   │   Public Website  │          │       Admin Dashboard         │   │
│   │   (Next.js 14)    │          │       (Next.js 14)            │   │
│   │   SSR / SSG / ISR │          │       Protected Routes        │   │
│   └────────┬─────────┘          └──────────────┬───────────────┘   │
└────────────┼────────────────────────────────────┼───────────────────┘
             │                                    │
             │         HTTPS / REST API           │
             ▼                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           API TIER                                   │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                    NestJS Application                        │  │
│   │                                                             │  │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │  │
│   │  │  Auth    │  │ Notices  │  │ Teachers │  │  Gallery │  │  │
│   │  │ Module   │  │ Module   │  │ Module   │  │  Module  │  │  │
│   │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │  │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │  │
│   │  │ Students │  │ Results  │  │  Upload  │  │  Admin   │  │  │
│   │  │ Module   │  │ Module   │  │  Module  │  │  Module  │  │  │
│   │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │  │
│   │                                                             │  │
│   │           Guards · Interceptors · Pipes · Filters           │  │
│   └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
             │                    │                  │
             ▼                    ▼                  ▼
┌────────────────┐  ┌────────────────────┐  ┌────────────────────────┐
│  DATA TIER      │  │   CACHE TIER        │  │   STORAGE TIER          │
│                │  │                    │  │                        │
│  PostgreSQL 16 │  │  Redis             │  │  Cloudflare R2 / S3    │
│  (Primary DB)  │  │  - Notice cache    │  │  - Images (WebP)       │
│                │  │  - Session cache   │  │  - PDF documents       │
│  Prisma ORM    │  │  - Rate limiting   │  │  - Syllabus files      │
│  (Data Access) │  │  - Gallery cache   │  │  - Result PDFs         │
└────────────────┘  └────────────────────┘  └────────────────────────┘
```

---

## 2. NestJS Module Architecture

### 2.1 Module Structure

```
src/
├── main.ts                          # Bootstrap, Swagger, global pipes
├── app.module.ts                    # Root module
│
├── modules/
│   ├── auth/                        # Authentication & Authorization
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-refresh.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── decorators/
│   │       └── roles.decorator.ts
│   │
│   ├── users/                       # Admin user management
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   │
│   ├── notices/                     # Notice board management
│   │   ├── notices.module.ts
│   │   ├── notices.controller.ts
│   │   ├── notices.service.ts
│   │   └── dto/
│   │       ├── create-notice.dto.ts
│   │       └── update-notice.dto.ts
│   │
│   ├── teachers/                    # Teacher profiles
│   │   ├── teachers.module.ts
│   │   ├── teachers.controller.ts
│   │   ├── teachers.service.ts
│   │   └── dto/
│   │
│   ├── staff/                       # Non-teaching staff
│   │   ├── staff.module.ts
│   │   ├── staff.controller.ts
│   │   └── staff.service.ts
│   │
│   ├── students/                    # Student data & merit lists
│   │   ├── students.module.ts
│   │   ├── students.controller.ts
│   │   └── students.service.ts
│   │
│   ├── results/                     # Exam results
│   │   ├── results.module.ts
│   │   ├── results.controller.ts
│   │   └── results.service.ts
│   │
│   ├── gallery/                     # Photo & video gallery
│   │   ├── gallery.module.ts
│   │   ├── gallery.controller.ts
│   │   └── gallery.service.ts
│   │
│   ├── academics/                   # Routines, syllabus, calendar
│   │   ├── academics.module.ts
│   │   ├── academics.controller.ts
│   │   └── academics.service.ts
│   │
│   ├── upload/                      # File upload (R2/S3)
│   │   ├── upload.module.ts
│   │   ├── upload.controller.ts
│   │   └── upload.service.ts
│   │
│   └── school-info/                 # School about, contact, settings
│       ├── school-info.module.ts
│       ├── school-info.controller.ts
│       └── school-info.service.ts
│
├── common/
│   ├── decorators/                  # Custom decorators
│   ├── filters/                     # Global exception filters
│   ├── guards/                      # Shared guards
│   ├── interceptors/                # Logging, transform interceptors
│   ├── pipes/                       # Validation pipes
│   └── dto/                         # Shared DTOs (PaginationDto, etc.)
│
├── config/
│   ├── database.config.ts
│   ├── jwt.config.ts
│   ├── redis.config.ts
│   └── storage.config.ts
│
└── prisma/
    ├── prisma.module.ts
    └── prisma.service.ts
```

---

## 3. Database Schema (Prisma)

### 3.1 Complete Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUMS ────────────────────────────────────────────────────────────

enum Role {
  SUPER_ADMIN
  ADMIN
  CONTENT_EDITOR
}

enum NoticeCategory {
  GENERAL
  ACADEMIC
  ADMISSION
  EXAM
  RESULT
  EVENT
}

enum NoticeStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum MediaType {
  PHOTO
  VIDEO
}

// ─── MODELS ───────────────────────────────────────────────────────────

model User {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String
  role         Role      @default(CONTENT_EDITOR)
  isActive     Boolean   @default(true)
  lastLoginAt  DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  refreshTokens RefreshToken[]
  auditLogs     AuditLog[]
  notices       Notice[]       @relation("NoticeAuthor")

  @@index([email])
  @@map("users")
}

model RefreshToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  expiresAt DateTime
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([token])
  @@map("refresh_tokens")
}

model SchoolInfo {
  id           String  @id @default(cuid())
  nameEn       String
  nameBn       String
  eiin         String  @unique
  emis         String?
  historyEn    String? @db.Text
  historyBn    String? @db.Text
  visionEn     String? @db.Text
  visionBn     String? @db.Text
  missionEn    String? @db.Text
  missionBn    String? @db.Text
  address      String?
  phone        String?
  email        String?
  website      String?
  mapEmbedUrl  String?
  logoUrl      String?
  coverImageUrl String?
  fbPageUrl    String?
  ytChannelUrl String?
  updatedAt    DateTime @updatedAt

  principals   Principal[]

  @@map("school_info")
}

model Principal {
  id           String     @id @default(cuid())
  name         String
  designation  String
  messageEn    String?    @db.Text
  messageBn    String?    @db.Text
  photoUrl     String?
  type         String     // "HEADMASTER" | "SMC_CHAIRMAN"
  schoolInfoId String
  isActive     Boolean    @default(true)
  order        Int        @default(0)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  school SchoolInfo @relation(fields: [schoolInfoId], references: [id])

  @@map("principals")
}

model Notice {
  id          String         @id @default(cuid())
  titleEn     String
  titleBn     String?
  contentEn   String?        @db.Text
  contentBn   String?        @db.Text
  category    NoticeCategory @default(GENERAL)
  status      NoticeStatus   @default(DRAFT)
  isUrgent    Boolean        @default(false)
  attachmentUrl String?
  publishedAt DateTime?
  expiresAt   DateTime?
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  authorId    String

  author User @relation("NoticeAuthor", fields: [authorId], references: [id])

  @@index([status, category])
  @@index([publishedAt])
  @@index([isUrgent])
  @@map("notices")
}

model Teacher {
  id             String   @id @default(cuid())
  nameEn         String
  nameBn         String?
  designation    String
  department     String?
  subject        String?
  qualification  String?
  email          String?
  phone          String?
  photoUrl       String?
  bioEn          String?  @db.Text
  bioBn          String?  @db.Text
  order          Int      @default(0)
  isActive       Boolean  @default(true)
  joinedAt       DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([department])
  @@index([isActive])
  @@map("teachers")
}

model Staff {
  id          String   @id @default(cuid())
  nameEn      String
  nameBn      String?
  designation String
  phone       String?
  email       String?
  photoUrl    String?
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("staff")
}

model Class {
  id        String   @id @default(cuid())
  nameEn    String
  nameBn    String?
  grade     Int
  sections  Section[]
  createdAt DateTime @default(now())

  @@map("classes")
}

model Section {
  id        String   @id @default(cuid())
  name      String   // A, B, C, Science, Arts
  classId   String
  createdAt DateTime @default(now())

  class    Class    @relation(fields: [classId], references: [id])
  students Student[]
  results  Result[]
  routines Routine[]

  @@map("sections")
}

model Student {
  id          String   @id @default(cuid())
  studentId   String   @unique
  nameEn      String
  nameBn      String?
  rollNumber  Int
  sectionId   String
  gender      String?
  isMerit     Boolean  @default(false)
  meritRank   Int?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  section  Section  @relation(fields: [sectionId], references: [id])
  results  Result[]

  @@index([studentId])
  @@index([rollNumber, sectionId])
  @@map("students")
}

model Exam {
  id        String   @id @default(cuid())
  titleEn   String
  titleBn   String?
  year      Int
  startDate DateTime?
  endDate   DateTime?
  isPublished Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  results  Result[]
  schedule ExamSchedule[]

  @@map("exams")
}

model ExamSchedule {
  id        String   @id @default(cuid())
  examId    String
  subject   String
  date      DateTime
  startTime String
  endTime   String
  createdAt DateTime @default(now())

  exam Exam @relation(fields: [examId], references: [id])

  @@map("exam_schedules")
}

model Result {
  id          String   @id @default(cuid())
  studentId   String
  examId      String
  sectionId   String
  subject     String?
  marksObtained Float?
  totalMarks  Float?
  grade       String?
  gpa         Float?
  rank        Int?
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  student Student @relation(fields: [studentId], references: [id])
  exam    Exam    @relation(fields: [examId], references: [id])
  section Section @relation(fields: [sectionId], references: [id])

  @@unique([studentId, examId, subject])
  @@index([examId, isPublished])
  @@map("results")
}

model GalleryAlbum {
  id          String   @id @default(cuid())
  titleEn     String
  titleBn     String?
  description String?  @db.Text
  coverImageUrl String?
  eventDate   DateTime?
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  media GalleryMedia[]

  @@map("gallery_albums")
}

model GalleryMedia {
  id        String     @id @default(cuid())
  albumId   String
  type      MediaType  @default(PHOTO)
  url       String
  caption   String?
  order     Int        @default(0)
  createdAt DateTime   @default(now())

  album GalleryAlbum @relation(fields: [albumId], references: [id], onDelete: Cascade)

  @@map("gallery_media")
}

model Routine {
  id         String   @id @default(cuid())
  sectionId  String?
  titleEn    String
  titleBn    String?
  fileUrl    String?
  academicYear String
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  section Section? @relation(fields: [sectionId], references: [id])

  @@map("routines")
}

model Syllabus {
  id           String   @id @default(cuid())
  titleEn      String
  titleBn      String?
  classGrade   Int
  subject      String?
  academicYear String
  fileUrl      String
  isPublished  Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([classGrade, academicYear])
  @@map("syllabi")
}

model HolidayCalendar {
  id          String   @id @default(cuid())
  titleEn     String
  titleBn     String?
  startDate   DateTime
  endDate     DateTime
  type        String   // PUBLIC_HOLIDAY, SCHOOL_HOLIDAY, EXAM_BREAK
  academicYear String
  createdAt   DateTime @default(now())

  @@index([startDate, endDate])
  @@map("holiday_calendars")
}

model AuditLog {
  id         String   @id @default(cuid())
  userId     String
  action     String
  resource   String
  resourceId String?
  metadata   Json?
  ipAddress  String?
  createdAt  DateTime @default(now())

  user User @relation(fields: [userId], references: [id])

  @@index([userId, createdAt])
  @@index([resource, resourceId])
  @@map("audit_logs")
}
```

---

## 4. API Endpoint Architecture

### 4.1 Public API Routes (`/api/v1/public/`)

```
GET  /public/school-info           → School about, contact, principals
GET  /public/notices               → Paginated notices (with filters)
GET  /public/notices/:id           → Single notice detail
GET  /public/notices/urgent        → Scrolling urgent notices
GET  /public/teachers              → Teacher directory (with dept filter)
GET  /public/teachers/:id          → Teacher profile detail
GET  /public/staff                 → Staff list
GET  /public/gallery/albums        → Published albums list
GET  /public/gallery/albums/:id    → Album with media items
GET  /public/results/search        → Search result by rollNo + examId
GET  /public/students/class-stats  → Class-wise student count
GET  /public/academics/routines    → Published class routines
GET  /public/academics/syllabi     → Syllabi list with filters
GET  /public/academics/exam-schedules → Exam timetables
GET  /public/academics/holidays    → Holiday calendar
GET  /public/academics/calendar    → Full academic calendar
```

### 4.2 Admin API Routes (`/api/v1/admin/`) — JWT Required

```
# Auth
POST  /auth/login                  → Login, get tokens
POST  /auth/refresh                → Refresh access token
POST  /auth/logout                 → Invalidate refresh token
POST  /auth/change-password        → Change own password

# Users (SUPER_ADMIN only)
GET   /admin/users                 → List all admin users
POST  /admin/users                 → Create admin user
PATCH /admin/users/:id             → Update admin user
DELETE /admin/users/:id            → Deactivate admin user

# Notices (ADMIN / CONTENT_EDITOR)
POST  /admin/notices               → Create notice
GET   /admin/notices               → List all notices
PATCH /admin/notices/:id           → Update notice
DELETE /admin/notices/:id          → Delete notice
PATCH /admin/notices/:id/publish   → Publish / unpublish

# Teachers
POST  /admin/teachers              → Create teacher profile
PATCH /admin/teachers/:id          → Update teacher
DELETE /admin/teachers/:id         → Deactivate teacher

# Staff
POST  /admin/staff                 → Add staff member
PATCH /admin/staff/:id             → Update staff
DELETE /admin/staff/:id            → Remove staff

# Results
POST  /admin/results/exam          → Create exam
POST  /admin/results               → Bulk upload results
PATCH /admin/results/:examId/publish → Publish results

# Gallery
POST  /admin/gallery/albums        → Create album
PATCH /admin/gallery/albums/:id    → Update album
DELETE /admin/gallery/albums/:id   → Delete album
POST  /admin/gallery/media         → Upload media to album

# Academics
POST  /admin/academics/routines    → Upload routine
POST  /admin/academics/syllabi     → Upload syllabus
POST  /admin/academics/holidays    → Add holiday

# School Info
PATCH /admin/school-info           → Update school information

# Upload
POST  /upload/image                → Upload image → returns URL
POST  /upload/document             → Upload PDF → returns URL
DELETE /upload/:key                → Delete file from storage

# Audit
GET   /admin/audit-logs            → View audit trail
```

---

## 5. Authentication & Authorization Flow

```
Client                    NestJS API               PostgreSQL / Redis
  │                           │                           │
  │─── POST /auth/login ─────►│                           │
  │    { email, password }    │──── Find user by email ──►│
  │                           │◄─── User record ──────────│
  │                           │─── Verify bcrypt hash      │
  │                           │─── Generate JWT tokens     │
  │                           │─── Store RefreshToken ────►│
  │◄── { accessToken,         │                           │
  │      refreshToken } ──────│                           │
  │                           │                           │
  │─── GET /admin/notices ───►│                           │
  │    Bearer: <accessToken>  │── JWT Verify (no DB hit)  │
  │                           │── RolesGuard check         │
  │◄── [ notices ] ───────────│                           │
  │                           │                           │
  │─── POST /auth/refresh ───►│                           │
  │    { refreshToken }       │──── Validate RefreshToken ►│
  │                           │──── Rotate token ─────────►│
  │◄── { newAccessToken } ────│                           │
```

**Token Lifetimes:**
- Access Token: `15 minutes`
- Refresh Token: `7 days`
- Auto-rotation on every refresh

---

## 6. Caching Strategy (Redis)

| Data | Cache Key Pattern | TTL | Invalidation |
|------|-------------------|-----|--------------|
| Urgent Notices | `notices:urgent` | 5 min | On notice publish/update |
| Notice List | `notices:page:{n}:cat:{c}` | 10 min | On any notice change |
| Teacher List | `teachers:dept:{dept}` | 1 hour | On teacher update |
| Gallery Albums | `gallery:albums:page:{n}` | 30 min | On album publish |
| School Info | `school:info` | 24 hours | On school info update |
| Student Stats | `students:class-stats` | 1 hour | On student count update |

---

## 7. File Upload Architecture

```
Admin Client
    │
    ▼
NestJS Upload Controller
    │── Validate MIME type (image/jpeg, image/png, image/webp, application/pdf)
    │── Validate file size (Images: 5MB max, PDFs: 20MB max)
    │── Generate unique key: {module}/{year}/{uuid}.{ext}
    │── Sharp: Resize/convert images to WebP
    ▼
Cloudflare R2 / AWS S3
    │── Store file at generated key
    │── Return public CDN URL
    ▼
NestJS returns { url: "https://cdn.school.edu.bd/..." }
```

---

## 8. Deployment Architecture

```
                        ┌─────────────────────────────────┐
                        │         Cloudflare CDN           │
                        │    DDoS protection, DNS, SSL     │
                        └──────────────┬──────────────────┘
                                       │
                                       ▼
                        ┌─────────────────────────────────┐
                        │         VPS / Cloud Server       │
                        │                                 │
                        │  ┌────────────────────────────┐ │
                        │  │  Nginx Reverse Proxy        │ │
                        │  │  - SSL termination          │ │
                        │  │  - Rate limiting            │ │
                        │  │  - Gzip compression         │ │
                        │  └──────────┬─────────────────┘ │
                        │             │                   │
                        │   ┌─────────▼──────────┐        │
                        │   │  PM2 / Docker       │        │
                        │   │  NestJS App         │        │
                        │   │  (Cluster mode)     │        │
                        │   └────────────────────┘        │
                        │                                 │
                        │  ┌────────────┐ ┌─────────┐     │
                        │  │ PostgreSQL │ │  Redis  │     │
                        │  │ (Primary)  │ │ Cache   │     │
                        │  └────────────┘ └─────────┘     │
                        └─────────────────────────────────┘
```

**Deployment Strategy:**
- **CI/CD:** GitHub Actions → build → test → deploy
- **Process Manager:** PM2 in cluster mode (auto-restart, load balancing)
- **Zero-downtime deploys:** PM2 rolling restart
- **Database migrations:** `prisma migrate deploy` in CI pipeline
- **Environment Management:** `.env.production` via secrets manager

---

## 9. Environment Configuration

```bash
# .env.example

# Application
NODE_ENV=production
PORT=3000
API_PREFIX=api/v1
APP_URL=https://school.edu.bd

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/school_db?schema=public

# JWT
JWT_ACCESS_SECRET=<32-char-random-secret>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=<32-char-random-secret>
JWT_REFRESH_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=<redis-password>

# File Storage (Cloudflare R2)
R2_ACCOUNT_ID=<cloudflare-account-id>
R2_ACCESS_KEY_ID=<access-key>
R2_SECRET_ACCESS_KEY=<secret-key>
R2_BUCKET_NAME=school-assets
R2_PUBLIC_URL=https://cdn.school.edu.bd

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@school.edu.bd
SMTP_PASS=<smtp-password>

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

---

## 10. Error Handling Strategy

All API errors follow a consistent response format:

```typescript
// Standard error response
{
  "statusCode": 400,
  "error": "BAD_REQUEST",
  "message": "Validation failed",
  "details": [
    { "field": "email", "message": "Must be a valid email address" }
  ],
  "timestamp": "2026-07-14T12:00:00.000Z",
  "path": "/api/v1/auth/login"
}
```

**Global Exception Filter** handles:
- `PrismaClientKnownRequestError` → Map to 400/409/404
- `UnauthorizedException` → 401
- `ForbiddenException` → 403
- `NotFoundException` → 404
- `ValidationError` (class-validator) → 422
- Unhandled errors → 500 (logged to Sentry)

---

*Architecture document maintained by development team.*  
*Update this document whenever significant architectural changes are made.*
