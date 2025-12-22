'use client'

import { useState } from 'react'
import { Copy, Check, ChevronRight, Zap, Database, Lock, Activity, Code } from 'lucide-react'

export default function APIReference() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedEndpoint, setSelectedEndpoint] = useState('list-devices')
  const [selectedLanguage, setSelectedLanguage] = useState('curl')

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const endpoints = [
    {
      id: 'list-devices',
      category: 'Devices',
      method: 'GET',
      path: '/v1/devices',
      title: 'List all devices',
      description: 'Retrieve a list of all devices connected to your account',
      auth: 'Bearer token',
    },
    {
      id: 'get-device',
      category: 'Devices',
      method: 'GET',
      path: '/v1/devices/{device_id}',
      title: 'Get device details',
      description: 'Retrieve detailed information about a specific device',
      auth: 'Bearer token',
    },
    {
      id: 'control-device',
      category: 'Control',
      method: 'POST',
      path: '/v1/devices/{device_id}/control',
      title: 'Control device',
      description: 'Send control commands to a device',
      auth: 'Bearer token',
    },
    {
      id: 'get-telemetry',
      category: 'Telemetry',
      method: 'GET',
      path: '/v1/telemetry/{device_id}',
      title: 'Get telemetry data',
      description: 'Retrieve real-time and historical telemetry data',
      auth: 'Bearer token',
    },
    {
      id: 'create-schedule',
      category: 'Optimization',
      method: 'POST',
      path: '/v1/schedules',
      title: 'Create optimization schedule',
      description: 'Create an optimization schedule for smart charging or load management',
      auth: 'Bearer token',
    },
    {
      id: 'get-prices',
      category: 'Market Data',
      method: 'GET',
      path: '/v1/prices',
      title: 'Get electricity prices',
      description: 'Retrieve current and forecasted electricity prices',
      auth: 'API key',
    },
  ]

  const codeExamples: Record<string, Record<string, string>> = {
    'list-devices': {
      curl: `curl https://api.sourceful.energy/v1/devices \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`,
      javascript: `const response = await fetch('https://api.sourceful.energy/v1/devices', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
});

const devices = await response.json();
console.log(devices);`,
      python: `import requests

response = requests.get(
    'https://api.sourceful.energy/v1/devices',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'Content-Type': 'application/json'
    }
)

devices = response.json()
print(devices)`,
    },
    'control-device': {
      curl: `curl -X POST https://api.sourceful.energy/v1/devices/dev_123/control \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "action": "set_charge_rate",
    "params": {
      "rate_kw": 7.4,
      "duration_minutes": 120
    }
  }'`,
      javascript: `const response = await fetch(
  'https://api.sourceful.energy/v1/devices/dev_123/control',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'set_charge_rate',
      params: {
        rate_kw: 7.4,
        duration_minutes: 120
      }
    })
  }
);

const result = await response.json();`,
      python: `import requests

response = requests.post(
    'https://api.sourceful.energy/v1/devices/dev_123/control',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'Content-Type': 'application/json'
    },
    json={
        'action': 'set_charge_rate',
        'params': {
            'rate_kw': 7.4,
            'duration_minutes': 120
        }
    }
)

result = response.json()`,
    },
  }

  const responseExample = {
    'list-devices': {
      data: [
        {
          id: 'dev_zap_abc123',
          type: 'zap_gateway',
          name: 'Home Gateway',
          status: 'online',
          last_seen: '2025-12-22T14:30:00Z',
          firmware_version: '2.4.1',
          capabilities: ['meter_reading', 'device_control', 'edge_optimization'],
        },
        {
          id: 'dev_ev_def456',
          type: 'ev_charger',
          name: 'Garage Charger',
          status: 'charging',
          last_seen: '2025-12-22T14:29:55Z',
          power_kw: 7.4,
          session_energy_kwh: 12.3,
        },
      ],
      meta: {
        total: 2,
        page: 1,
        per_page: 20,
      },
    },
    'control-device': {
      success: true,
      command_id: 'cmd_789xyz',
      status: 'executing',
      estimated_completion: '2025-12-22T16:30:00Z',
    },
  }

  const selectedEndpointData = endpoints.find((e) => e.id === selectedEndpoint)
  const currentCode = codeExamples[selectedEndpoint]?.[selectedLanguage] || ''
  const currentResponse = responseExample[selectedEndpoint as keyof typeof responseExample]

  const categories = Array.from(new Set(endpoints.map((e) => e.category)))

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
            <Code className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 text-sm font-semibold">API Reference</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Sourceful Energy API</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Complete API reference for building energy applications on the Sourceful platform. 
            Control devices, access real-time data, and optimize energy usage at scale.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Base URL</h3>
            <code className="text-sm text-gray-600">api.sourceful.energy</code>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Authentication</h3>
            <p className="text-sm text-gray-600">Bearer token or API key</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
            <div className="status-healthy">Healthy</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Database className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Rate Limits</h3>
            <p className="text-sm text-gray-600">1000 req/min</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar - Endpoints List */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-28">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Endpoints</h3>
              </div>
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {categories.map((category) => (
                  <div key={category} className="border-b border-gray-200 last:border-b-0">
                    <div className="p-3 bg-gray-50 text-sm font-semibold text-gray-700">
                      {category}
                    </div>
                    <div>
                      {endpoints
                        .filter((e) => e.category === category)
                        .map((endpoint) => (
                          <button
                            key={endpoint.id}
                            onClick={() => setSelectedEndpoint(endpoint.id)}
                            className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-l-4 ${
                              selectedEndpoint === endpoint.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-transparent'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span
                                className={`text-xs font-semibold px-2 py-1 rounded ${
                                  endpoint.method === 'GET'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {endpoint.method}
                              </span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {endpoint.title}
                            </div>
                            <code className="text-xs text-gray-500 mt-1 block">
                              {endpoint.path}
                            </code>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Endpoint Details */}
          <div className="lg:col-span-8 space-y-6">
            {selectedEndpointData && (
              <>
                {/* Endpoint Header */}
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded ${
                        selectedEndpointData.method === 'GET'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {selectedEndpointData.method}
                    </span>
                    <code className="text-lg font-mono text-gray-700">
                      {selectedEndpointData.path}
                    </code>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedEndpointData.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {selectedEndpointData.description}
                  </p>
                  <div className="mt-6 flex items-center space-x-2 text-sm">
                    <Lock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      Authentication: <code className="text-gray-900 font-mono">{selectedEndpointData.auth}</code>
                    </span>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-900 p-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      {['curl', 'javascript', 'python'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLanguage(lang)}
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                            selectedLanguage === lang
                              ? 'bg-gray-700 text-white'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {lang === 'curl' ? 'cURL' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => copyToClipboard(currentCode, selectedEndpoint)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === selectedEndpoint ? (
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
                  <div className="bg-gray-900 p-6 overflow-x-auto">
                    <pre className="text-gray-300 text-sm font-mono">
                      <code>{currentCode}</code>
                    </pre>
                  </div>
                </div>

                {/* Response Example */}
                {currentResponse && (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Response Example</h3>
                    </div>
                    <div className="bg-gray-900 p-6 overflow-x-auto">
                      <pre className="text-gray-300 text-sm font-mono">
                        <code>{JSON.stringify(currentResponse, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
                  <p className="text-blue-800">
                    All Sourceful API endpoints return data within 100ms when using local Zap hardware. 
                    For optimal performance, consider caching frequently accessed data and using webhooks 
                    for real-time updates.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
