import Link from 'next/link'
import { ArrowRight, Shield, Zap, Cloud, Server, Lock, Gauge } from 'lucide-react'

export default function Platform() {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              The complete energy coordination platform
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Unlike cloud-only competitors, Sourceful combines local hardware with cloud orchestration 
              for unmatched security, resilience, and performance.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Talk to Sales
              </Link>
              <Link
                href="/developers/quickstart"
                className="px-6 py-3 bg-white/10 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cloud-only vs. Hardware-first
            </h2>
            <p className="text-xl text-gray-600">
              See why leading energy companies choose Sourceful
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cloud-Only */}
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <Cloud className="w-8 h-8 text-gray-400" />
                <h3 className="text-2xl font-bold text-gray-900">Cloud-Only Platforms</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 text-xl">✗</span>
                  <span className="text-gray-700">Vulnerable to internet outages</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 text-xl">✗</span>
                  <span className="text-gray-700">200-500ms latency to cloud and back</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 text-xl">✗</span>
                  <span className="text-gray-700">Dependent on third-party APIs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 text-xl">✗</span>
                  <span className="text-gray-700">Security keys stored in cloud</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 text-xl">✗</span>
                  <span className="text-gray-700">No local processing capability</span>
                </li>
              </ul>
            </div>

            {/* Hardware-First */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-500 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  SOURCEFUL
                </div>
              </div>
              <div className="flex items-center space-x-3 mb-6">
                <Server className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Hardware-First Platform</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-900 font-medium">Works offline - critical functions continue</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-900 font-medium">&lt;100ms response time at the edge</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-900 font-medium">Direct device control, no intermediaries</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-900 font-medium">Hardware security module built-in</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-900 font-medium">Edge AI and optimization algorithms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for resilience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three-tier architecture ensures your energy systems are always operational
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Edge Layer (Zap)</h3>
              <p className="text-gray-600 mb-6">
                Local hardware at every installation. Handles critical control, security, and real-time processing. 
                Works independently when internet fails.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Local device control</li>
                <li>• Hardware security keys</li>
                <li>• Edge optimization</li>
                <li>• Offline operation</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Cloud className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cloud Layer</h3>
              <p className="text-gray-600 mb-6">
                Scalable cloud services for orchestration, data analytics, and multi-site coordination. 
                Augments edge capabilities without creating dependencies.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Fleet management</li>
                <li>• Advanced analytics</li>
                <li>• Market integration</li>
                <li>• Remote monitoring</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">API Layer</h3>
              <p className="text-gray-600 mb-6">
                Unified RESTful and GraphQL APIs. Build applications that work seamlessly across 
                edge and cloud, with automatic failover.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Unified interface</li>
                <li>• Automatic routing</li>
                <li>• Version control</li>
                <li>• Developer tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Components */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need, in one platform
            </h2>
          </div>

          <div className="space-y-16">
            {/* Connect */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Connect</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Connect to 1000+ energy devices through one API. Our Zap hardware handles the complexity 
                  of different protocols and manufacturers, presenting a unified interface to your applications.
                </p>
                <Link
                  href="/connect"
                  className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700"
                >
                  <span>Learn more about Connect</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 h-80 flex items-center justify-center">
                <Zap className="w-32 h-32 text-blue-600" />
              </div>
            </div>

            {/* Optimize */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 h-80 flex items-center justify-center">
                <Gauge className="w-32 h-32 text-purple-600" />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Optimize</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Run optimization algorithms at the edge for instant response. Smart charging, load balancing, 
                  and demand response all execute locally with sub-100ms latency.
                </p>
                <Link
                  href="/optimize"
                  className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700"
                >
                  <span>Learn more about Optimize</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Flex */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Flex</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Aggregate devices into virtual power plants with hardware-verified capacity commitments. 
                  Participate in flexibility markets with confidence.
                </p>
                <Link
                  href="/flex"
                  className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700"
                >
                  <span>Learn more about Flex</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-12 h-80 flex items-center justify-center">
                <Lock className="w-32 h-32 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to build with Sourceful?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join leading energy companies building on the most resilient platform
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Talk to Sales
            </Link>
            <Link
              href="/developers/quickstart"
              className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
