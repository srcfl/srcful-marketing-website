# Sourceful Design System

This is the official design system for Sourceful Energy. It contains React components, design tokens, and brand guidelines.

## Quick Reference for AI Assistants

When building UIs for Sourceful projects, use components from this design system:

```tsx
import { Button, Card, Input, Label, Badge, Tooltip, Dialog, DropdownMenu, Tabs, Table } from "@srcful/ui"
```

## Design Tokens

### Colors
- **Primary (Green)**: `sourceful-green-500` (#22c55e) - Use for primary actions, links, success states
- **Accent (Yellow)**: `sourceful-yellow-400` (#facc15) - Use for highlights, warnings, energy indicators
- **Text Primary**: `sourceful-gray-900` (#111827)
- **Text Secondary**: `sourceful-gray-600` (#4b5563)
- **Background**: White (light) / `#0a0a0a` (dark)
- **Borders**: `sourceful-gray-200` (#e5e7eb)

### Typography
- **Sans font**: Inter - Use for all UI text
- **Mono font**: JetBrains Mono - Use for code, technical values

### Spacing Scale
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px (base unit)
- `space-6`: 24px
- `space-8`: 32px

### Border Radius
- `radius-sm`: 4px
- `radius-md`: 8px (default for buttons, inputs)
- `radius-lg`: 12px (cards, dialogs)

## Component Usage

### Button
```tsx
// Primary action
<Button>Save Changes</Button>

// Secondary action
<Button variant="outline">Cancel</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// With icon
<Button><Icon className="mr-2 h-4 w-4" /> Label</Button>

// Loading state
<Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading</Button>
```

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Form Inputs
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="name@example.com" />
</div>
```

### Dialog
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Patterns

### Layout
- Use `container` class for max-width content areas
- Standard page padding: `py-6 lg:py-8`
- Card grid: `grid gap-4 md:grid-cols-2 lg:grid-cols-3`

### Dark Mode
- System uses `class` strategy with `.dark` on `<html>`
- All components support dark mode automatically
- Use `bg-background` and `text-foreground` for adaptive colors

### Accessibility
- All components are WCAG 2.1 AA compliant
- Use `Label` with form inputs (connect via `htmlFor`)
- Buttons have visible focus rings
- Dialogs trap focus and support Escape to close

## File Structure

```
srcful-design-system/
├── app/                    # Next.js docs site
├── components/
│   ├── ui/                 # Base components (Button, Input, etc.)
│   └── *.tsx               # Site components
├── lib/
│   └── utils.ts            # Utility functions (cn)
└── registry/               # Component schemas (JSON)
```

## Development

```bash
npm install
npm run dev     # Start dev server at localhost:3000
npm run build   # Production build
```

## Links
- Docs: https://design.sourceful.energy
- GitHub: https://github.com/srcfl/srcful-design-system
