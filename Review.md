# PontLook SaaS - Project Review & Architecture

## 1. Project Overview

**PontLook** is a multilingual Software-as-a-Service (SaaS) web application built using modern web development standards. The application features a fully responsive design, animated UI components, form validation, and internationalization (i18n) support out of the box.

## 2. Technology Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS & PostCSS
*   **Animations**: Framer Motion
*   **Form Management & Validation**: React Hook Form with Zod resolvers
*   **Content Management**: `next-mdx-remote` for rendering Markdown/MDX content (e.g., Insights, Research)
*   **Icons**: Lucide React

## 3. Architecture & Routing Graph

The application follows the Next.js App Router architecture with route groups and dynamic parameters for internationalization (`[lang]`).

```mermaid
graph TD
    %% Main Architecture
    App(Next.js App Router) --> Lang[/[lang] Route Segment]
    
    %% Middleware & i18n
    MW[middleware.ts] -.->|Redirects to /en or /ar| Lang
    I18N[src/i18n] -.->|Dictionaries| Lang
    
    %% Pages
    Lang --> Home[/]
    Lang --> Contact[/contact]
    Lang --> FindTraining[/find-training]
    Lang --> ForProviders[/for-providers]
    Lang --> Research[/research]
    
    %% Components Structure
    Components(src/components)
    Home -.-> Components
    Contact -.-> Components
    
    subgraph UI Components
        Components --> Layout[layout: Navbar, Footer]
        Components --> HomeUI[home: Hero, HowItWorks, TrustBar...]
        Components --> Shared[shared: Reveal, SectionHeading...]
        Components --> ProviderUI[providers]
        Components --> Wizard[wizard]
    end
    
    %% Content
    Lib(src/lib/posts.ts) --> MDX(Content: /content, /insights)
    Research -.-> Lib
```

## 4. Directory Structure Details

Here is the high-level schema of the codebase:

*   **`src/app/`**: Contains the main Next.js App Router pages and global layouts.
    *   **`[lang]/`**: The root of the localized application paths. All page logic is wrapped inside this folder to support URLs like `/en/contact` or `/ar/contact`.
    *   **`api/`**: Next.js API routes (if any).
*   **`src/components/`**: Modular, reusable React UI components, segmented by feature domain:
    *   **`home/`**: Landing page specific components (`Hero`, `HowItWorks`, `WhyDifferent`, etc.).
    *   **`layout/`**: Core shell components (`Navbar`, `Footer`).
    *   **`shared/`**: Generic building blocks (`Reveal`, `SectionHeading`, `FramerMotionProvider`).
    *   **`wizard/` & `providers/`**: Domain-specific UI flows.
*   **`src/i18n/`**: Handles internationalization logic.
    *   **`dictionaries/`**: Contains translation strings (`en.ts`, `ar.ts`).
*   **`src/lib/`**: Core utilities, including `posts.ts` for parsing markdown/MDX files.
*   **Root Configuration Files**:
    *   **`middleware.ts`**: Intercepts requests to inject the default locale (`en`) and handle routing for i18n.
    *   **`tailwind.config.ts`**: Tailwind UI configuration and theme variables.
    *   **`package.json`**: Defines dependencies and custom scripts (e.g., `npm run deploy`).

## 5. Key Features & Implementation Details

1.  **Internationalization (i18n)**: Handled elegantly via Next.js middleware. Users visiting the root `/` are redirected to `/[locale]`. Page components receive `params.lang` and fetch strings from `src/i18n/dictionaries`.
2.  **Markdown Driven Content**: The `next-mdx-remote` and `gray-matter` libraries are set up to parse `.md` or `.mdx` content from root folders like `/content` and `/insights`. `src/lib/posts.ts` likely contains the logic to parse these files and feed them to the `/research` or `/insights` routes.
3.  **Client-Side Animations**: Framer Motion is utilized extensively (`FramerMotionProvider.tsx`, `Reveal.tsx`) to trigger enter animations when elements scroll into view.
4.  **Static Exports**: The build command includes `cp -R out/* .` indicating that the app is exported statically and deployed to a traditional static hosting environment (likely via the custom `deploy` script).
