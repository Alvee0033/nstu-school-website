# Coding Rules & Standards
# NSTU School Website

> These rules are non-negotiable. Every line of code must comply before merge.

---

## 1. General Principles

- **Write less, do more.** Every file, function, and component must earn its place.
- **One responsibility per unit.** Module, service, component — each does exactly one thing.
- **No patch work.** Fix the root cause. Never mask a bug with a workaround.
- **No dead code.** No commented-out blocks, no unused imports, no TODO graveyards.
- **No redundancy.** If logic exists somewhere, call it — never copy it.

---

## 2. Repository Structure

### What belongs in the repo

```
apps/
  api/          # NestJS backend
  web/          # Next.js frontend
packages/
  prisma/       # Shared Prisma schema + client
  types/        # Shared TypeScript types
```

### What never belongs in the repo

- One-off migration scripts — use `prisma migrate dev` properly
- Temporary debug files (`test.ts`, `scratch.js`, `temp/`)
- Generated files (`dist/`, `.next/`, `node_modules/`)
- Duplicate config files (one `.env.example` at root, that's it)
- Multiple versions of the same thing (`button-v2.tsx`, `old-notice.service.ts`)

### File naming

```
kebab-case       → all files and folders
PascalCase       → React components only (NoticeCard.tsx)
camelCase        → variables, functions, methods
UPPER_SNAKE_CASE → constants and enums
```

---

## 3. Backend Rules (NestJS)

### Module structure — strict

Every feature module contains exactly these files:

```
notices/
  notices.module.ts
  notices.controller.ts
  notices.service.ts
  notices.repository.ts   ← only if complex DB logic warrants it
  dto/
    create-notice.dto.ts
    update-notice.dto.ts
    notice-response.dto.ts
  __tests__/
    notices.service.spec.ts
    notices.controller.spec.ts
```

No extra files. No `helpers.ts`, no `utils.ts` inside a module.

### Controllers

```typescript
// DO
@Get()
findAll(@Query() query: PaginateNoticesDto): Promise<PaginatedResponse<NoticeDto>> {
  return this.noticesService.findAll(query);
}

// DON'T — business logic in controller
@Get()
async findAll(@Query() query: PaginateNoticesDto) {
  const notices = await this.prisma.notice.findMany({ where: { status: 'PUBLISHED' } });
  return notices.filter(n => !n.expiresAt || n.expiresAt > new Date());
}
```

Controllers only: validate input, call service, return result. Nothing else.

### Services

```typescript
// DO — single responsibility, lean methods
async findAll(query: PaginateNoticesDto): Promise<PaginatedResponse<NoticeDto>> {
  const [data, total] = await Promise.all([
    this.prisma.notice.findMany({
      where: this.buildWhereClause(query),
      orderBy: { publishedAt: 'desc' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),
    this.prisma.notice.count({ where: this.buildWhereClause(query) }),
  ]);
  return { data, total, page: query.page, limit: query.limit };
}

// DON'T — method doing too many things, inline logic everywhere
async findAllNotices(page, limit, category, isUrgent, search) {
  let where: any = { status: 'PUBLISHED' };
  if (category) where.category = category;
  if (isUrgent) where.isUrgent = true;
  if (search) where.OR = [{ titleEn: { contains: search } }, ...];
  if (new Date() > someDate) { ... }
  // ... 40 more lines
}
```

### DTOs

- Use `class-validator` decorators on every field
- Use `@ApiProperty()` on every field (Swagger must be accurate)
- `CreateDto` — required fields
- `UpdateDto extends PartialType(CreateDto)` — nothing more

```typescript
// DO
export class CreateNoticeDto {
  @IsString()
  @MaxLength(200)
  @ApiProperty({ example: 'Class 10 Exam Schedule' })
  titleEn: string;

  @IsEnum(NoticeCategory)
  @ApiProperty({ enum: NoticeCategory })
  category: NoticeCategory;

  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;
}

// DON'T — raw types, no validation, no docs
export class CreateNoticeDto {
  titleEn: any;
  category: string;
  isUrgent;
}
```

### Error handling

Use NestJS built-in exceptions. Never throw raw `Error`.

```typescript
// DO
if (!notice) throw new NotFoundException(`Notice ${id} not found`);
if (notice.authorId !== userId) throw new ForbiddenException();

// DON'T
if (!notice) throw new Error('not found');
if (!notice) return null; // caller must guess
```

### Database access

- All DB access goes through Prisma — zero raw SQL unless `$queryRaw` is the only option
- No `findMany` without explicit `select` or `take` (never load unbounded rows)
- Always use transactions for multi-step writes

```typescript
// DO
const teacher = await this.prisma.teacher.findUnique({
  where: { id },
  select: { id: true, nameEn: true, designation: true, photoUrl: true },
});

// DON'T — select * equivalent
const teacher = await this.prisma.teacher.findUnique({ where: { id } });
```

---

## 4. Frontend Rules (Next.js)

### Component rules

- **One component per file.** No multi-export component files.
- **No inline styles.** CSS Modules only.
- **Props must be typed.** No `any`, no untyped props.
- **No component does data fetching AND rendering.** Split into container + presentational if needed.

```tsx
// DO — focused, typed, no inline styles
interface NoticeCardProps {
  title: string;
  category: NoticeCategory;
  publishedAt: string;
  attachmentUrl?: string;
  isUrgent?: boolean;
}

export function NoticeCard({ title, category, publishedAt, attachmentUrl, isUrgent }: NoticeCardProps) {
  return (
    <article className={`${styles.card} ${isUrgent ? styles.urgent : ''}`}>
      <CategoryBadge category={category} />
      <h3 className={styles.title}>{title}</h3>
      <time className={styles.date}>{formatDate(publishedAt)}</time>
      {attachmentUrl && <DownloadLink href={attachmentUrl} />}
    </article>
  );
}

// DON'T — inline styles, untyped props, mixed concerns
export function NoticeCard(props: any) {
  const [data, setData] = useState(null);
  useEffect(() => { fetch('/api/notices').then(...) }, []);
  return <div style={{ background: 'white', borderRadius: 12, padding: 24 }}>...</div>;
}
```

### CSS Modules structure

```
components/
  NoticeCard/
    NoticeCard.tsx
    NoticeCard.module.css
```

```css
/* NoticeCard.module.css */

/* DO — use design tokens, no magic numbers */
.card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.urgent {
  border-left: 3px solid var(--color-danger);
}

/* DON'T — magic numbers, repeated values */
.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
```

### Component reuse rules

Before creating any component, check if one already exists. The shared components are:

```
components/
  ui/
    Button          ← the only button in the entire app
    Badge           ← the only badge
    Card            ← base card wrapper
    Input           ← the only input
    Select          ← the only select
    Modal           ← the only modal
    Spinner         ← the only loading indicator
    Skeleton        ← the only skeleton loader
    Pagination      ← the only pagination
    EmptyState      ← the only empty state
  layout/
    Container       ← max-width + padding wrapper
    Section         ← section with consistent vertical spacing
    Grid            ← CSS grid wrapper with breakpoint props
```

If you need a variation, pass a `variant` prop — never create `ButtonSecondary.tsx` or `SmallCard.tsx`.

### Data fetching

- Server Components fetch data directly (no useEffect on public pages)
- Client Components use SWR for cached reads, Server Actions for mutations
- Never `useEffect` + `fetch` for data that can be server-rendered

```tsx
// DO — Server Component, direct fetch, zero JS shipped to client
export default async function NoticesPage({ searchParams }: PageProps) {
  const notices = await getNotices(searchParams);
  return <NoticeList notices={notices} />;
}

// DON'T — useEffect fetch on a page that doesn't need it
'use client';
export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  useEffect(() => { fetch('/api/notices').then(r => r.json()).then(setNotices); }, []);
  return <NoticeList notices={notices} />;
}
```

---

## 5. Design System

### Token-first — no exceptions

Every visual property must reference a CSS custom property. No raw hex, no raw pixel values, no magic numbers.

```css
/* globals.css — single source of truth */

:root {
  /* Color */
  --color-primary:     #1a3460;
  --color-primary-dark:#0c1f3f;
  --color-primary-light:#dbeafe;
  --color-accent:      #dc2626;
  --color-success:     #16a34a;
  --color-warning:     #d97706;
  --color-danger:      #dc2626;

  --color-surface:     #ffffff;
  --color-surface-alt: #f3f4f6;
  --color-bg:          #f9fafb;

  --color-text:        #111827;
  --color-text-muted:  #6b7280;
  --color-text-inverse:#ffffff;
  --color-border:      #e5e7eb;

  /* Typography */
  --font-sans:   'Inter', 'Hind Siliguri', system-ui, sans-serif;
  --font-mono:   'JetBrains Mono', monospace;

  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;

  --font-normal:   400;
  --font-medium:   500;
  --font-semibold: 600;
  --font-bold:     700;

  --leading-tight:   1.25;
  --leading-normal:  1.5;
  --leading-relaxed: 1.75;

  /* Spacing (4px base) */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;

  /* Layout */
  --container-max:  1200px;
  --sidebar-width:  240px;

  /* Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* Shadow */
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.08);
  --shadow-card: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md:   0 4px 16px rgba(0,0,0,0.12);
  --shadow-lg:   0 8px 32px rgba(0,0,0,0.14);

  /* Transitions */
  --transition-fast: 100ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Z-index */
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-modal:    300;
  --z-toast:    400;
}
```

### Responsive — mobile-first, always

```css
/* Mobile first — base styles are mobile */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* Tablet */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Large */
@media (min-width: 1280px) {
  .grid { grid-template-columns: repeat(4, 1fr); gap: var(--space-8); }
}
```

Breakpoints:

| Name | Width | Use |
|------|-------|-----|
| base | < 768px | Mobile default |
| md | 768px | Tablet |
| lg | 1024px | Laptop |
| xl | 1280px | Desktop |

### Typography rules

- Body text: `var(--text-base)`, `var(--leading-relaxed)` — critical for Bengali readability
- Headings: bold, tight leading, dark color
- Captions/labels: `var(--text-sm)`, muted color
- Never mix more than 2 font weights on a single component

### Component appearance rules

- Cards: `var(--radius-lg)`, `var(--shadow-card)`, `var(--color-surface)`
- Interactive elements: must have `:hover`, `:focus-visible`, and `:active` states
- Focus ring: `outline: 2px solid var(--color-primary); outline-offset: 2px;`
- Minimum touch target: 44x44px on mobile
- Transitions: always on `transform`, `box-shadow`, `opacity` — never on `all`
- No animations on `width`, `height`, or `color` (causes layout/paint)

---

## 6. Prisma / Database Rules

- Schema lives in `packages/prisma/schema.prisma` — one file, one truth
- Every model has `createdAt DateTime @default(now())` and `updatedAt DateTime @updatedAt`
- Every model has a `@@map("snake_case_table_name")`
- Add `@@index` for every foreign key and every field used in `where` clauses
- Migrations are auto-generated — never hand-edit a migration file
- Seed file lives at `packages/prisma/seed.ts` — contains realistic but minimal data

---

## 7. Testing Rules

- Unit tests live next to the code in `__tests__/`
- Test file naming: `notices.service.spec.ts` (mirrors source file)
- Each test file covers exactly one unit (service or controller)
- Use `describe` → `it` nesting — no flat `it()` calls
- Mock the Prisma client in unit tests — never hit a real DB in unit tests
- Minimum 80% line coverage before any PR merges

```typescript
// DO — clear, focused unit test
describe('NoticesService', () => {
  describe('findAll', () => {
    it('returns only published notices', async () => {
      prisma.notice.findMany.mockResolvedValue([mockPublishedNotice]);
      const result = await service.findAll({ page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
      expect(prisma.notice.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ status: 'PUBLISHED' }) })
      );
    });
  });
});

// DON'T — vague, no assertions, testing implementation
it('works', async () => {
  const result = await service.findAll({});
  expect(result).toBeDefined();
});
```

---

## 8. Git Rules

### Branch naming

```
feature/notices-module
fix/notice-expiry-bug
chore/update-prisma
```

### Commit messages — Conventional Commits, always

```
feat(notices): add PDF attachment support
fix(auth): rotate refresh token on every use
refactor(gallery): extract image resize to upload service
chore(deps): update prisma to 5.16
test(results): add service unit tests
```

### Pull requests

- One PR = one feature or one fix
- PR title = commit message format
- No "WIP" PRs merged
- All tests must pass before merge
- No PR larger than 400 lines changed without justification

---

## 9. What is Forbidden

| Thing | Why |
|-------|-----|
| `any` type in TypeScript | Defeats the purpose of TypeScript |
| `console.log` in production code | Use the NestJS Logger |
| Raw SQL strings (`$queryRaw`) unless documented | Use Prisma query API |
| `!important` in CSS | Signals broken specificity — fix the structure |
| Hardcoded colors/sizes in CSS | Use tokens — always |
| Unused variables or imports | Noise — delete them |
| `export default` for named things | Use named exports — easier to find |
| Multiple components in one file | One file = one component |
| Emoji in production UI | Renders inconsistently across OS/font |
| `setTimeout` hacks for timing issues | Fix the real race condition |
| Duplicate utility functions | One shared `lib/utils.ts` per app |
| `Object.assign({}, ...)` | Use spread or Prisma's built-in update |

---

## 10. Performance Rules

- All images: use `next/image`, WebP format, explicit `width` and `height`
- No `useEffect` data fetching on pages that can be Server Components
- Paginate all list endpoints — never return unbounded arrays
- Cache read-heavy public data (notices, teacher list) via Redis with explicit invalidation
- Bundle analysis: run `next build` — no chunk > 250KB without justification
- No synchronous operations in the NestJS request pipeline

---

*These rules apply to all code in this repository without exception.*  
*When in doubt: write less, be explicit, test it.*
