# Steven's Portfolio (v1.0)

A modern, full-stack portfolio application built with **Next.js 15** and **React 19** to showcase professional experience, projects, and technical skills.

This application features a fully integrated **Admin Dashboard** allowing for dynamic CRUD operations on work experience, education, and certificates directly from the UI, powered by a secure PostgreSQL database.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **Database:** PostgreSQL (via Neon / Supabase)
- **ORM:** [Prisma](https://www.prisma.io/) (v6)
- **Authentication:** NextAuth.js (v4) with BcryptJS
- **Content:** React Markdown (for rich text descriptions)
- **Deployment:** Vercel

## ✨ Key Features

- **Dynamic Content:** Work experience and education data are fetched from a PostgreSQL database, not hardcoded.
- **Admin Dashboard:** Secure interface to add, edit, or delete portfolio entries.
- **Smart Sorting:** Custom sorting algorithms to handle "Present" dates and chronological ordering.
- **Interactive UI:** Modals for editing data, automated logo search integration, and Markdown rendering.
