# 📋 Project Requirements Document (PRD)
# NSTU School Website — Dynamic Web Platform

> **Prepared by:** Jantra Soft International — Custom Software & AI Solutions  
> **Date:** July 14, 2026 | **Version:** 1.1  
> **Tech Stack:** NestJS + PostgreSQL + Prisma ORM  
> **Client:** Government Secondary & Primary Schools (Bangladesh)

---

## 1. Project Overview

In the current digital era, a well-structured, secure, and user-friendly dynamic website is essential for government secondary and primary schools. This website will serve as the primary institutional identity platform and a central communication hub for students, parents, teachers, and the general public.

This document outlines the mandatory features, technical requirements, and staff training plan for the proposed school website.

---

## 2. Project Objectives

| # | Objective |
|---|-----------|
| 1 | Publish the school's institutional information, history, and activities online in an easily accessible manner |
| 2 | Create a central information and communication platform for students, parents, and teachers |
| 3 | Deliver notices, class schedules, results, and admission information quickly and transparently |
| 4 | Ensure a secure (SSL-protected) and responsive web infrastructure per government standards |
| 5 | Train designated school staff to manage the admin panel independently |

---

## 3. Functional Requirements

### 3.1 Home Page & Basic Information

| Feature | Description | Priority |
|---------|-------------|----------|
| Welcome Message | Display welcome messages with photos from the Headmaster and Managing Committee (SMC) Chairman | **HIGH** |
| About Page | Full institutional profile including school history, vision, mission, EIIN code, and EMIS code | **HIGH** |
| Contact Information | Google Maps location embed, official email, phone number, and social media links | **HIGH** |
| Hero Banner | Full-width responsive hero slider with school imagery and key announcements | **HIGH** |
| Statistics Counter | Live counters showing total students, teachers, pass rates, and years established | **MEDIUM** |

---

### 3.2 Notice Board & Scrolling Announcements

| Feature | Description | Priority |
|---------|-------------|----------|
| Breaking Notice Bar | Scrolling/ticker-style urgent notice bar displayed on the home page | **HIGH** |
| Notice Board | General, academic, and admission-related notices with PDF download capability | **HIGH** |
| Notice Categories | Filter notices by type: General / Academic / Admission / Exam | **MEDIUM** |
| Notice Search | Full-text search across all published notices | **MEDIUM** |
| Notice Expiry | Auto-expire old notices after a configurable date | **LOW** |

---

### 3.3 Teacher, Staff & Student Profiles

| Feature | Description | Priority |
|---------|-------------|----------|
| Teacher Directory | All teachers listed with name, designation, photo, educational qualifications, email, and phone | **HIGH** |
| Staff List | Office assistants and other non-teaching staff with names and designations | **HIGH** |
| Student Information | Class-wise total student count and merit list display | **HIGH** |
| Profile Detail Page | Individual teacher profile page with full bio and research/achievements | **MEDIUM** |
| Department Filter | Filter teachers/staff by department or subject | **MEDIUM** |

---

### 3.4 Academic & Curriculum Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Class Routine | Publish class timetable per class and section | **HIGH** |
| Exam Schedule | Annual exam timetable with subject-wise schedule | **HIGH** |
| Syllabus Upload | Class-wise syllabus upload in PDF format | **HIGH** |
| Holiday Calendar | Annual holiday/vacation calendar per school year | **HIGH** |
| Co-curricular Activities | Regular updates for sports, scout, debate club, and cultural programs | **MEDIUM** |
| Academic Calendar | Year-long academic calendar with important dates | **MEDIUM** |

---

### 3.5 Admission & Results

| Feature | Description | Priority |
|---------|-------------|----------|
| Online Admission | Link to the government central admission system OR custom admission form with guidelines | **HIGH** |
| Admission Guidelines | Eligibility criteria, required documents, and fee structure | **HIGH** |
| Result Search | Students can search class test results by roll number or student ID | **HIGH** |
| Result Publication | Publish class/term exam results with subject-wise breakdown | **HIGH** |
| Topper/Merit List | Display top students per class per exam | **MEDIUM** |
| Result PDF Download | Allow students/parents to download result report cards as PDF | **MEDIUM** |

---

### 3.6 Gallery & Media

| Feature | Description | Priority |
|---------|-------------|----------|
| Photo Gallery | Organized photo albums for events, national day celebrations, prize distributions | **HIGH** |
| Video Links | Embed important event videos or YouTube links | **MEDIUM** |
| Album Management | Admin can create, name, and populate photo albums | **HIGH** |
| Image Lightbox | Full-screen image viewer with navigation | **MEDIUM** |
| Media Categories | Filter gallery by event type, year, or category | **LOW** |

---

### 3.7 Technical & Security Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Responsive Design | Fully adaptive layout for mobile, tablet, and desktop devices | **HIGH** |
| Admin Dashboard | Password-protected, role-based admin panel for content management (no coding required) | **HIGH** |
| HTTPS / SSL | Mandatory HTTPS throughout the entire website | **HIGH** |
| SEO Optimization | Meta tags, Open Graph, structured data (JSON-LD) for search engine indexing | **HIGH** |
| Multi-language Support | Bilingual content support: Bengali (primary) + English | **MEDIUM** |
| Accessibility | WCAG 2.1 AA compliance for screen readers and keyboard navigation | **MEDIUM** |
| Analytics Integration | Google Analytics / privacy-friendly alternative integration | **MEDIUM** |
| Sitemap & Robots.txt | Auto-generated sitemap for search engine crawling | **LOW** |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target |
|--------|--------|
| Page Load Time (LCP) | < 2.5 seconds on 3G connection |
| API Response Time | < 200ms for read operations, < 500ms for writes |
| Uptime SLA | 99.5% monthly uptime |
| Concurrent Users | Support 500+ simultaneous visitors |
| Image Optimization | WebP format, lazy loading, CDN delivery |

