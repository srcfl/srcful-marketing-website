'use client'

import { useState } from 'react'
import { Check, Copy, Terminal, Key, Zap, Code } from 'lucide-react'
import Link from 'next/link'

export default function Quickstart() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const steps = [
    {
      number: '01',
      title: 'Get your API credentials',
      description: 'Sign up for a Sourceful developer account and generate your API token.',
      code: `# Your API credentials will look like this:
API_TOKEN=src_live_abc123...
API_KEY=sk_live_xyz789...`,
      codeId: 'credentials',
    },
    {
      number: '02',
      title: 'Install the SDK (optional)',
      description: 'We provide SDKs for popular languages, or use our REST API directly.',
      code: `# JavaScript/TypeScript
npm install @sourceful/sdk

# Python
pip install sourceful-sdk

# Or just use curl - no SDK required!`,
      codeId: 'install',
    },
    {
      number: '03',
      title: 'List your devices',
      description: 'Fetch all devices connected through your Zap gateways.',
      code: `import { Sourceful } from '@sourceful/sdk';

const sourceful = new Sourceful({
  apiToken: 'src_live_abc123...'
});

const devices = await sourceful.devices.list();
console.log(devices);`,
      codeId: 'list-devices',
    },
    {
      number: '04',
      title: 'Control a device',
      description: 'Send commands to devices with sub-100ms latency via local Zap.',
      code: `// Start EV charging at 7.4kW
await sourceful.devices.control('dev_123', {
  action: 'start_charging',
  params: {
    rate_kw: 7.4,
    duration_minutes: 120
  }
});

// Response includes execution confirmation
// from your local Zap hardware`,
      codeId: 'control',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
            <Terminal className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 text-sm font-semibold">Quickstart Guide</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get started in minutes
          </h1>
          <p className="text-xl text-gray-600">
            Build your first energy application with the Sourceful API. This guide will have you 
            controlling devices in under 10 minutes.
          </p>
        </div>

        {/* What You'll Need */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll need</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Developer Account</h3>
                <p className="text-sm text-gray-600">Free to create, no credit card required</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Zap Gateway (optional)</h3>
                <p className="text-sm text-gray-600">Use sandbox mode to test without hardware</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Your Favorite Language</h3>
                <p className="text-sm text-gray-600">JavaScript, Python, Go, or plain HTTP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-6">{step.description}</p>
                    
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between px-6 py-3 bg-gray-800">
                        <span className="text-gray-400 text-sm font-mono">Code</span>
                        <button
                          onClick={() => copyToClipboard(step.code, step.codeId)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedCode === step.codeId ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span className="text-sm">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span className="text-sm">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-6">
                        <pre className="text-gray-300 text-sm font-mono overflow-x-auto">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Next steps</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/developers/api-reference"
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-all group"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Explore the API Reference →
              </h3>
              <p className="text-sm text-gray-600">
                Complete documentation of all endpoints, parameters, and responses
              </p>
            </Link>
            <Link
              href="/developers/code-examples"
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-all group"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Browse Code Examples →
              </h3>
              <p className="text-sm text-gray-600">
                Real-world examples for common use cases and integrations
              </p>
            </Link>
            <Link
              href="/developers/device-integration"
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-all group"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Device Integration Guide →
              </h3>
              <p className="text-sm text-gray-600">
                Learn how to integrate specific device types with your Zap
              </p>
            </Link>
            <Link
              href="/developers/webhooks"
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-all group"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                Set up Webhooks →
              </h3>
              <p className="text-sm text-gray-600">
                Receive real-time notifications when device states change
              </p>
            </Link>
          </div>
        </div>

        {/* Help */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need help? We're here to support you
          </p>
          <div className="flex items-center justify-center space-x-6">
            <a href="https://discord.gg/srcful" className="text-blue-600 hover:text-blue-700 font-medium">
              Join Discord
            </a>
            <span className="text-gray-300">|</span>
            <a href="https://docs.sourceful.energy" className="text-blue-600 hover:text-blue-700 font-medium">
              Read Docs
            </a>
            <span className="text-gray-300">|</span>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
