# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (opens on http://localhost:3000)
- **Build for production**: `npm run build`
- **Start production server**: `npm run start`
- **Lint code**: `npm run lint`

## Project Architecture

This is a Next.js 15 application using the Pages Router architecture with TypeScript and Tailwind CSS.

### Key Structure
- **Pages Router**: Uses `/pages` directory for routing
  - `pages/index.tsx` - Main homepage component
  - `pages/_app.tsx` - Global app component wrapper
  - `pages/_document.tsx` - Custom document structure
  - `pages/api/` - API routes directory
- **Styling**: Tailwind CSS v4 configured via PostCSS
- **TypeScript**: Strict mode enabled with path alias `@/*` pointing to root
- **Font**: Uses Geist Sans and Geist Mono from next/font/google

### Configuration Files
- `next.config.ts` - Next.js configuration with React Strict Mode
- `tsconfig.json` - TypeScript config with path aliases and strict settings
- `eslint.config.mjs` - ESLint using Next.js core-web-vitals and TypeScript rules
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS

### Development Notes
- Uses React 19 and Next.js 15.3.4
- No test framework currently configured
- Global styles in `styles/globals.css`
- Static assets in `public/` directory