# Sourceful Design System

Design system, components, and brand guidelines for Sourceful Energy.

**Live site:** [design.sourceful.energy](https://design.sourceful.energy)

## What's included

- **50+ React Components** - Built on Radix UI and styled with Tailwind CSS
- **Design Tokens** - Colors, typography, spacing, shadows as CSS variables
- **Brand Guidelines** - Logo, colors, typography, voice & tone
- **Dark Mode** - Full dark mode support across all components
- **Accessibility** - WCAG 2.1 AA compliant, keyboard navigation, screen reader support

## Quick Start

```bash
npm install @srcful/ui
```

```tsx
import { Button, Card, Input } from "@srcful/ui"
import "@srcful/ui/styles.css"

function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## For AI Assistants

This design system includes machine-readable component schemas. Point your Claude Code `CLAUDE.md` to this repo for AI-assisted development:

```markdown
# My App

## Design System
Uses Sourceful Design System: https://github.com/srcfl/srcful-design-system

See CLAUDE.md in that repo for component usage patterns.
```

## Structure

```
├── app/                    # Next.js documentation site
│   ├── docs/              # Getting started, tokens
│   ├── components/        # Component documentation
│   └── brand/             # Brand guidelines
├── components/
│   └── ui/                # React components
├── lib/                   # Utilities
└── registry/              # Component schemas (JSON)
```

## License

MIT © Sourceful Energy
