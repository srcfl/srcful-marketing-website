import {
  Home,
  Building2,
  Zap,
  Car,
  Calculator,
  Sun,
  Battery,
  PlugZap,
  TrendingDown,
  FileText,
  Users,
  CircuitBoard,
  Wrench,
  Code,
  Mail,
  Layers,
  type LucideIcon,
} from "lucide-react";

export interface SitePage {
  name: string;
  href: string;
  description?: string;
  category: string;
  icon: LucideIcon;
}

export const sitePages: SitePage[] = [
  // Main Pages
  {
    name: "Home",
    href: "/",
    description: "Local energy coordination infrastructure",
    category: "Main",
    icon: Home,
  },
  {
    name: "About",
    href: "/about",
    description: "Our mission and team",
    category: "Main",
    icon: Users,
  },
  {
    name: "Contact",
    href: "/contact",
    description: "Get in touch with us",
    category: "Main",
    icon: Mail,
  },

  // Products
  {
    name: "Platform",
    href: "/platform",
    description: "The Grid Intelligence Layer",
    category: "Products",
    icon: Layers,
  },
  {
    name: "Zap Gateway",
    href: "/zap",
    description: "Local control at 200ms",
    category: "Products",
    icon: Zap,
  },
  {
    name: "V2X",
    href: "/v2x",
    description: "Vehicle-to-Grid solutions",
    category: "Products",
    icon: Car,
  },
  {
    name: "Pricing",
    href: "/pricing",
    description: "Plans and pricing",
    category: "Products",
    icon: Zap,
  },

  // Tools
  {
    name: "All Tools",
    href: "/tools",
    description: "Energy calculators and tools",
    category: "Tools",
    icon: Calculator,
  },
  {
    name: "Savings Calculator",
    href: "/tools/savings-calculator",
    description: "Calculate your energy savings",
    category: "Tools",
    icon: Calculator,
  },
  {
    name: "Solar ROI",
    href: "/tools/solar-roi",
    description: "Solar investment returns",
    category: "Tools",
    icon: Sun,
  },
  {
    name: "Battery Sizing",
    href: "/tools/battery-sizing",
    description: "Find the right battery size",
    category: "Tools",
    icon: Battery,
  },
  {
    name: "EV Charging",
    href: "/tools/ev-charging",
    description: "EV charging calculator",
    category: "Tools",
    icon: PlugZap,
  },
  {
    name: "V2X Savings",
    href: "/tools/v2x-savings",
    description: "Vehicle-to-Grid savings",
    category: "Tools",
    icon: Car,
  },
  {
    name: "Negative Prices",
    href: "/tools/negative-prices",
    description: "Spot negative price opportunities",
    category: "Tools",
    icon: TrendingDown,
  },

  // Use Cases
  {
    name: "For Homeowners",
    href: "/use-cases/homeowners",
    description: "Take control of your energy",
    category: "Use Cases",
    icon: Home,
  },
  {
    name: "For Utilities",
    href: "/use-cases/utilities",
    description: "Grid coordination at scale",
    category: "Use Cases",
    icon: Building2,
  },
  {
    name: "For OEMs",
    href: "/use-cases/oems",
    description: "Integrate with your hardware",
    category: "Use Cases",
    icon: CircuitBoard,
  },
  {
    name: "For Installers",
    href: "/use-cases/installers",
    description: "Simplify installations",
    category: "Use Cases",
    icon: Wrench,
  },

  // Developers
  {
    name: "Developers",
    href: "/developers",
    description: "Build on our platform",
    category: "Developers",
    icon: Code,
  },
  {
    name: "Community",
    href: "/community",
    description: "Join our community",
    category: "Developers",
    icon: Users,
  },

  // Resources
  {
    name: "Blog",
    href: "/blog",
    description: "News and insights",
    category: "Resources",
    icon: FileText,
  },
  {
    name: "Integrations",
    href: "/integrations",
    description: "Compatible devices and brands",
    category: "Resources",
    icon: Layers,
  },

  // Getting Started
  {
    name: "Get Started",
    href: "/get-started",
    description: "Start using Sourceful",
    category: "Getting Started",
    icon: Zap,
  },
  {
    name: "Get Started with Zap",
    href: "/get-started/zap",
    description: "Set up your Zap gateway",
    category: "Getting Started",
    icon: Zap,
  },
];

// Group pages by category
export function getPagesByCategory(): Record<string, SitePage[]> {
  const groups: Record<string, SitePage[]> = {};
  sitePages.forEach((page) => {
    if (!groups[page.category]) {
      groups[page.category] = [];
    }
    groups[page.category].push(page);
  });
  return groups;
}
