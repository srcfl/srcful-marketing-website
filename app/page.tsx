import Link from 'next/link'
import { ArrowRight, Zap, Shield, Gauge, Globe, CheckCircle, TrendingUp } from 'lucide-react'

export default function Home() {
  const customers = [
    'Eaton', 'Schneider Electric', 'ABB', 'Siemens', 'Tesla', 'SMA'
  ]

  const stats = [
    { value: '500K+', label: 'Connected devices' },
    { value: '200GWh+', label: 'Energy managed' },
    { value: '99.9%', label: 'Uptime reliability' },
    { value: '<100ms', label: 'Local response time' },
  ]

  const products = [
    {
      title: 'Connect',
      description: 'Secure device connectivity through local hardware. Connect and control thousands of energy devices with one unified API.',
      features: [
        'Hardware-based authentication',
        'Local edge processing',
        'Works offline',
        '1000+ device types supported',
      ],
      href: '/connect',
      icon: Zap,
    },
    {
      title: 'Optimize',
      description: 'Smart energy algorithms that run at the edge. Real-time optimization without cloud latency.',
      features: [
        'Sub-100ms response times',
        'Edge-based algorithms',
        'Predictive optimization',
        'Zero-downtime updates',
      ],
      href: '/optimize',
      icon: Gauge,
    },
    {
      title: 'Flex',
      description: 'Aggregate devices into flexible load for VPP programs. Market-ready flexibility services.',
      features: [
        'Real-time grid services',
        'Hardware-verified capacity',
        'Automated dispatch',
        'Multi-market participation',
      ],
      href: '/flex',
      icon: TrendingUp,
    },
  ]

  const useCases = [
    {
      title: 'Installers & Wholesalers',
      description: 'Deploy premium energy solutions with hardware that sets you apart from cloud-only competitors.',
      href: '/use-cases/installers',
    },
    {
      title: 'OEMs & Device Manufacturers',
      description: 'Integrate your hardware with a platform that understands the importance of local control.',
      href: '/use-cases/oems',
    },
    {
      title: 'Energy Companies & Utilities',
      description: 'Build reliable demand response and VPP programs with hardware-verified commitments.',
      href: '/use-cases/energy-companies',
    },
    {
      title: 'Developers & Engineers',
      description: 'Access powerful APIs backed by resilient hardware. Build with confidence.',
      href: '/use-cases/developers',
    },
  ]

  const whySourceful = [
    {
      title: 'Hardware-First Architecture',
      description: 'Unlike cloud-only platforms, our Zap device provides local control, security, and resilience. Your energy systems work even when the internet doesn\'t.',
      icon: Shield,
    },
    {
      title: 'True Real-Time Control',
      description: 'Sub-100ms response times at the edge. No round trips to the cloud means faster, more reliable control when it matters most.',
      icon: Gauge,
    },
    {
      title: 'Enterprise Security',
      description: 'Hardware-based authentication and encryption. Multi-tenant isolation. SOC 2 Type II certified. Your data never leaves your control.',
      icon: Shield,
    },
    {
      title: 'Global Scale, Local Control',
      description: 'Deploy anywhere, control everywhere. Our distributed architecture means no single point of failure and regulatory compliance by design.',
      icon: Globe,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 hero-pattern opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Hardware-powered energy coordination</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              One Platform,<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                1000+ Devices
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              The most secure, resilient energy coordination platform.<br className="hidden md:block" />
              Built on <span className="text-white font-semibold">local hardware</span> for reliable, real-time control.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/developers/quickstart"
                className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-xl flex items-center space-x-2"
              >
                <span>Start Building</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Contact Sales
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 font-medium mb-8">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {customers.map((customer) => (
              <div key={customer} className="text-gray-400 font-semibold text-lg">
                {customer}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware USP Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 text-sm font-semibold">The Sourceful Zap</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why hardware matters
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Cloud-only platforms are vulnerable to outages, latency, and security breaches. 
                Our Zap device provides <span className="font-semibold text-gray-900">local control, edge intelligence, and hardware-verified security</span> that keeps your energy systems running—always.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Works Offline</h3>
                    <p className="text-gray-600">Critical control functions continue even without internet connectivity</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Sub-100ms Response</h3>
                    <p className="text-gray-600">Edge processing eliminates cloud latency for real-time control</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hardware Security</h3>
                    <p className="text-gray-600">Cryptographic keys stored in secure hardware, not the cloud</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">No Third-Party APIs</h3>
                    <p className="text-gray-600">Direct device control without dependencies on unreliable cloud services</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                    <div className="w-full h-full flex items-center justify-center">
                      <Zap className="w-32 h-32 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Platform
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to build the future of energy apps. One integration, infinite possibilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const Icon = product.icon
              return (
                <div
                  key={product.title}
                  className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={product.href}
                    className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Sourceful */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Sourceful?
            </h2>
            <p className="text-xl text-gray-600">
              The only energy platform built from the ground up with hardware at its core
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whySourceful.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for every part of the energy ecosystem
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase) => (
              <Link
                key={useCase.title}
                href={useCase.href}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-all card-hover group"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold">
                  <span>Learn more</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to build the future?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Start exploring our APIs for free, or get in touch to create a custom plan
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/developers/quickstart"
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-xl inline-flex items-center space-x-2"
            >
              <span>Start Building</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
