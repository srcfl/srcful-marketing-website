import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const components = [
  {
    name: "Button",
    description: "Displays a button or a component that looks like a button.",
    href: "/components/button",
    category: "Forms",
  },
  {
    name: "Input",
    description: "Displays a form input field.",
    href: "/components/input",
    category: "Forms",
  },
  {
    name: "Label",
    description: "Renders an accessible label associated with controls.",
    href: "/components/label",
    category: "Forms",
  },
  {
    name: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    href: "/components/badge",
    category: "Data Display",
  },
  {
    name: "Card",
    description: "Displays a card with header, content, and footer.",
    href: "/components/card",
    category: "Data Display",
  },
  {
    name: "Table",
    description: "A responsive table component.",
    href: "/components/table",
    category: "Data Display",
  },
  {
    name: "Dialog",
    description: "A modal dialog that interrupts the user.",
    href: "/components/dialog",
    category: "Feedback",
  },
  {
    name: "Tooltip",
    description: "A popup that displays information related to an element.",
    href: "/components/tooltip",
    category: "Feedback",
  },
  {
    name: "Dropdown Menu",
    description: "Displays a menu to the user.",
    href: "/components/dropdown-menu",
    category: "Navigation",
  },
  {
    name: "Tabs",
    description: "A set of layered sections of content.",
    href: "/components/tabs",
    category: "Navigation",
  },
];

export default function ComponentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Components
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Browse and use our collection of reusable components.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Link key={component.name} href={component.href}>
            <Card className="h-full hover:border-sourceful-green-500 transition-colors">
              <CardHeader>
                <div className="text-xs text-muted-foreground mb-1">
                  {component.category}
                </div>
                <CardTitle className="text-lg">{component.name}</CardTitle>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
