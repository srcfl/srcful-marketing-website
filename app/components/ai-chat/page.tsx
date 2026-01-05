"use client";

import { useState } from "react";
import { AIChat, type ChatMessage } from "@/components/ui/ai-chat";
import { ComponentNav } from "@/components/component-nav";
import { Battery, Zap, Sun, Home } from "lucide-react";

// Sample conversation
const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "What's my current solar production?",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "2",
    role: "assistant",
    content: "Your solar panels are currently producing **3.5 kW** of power. This is about 70% of their peak capacity.\n\nHere's a breakdown:\n- Panel efficiency: 92%\n- Weather conditions: Partly cloudy\n- Expected production today: ~25 kWh",
    timestamp: new Date(Date.now() - 55000),
  },
  {
    id: "3",
    role: "user",
    content: "How can I optimize my energy usage?",
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: "4",
    role: "assistant",
    content: "Here are some recommendations to optimize your energy usage:\n\n1. **Shift heavy loads to solar hours** - Run dishwasher and laundry between 10am-3pm\n2. **Pre-cool your home** - Lower AC before peak rates kick in\n3. **Charge battery during low rates** - Set battery to charge from grid after midnight\n4. **Enable smart EV charging** - Schedule your car to charge during off-peak hours\n\nWould you like me to set up any of these automations?",
    timestamp: new Date(Date.now() - 25000),
  },
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `I received your message: "${message}"\n\nThis is a demo response. In a real implementation, this would connect to an AI backend to process your query about your energy system.`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">AI Chat</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Conversational AI interface for energy system management.
        </p>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Interactive Demo
        </h2>
        <p className="text-muted-foreground">
          Try sending a message to see the chat interface in action.
        </p>
        <AIChat
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          className="min-h-[400px]"
        />
      </div>

      {/* With Sample Conversation */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Sample Conversation
        </h2>
        <AIChat
          messages={sampleMessages}
          onSendMessage={() => {}}
          placeholder="This demo is read-only..."
          className="min-h-[400px]"
        />
      </div>

      {/* Custom Prompts */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Custom Suggested Prompts
        </h2>
        <AIChat
          messages={[]}
          onSendMessage={() => {}}
          suggestedPrompts={[
            { icon: <Sun className="w-4 h-4" />, text: "Solar forecast for today" },
            { icon: <Battery className="w-4 h-4" />, text: "Battery status" },
            { icon: <Home className="w-4 h-4" />, text: "Home consumption" },
            { icon: <Zap className="w-4 h-4" />, text: "Grid prices now" },
          ]}
          className="min-h-[350px]"
        />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Markdown rendering for AI responses (bold, lists, code blocks)</li>
          <li>Animated message bubbles with spring physics</li>
          <li>Auto-scrolling with scroll-up detection</li>
          <li>Thinking indicator with animated dots</li>
          <li>Customizable suggested prompts with icons</li>
          <li>Auto-resizing textarea (up to 200px)</li>
          <li>Keyboard shortcuts (Enter to send, Shift+Enter for newline)</li>
          <li>Loading state with cancel button</li>
          <li>Empty state with welcome message</li>
          <li>Dark mode support</li>
        </ul>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <div className="rounded-lg bg-sourceful-gray-100 dark:bg-sourceful-gray-800 border border-sourceful-gray-200 dark:border-transparent p-4 font-mono text-sm text-sourceful-gray-900 dark:text-white overflow-x-auto">
          <pre>
            <code>{`import { AIChat, type ChatMessage } from "@/components/ui/ai-chat"

const [messages, setMessages] = useState<ChatMessage[]>([])
const [isLoading, setIsLoading] = useState(false)

const handleSendMessage = async (message: string) => {
  // Add user message
  setMessages(prev => [...prev, {
    id: Date.now().toString(),
    role: "user",
    content: message,
    timestamp: new Date(),
  }])

  // Call your AI backend
  setIsLoading(true)
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  })
  const data = await response.json()

  // Add AI response
  setMessages(prev => [...prev, {
    id: (Date.now() + 1).toString(),
    role: "assistant",
    content: data.response,
    timestamp: new Date(),
  }])
  setIsLoading(false)
}

<AIChat
  messages={messages}
  onSendMessage={handleSendMessage}
  isLoading={isLoading}
  placeholder="Ask about your energy system..."
  suggestedPrompts={[
    { icon: <Zap />, text: "Solar production" },
    { icon: <Battery />, text: "Battery status" },
  ]}
/>`}</code>
          </pre>
        </div>
      </div>

      {/* Message Type */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          ChatMessage Type
        </h2>
        <div className="rounded-lg bg-sourceful-gray-100 dark:bg-sourceful-gray-800 border border-sourceful-gray-200 dark:border-transparent p-4 font-mono text-sm text-sourceful-gray-900 dark:text-white overflow-x-auto">
          <pre>
            <code>{`interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string         // Supports Markdown
  timestamp: Date
}`}</code>
          </pre>
        </div>
      </div>

      {/* Dependencies */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Dependencies
        </h2>
        <div className="rounded-lg bg-sourceful-gray-100 dark:bg-sourceful-gray-800 border border-sourceful-gray-200 dark:border-transparent p-4 font-mono text-sm text-sourceful-gray-900 dark:text-white overflow-x-auto">
          <pre>
            <code>{`npm install framer-motion react-markdown remark-gfm`}</code>
          </pre>
        </div>
      </div>

      <ComponentNav currentHref="/components/ai-chat" />
    </div>
  );
}