### 4.2 Security

| Requirement | Implementation |
|-------------|----------------|
| Authentication | JWT access tokens + Refresh token rotation |
| Password Storage | bcrypt hashing (salt rounds ≥ 12) |
| Role-Based Access Control | SUPER_ADMIN / ADMIN / CONTENT_EDITOR / PUBLIC |
| Input Validation | Class-validator + sanitization on all endpoints |
| SQL Injection Prevention | Prisma ORM parameterized queries |
| Rate Limiting | Throttle guard: 100 req/min per IP |
| CORS | Strict allowlist of permitted origins |
| File Upload Security | Type validation, size limits, virus scan hook |
| Data Privacy | GDPR-aligned data handling for student PII |
| Regular Backups | Automated daily database backups with 30-day retention |

### 4.3 Scalability

- Stateless API design for horizontal scaling
- Connection pooling via PgBouncer or Prisma connection pool
- CDN for static assets (images, PDFs)
- Redis caching layer for frequently-accessed data

### 4.4 Maintainability

- RESTful API with OpenAPI/Swagger documentation
- Unit test coverage ≥ 80%
- E2E test coverage for all critical user flows
- Semantic versioning and changelog
- Comprehensive inline documentation

---

## 5. Admin Panel & Training Plan

### 5.1 Admin Panel Capabilities

The Admin Panel will be built and configured by the development team to allow school staff to manage daily content without any coding knowledge.

**Admin Features:**
- Secure login with password change capability
- Notice creation, editing, PDF attachment upload
- Photo gallery management (upload, organize, delete)
- Teacher, staff, and student profile updates
- Class routine and syllabus file uploads
- Result entry and publication
- User management (create/disable sub-admin accounts)
- Activity audit logs

### 5.2 Training Program

**Training Content:**
1. Admin Panel login and secure password management
2. Creating, editing, and uploading PDF notices
3. Uploading and organizing photo gallery albums
4. Updating teacher, staff, and student profile information
5. Publishing class routines, syllabi, and exam results

**Training Methods:**
- In-person hands-on session at the school premises or online via video call
- Step-by-step written user manual (Bengali & English)
- Technical support during initial use period (30 days post-launch)

**Target Trainees:** Office Assistants, ICT Teachers, or designated admin staff

---

## 6. Security Guidelines

1. **HTTPS Mandatory** — SSL certificate enforced across all pages
2. **Role-Based Access Control** — Granular permissions per admin role
3. **Password Encryption** — bcrypt hashing; no plaintext storage ever
4. **Regular Backups** — Automated backup with recovery procedure documented
5. **Student Data Privacy** — Student results and profiles stored with data privacy policy compliance
6. **Audit Trails** — All admin actions logged with timestamp and user ID
7. **Session Management** — JWT expiry, refresh token rotation, forced logout capability

---

## 7. Suggested Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 14 (App Router) | SEO-friendly, fast, responsive, SSR/SSG support |
| **Backend** | NestJS (Node.js) | Modular, enterprise-grade, TypeScript-native |
| **Database** | PostgreSQL 16 | Robust relational DB for notices, results, profiles |
| **ORM** | Prisma ORM | Type-safe queries, migrations, developer productivity |
| **Authentication** | JWT + Passport.js | Stateless, scalable auth |
| **File Storage** | Cloudflare R2 / AWS S3 | Secure cloud storage for images and PDFs |
| **Caching** | Redis | Notice board, gallery, frequently-read data |
| **Hosting** | Cloud VPS (DigitalOcean/AWS) + CDN | Reliable, scalable, SSL included |
| **Domain** | `.edu.bd` or institutional domain | Government standard |
| **Email** | Nodemailer + SMTP | Contact form, admin notifications |
| **Search** | PostgreSQL Full-Text Search | Notice search, teacher search |
| **Monitoring** | Prometheus + Grafana / Sentry | Error tracking, performance monitoring |

---

## 8. Next Steps & Pre-Project Checklist

- [ ] Confirm tech stack approval from client
- [ ] Finalize hosting provider and budget
- [ ] Confirm domain registration (.edu.bd)
- [ ] Identify designated admin panel operator (staff member)
- [ ] Provide school assets: logo, official photos, existing content
- [ ] Define project timeline and milestones
- [ ] Sign development contract

---

## 9. Acceptance Criteria

A feature is considered **Done** when:
- All documented functionality is implemented and working
- Unit tests pass with ≥ 80% coverage
- No critical or high-severity bugs open
- Admin can perform all CRUD operations without developer assistance
- Page loads in < 2.5s on a standard 3G connection
- Security scan shows no HIGH/CRITICAL vulnerabilities
- Responsive on mobile (375px), tablet (768px), and desktop (1280px+)

---

*Document prepared by Jantra Soft International | jantrasoft.online*  
*This document is subject to revision based on client feedback and project scope changes.*
