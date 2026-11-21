# Adrija Sen — Product Management portfolio

React + TypeScript + Tailwind CSS + Framer Motion + Lucide. Deploy-ready for Vercel.

## Run
npm install
npm run dev        # local
npm run build      # production build in dist/ (Vercel runs this automatically)

## Before you deploy
1. Add your resume as `public/Adrija_Sen_Resume.pdf` (or change `resumeUrl` in `src/data/site.ts`).
2. Vendora: open `src/data/vendora.ts`, replace the [illustrative] scores, feature names and weeks with the
   values from your assignment, then set `VENDORA_ILLUSTRATIVE = false`. Also fill in the specific
   UrbanThread workaround in `src/data/projects.ts` (section id "urbanthread").
3. Groww: check the five experiment names in `src/components/widgets/Other.tsx` against your document.

## Editing content
All content lives in `src/data/`:
- `projects.ts`  case studies (sections are blocks: prose, list, pairs, note, widget). Append to add a project.
- `decisions.ts` decision log (`basis`: "documented" or "retrospective").
- `process.ts`, `experience.ts`, `toolkit.ts`, `achievements.ts`, `lab.ts`, `site.ts`.
Lab entries: set `status: "published"` when an entry is ready.

Case studies open at `#case-<slug>` (e.g. `/#case-vendora`), so every case study has a shareable link.
