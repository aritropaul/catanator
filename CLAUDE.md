# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Catanator is a Catan board randomizer web app. It generates randomized hex tile layouts for Catan and Catan Expansion, enforcing the rule that 6s and 8s are never adjacent. Boards are shareable via FEN-like encoded URL slugs.

## Commands

- `npm run dev` — Start dev server at localhost:3000
- `npm run build` — Production build
- `npm run lint` — ESLint (next lint)
- No test suite exists

## Tech Stack

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui (Radix primitives)

## Architecture

### Routing

- `/` (`app/page.tsx`) — Home page, immediately generates a board and redirects to `/map/<code>`
- `/map/[slug]` (`app/map/[slug]/page.tsx`) — Displays a board decoded from the URL slug; this is the main view
- `/dice` (`app/dice/page.tsx`) — Probabilistically weighted dice roller

All pages are `'use client'` components.

### Core Logic

- **`lib/catan.ts`** — Board generation. `generateMap(type)` shuffles resources/numbers, arranges them into rows (5 rows for base, 7 for expansion), and re-shuffles until no 6/8 tiles are adjacent. `generatePorts(type)` shuffles port tokens.
- **`lib/share.ts`** — FEN-like encoding. `shareCode()` encodes a board+ports into a URL-safe string (e.g., `F3H8:M2E5:...::3,3,H,W`). `rebuildFrom()` decodes it back. Rows are `:` delimited, ports follow `::`.
- **`app/dice/dice.ts`** — Weighted dice pool. Generates a pool of ~150 numbers matching true 2d6 probability, then draws without replacement to simulate realistic dice distribution over a game.

### Map Components

- **`components/ui/maps/catan.tsx`** — Renders base game board (rows of 3-4-5-4-3 tiles)
- **`components/ui/maps/catanexp.tsx`** — Renders expansion board (rows of 3-4-5-6-5-4-3 tiles)
- **`components/ui/tile.tsx`** — Individual hex tile; maps resource type to PNG image from `/public/`
- **`components/ui/port.tsx`** — Port indicator component

### Game Modes

Two active modes selected via a dropdown: `'catan'` (19 tiles + 1 desert) and `'expansion-catan'` (28 tiles + 2 deserts). Seafarers modes exist in the UI but are disabled.

### Tile Type Codes

Used in share codes and throughout the codebase:
- F=Forests, D=Desert, E=Fields, M=Mountains, H=Hills, P=Pasture, G=Gold
- Port types: 3 (generic 3:1), H/W/B/S/O (resource-specific 2:1)
