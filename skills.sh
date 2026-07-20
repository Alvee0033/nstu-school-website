#!/bin/bash
# ============================================================
#  skills.sh — Import all required skills for NSTU School Website
#  Project: NSTU School Website (NestJS + PostgreSQL + Prisma)
#  Run this script once to bootstrap the project's skill set
# ============================================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║   NSTU School Website — Importing Required Skills        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# ── Backend / API Development ──────────────────────────────────
echo "📦 [1/9] Backend Development Skills..."
gsd import-skill backend-development-feature-development  2>/dev/null || echo "  ↳ backend-development-feature-development"
gsd import-skill api-design-principles                    2>/dev/null || echo "  ↳ api-design-principles"
gsd import-skill openapi-spec-generation                  2>/dev/null || echo "  ↳ openapi-spec-generation"
gsd import-skill fastapi-pro                              2>/dev/null || echo "  ↳ fastapi-pro (NestJS patterns reference)"

# ── Database / ORM ─────────────────────────────────────────────
echo "🗄️  [2/9] Database Skills..."
gsd import-skill postgresql                               2>/dev/null || echo "  ↳ postgresql"
gsd import-skill database-migrations-sql-migrations       2>/dev/null || echo "  ↳ database-migrations-sql-migrations"
gsd import-skill database-migrations-migration-observability 2>/dev/null || echo "  ↳ database-migrations-migration-observability"
gsd import-skill sql-pro                                  2>/dev/null || echo "  ↳ sql-pro"

# ── Security ───────────────────────────────────────────────────
echo "🔒 [3/9] Security Skills..."
gsd import-skill backend-security-coder                   2>/dev/null || echo "  ↳ backend-security-coder"
gsd import-skill secrets-management                       2>/dev/null || echo "  ↳ secrets-management"
gsd import-skill security-scanning-security-sast          2>/dev/null || echo "  ↳ security-scanning-security-sast"
gsd import-skill security-scanning-security-hardening     2>/dev/null || echo "  ↳ security-scanning-security-hardening"

# ── Testing ─────────────────────────────────────────────────────
echo "🧪 [4/9] Testing Skills..."
gsd import-skill tdd-workflows-tdd-cycle                  2>/dev/null || echo "  ↳ tdd-workflows-tdd-cycle"
gsd import-skill tdd-workflows-tdd-red                    2>/dev/null || echo "  ↳ tdd-workflows-tdd-red"
gsd import-skill tdd-workflows-tdd-green                  2>/dev/null || echo "  ↳ tdd-workflows-tdd-green"
gsd import-skill unit-testing-test-generate               2>/dev/null || echo "  ↳ unit-testing-test-generate"
gsd import-skill python-testing-patterns                  2>/dev/null || echo "  ↳ python-testing-patterns"

# ── Frontend (Next.js) ─────────────────────────────────────────
echo "🎨 [5/9] Frontend Skills..."
gsd import-skill nextjs-app-router-patterns               2>/dev/null || echo "  ↳ nextjs-app-router-patterns"
gsd import-skill react-state-management                   2>/dev/null || echo "  ↳ react-state-management"
gsd import-skill modern-web-guidance                      2>/dev/null || echo "  ↳ modern-web-guidance"
gsd import-skill tailwind-design-system                   2>/dev/null || echo "  ↳ tailwind-design-system"

# ── DevOps / Deployment ─────────────────────────────────────────
echo "🚀 [6/9] DevOps Skills..."
gsd import-skill deployment-pipeline-design               2>/dev/null || echo "  ↳ deployment-pipeline-design"
gsd import-skill deployment-validation-config-validate    2>/dev/null || echo "  ↳ deployment-validation-config-validate"
gsd import-skill bash-pro                                 2>/dev/null || echo "  ↳ bash-pro"
gsd import-skill bash-defensive-patterns                  2>/dev/null || echo "  ↳ bash-defensive-patterns"

# ── Code Quality ───────────────────────────────────────────────
echo "✅ [7/9] Code Quality Skills..."
gsd import-skill code-review-excellence                   2>/dev/null || echo "  ↳ code-review-excellence"
gsd import-skill code-review-ai-ai-review                 2>/dev/null || echo "  ↳ code-review-ai-ai-review"
gsd import-skill code-refactoring-tech-debt               2>/dev/null || echo "  ↳ code-refactoring-tech-debt"
gsd import-skill debugger                                 2>/dev/null || echo "  ↳ debugger"
gsd import-skill error-debugging-error-analysis           2>/dev/null || echo "  ↳ error-debugging-error-analysis"

# ── SEO ────────────────────────────────────────────────────────
echo "🔍 [8/9] SEO Skills..."
gsd import-skill seo-meta-optimizer                       2>/dev/null || echo "  ↳ seo-meta-optimizer"
gsd import-skill seo-structure-architect                  2>/dev/null || echo "  ↳ seo-structure-architect"
gsd import-skill seo-content-writer                       2>/dev/null || echo "  ↳ seo-content-writer"
gsd import-skill seo-snippet-hunter                       2>/dev/null || echo "  ↳ seo-snippet-hunter"

# ── Caching & Performance ──────────────────────────────────────
echo "⚡ [9/9] Performance & Caching Skills..."
gsd import-skill application-performance-performance-optimization  2>/dev/null || echo "  ↳ application-performance-performance-optimization"
gsd import-skill microservices-patterns                   2>/dev/null || echo "  ↳ microservices-patterns"

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║   ✅  All skills imported successfully!                  ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║   Next Steps:                                            ║"
echo "║   1. Run: gsd new-project                                ║"
echo "║   2. Run: gsd new-milestone \"Phase 1 - Foundation\"       ║"
echo "║   3. Run: gsd plan-phase                                 ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
