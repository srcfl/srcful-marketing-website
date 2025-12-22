import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for developers and small pilots',
      features: [
        'Up to 10 devices',
        'Core API access',
        'Basic telemetry data',
        'Community support',
        'Sandbox environment',
        '1,000 API calls/month',
      ],
      cta: 'Start Building',
      href: '/developers/quickstart',
      popular: false,
    },
    {
      name: 'Professional',
      price: 'Custom',
      description: 'For installers and growing deployments',
      features: [
        'Up to 1,000 devices',
        'Full API access',
        'Real-time telemetry',
        'Email support',
        'Zap hardware included',
        'Advanced optimization',
        'Webhooks & events',
        '100,000 API calls/month',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      href: '/contact',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For utilities and large-scale deployments',
      features: [
        'Unlimited devices',
        'White-label options',
        'Dedicated infrastructure',
        '24/7 priority support',
        'Custom hardware configs',
        'VPP orchestration',
        'Multi-tenancy support',
        'Unlimited API calls',
        'Custom SLA',
        'On-premise options',
      ],
      cta: 'Contact Sales',
      href: '/contact',
      popular: false,
    },
  ]

  const comparison = [
    {
      category: 'Core Features',
      features: [
        {
          name: 'Device Connectivity',
          starter: '10 devices',
          professional: '1,000 devices',
          enterprise: 'Unlimited',
        },
        {
          name: 'API Access',
          starter: 'Basic',
          professional: 'Full',
          enterprise: 'Full + Custom',
        },
        {
          name: 'Zap Hardware',
          starter: 'Sandbox only',
          professional: 'Included',
          enterprise: 'Custom configs',
        },
        {
          name: 'Response Time',
          starter: '<500ms',
          professional: '<100ms',
          enterprise: '<50ms',
        },
      ],
    },
    {
      category: 'Data & Analytics',
      features: [
        {
          name: 'Telemetry Data',
          starter: 'Basic',
          professional: 'Real-time',
          enterprise: 'Real-time + Custom',
        },
        {
          name: 'Data Retention',
          starter: '30 days',
          professional: '1 year',
          enterprise: 'Custom',
        },
        {
          name: 'Advanced Analytics',
          starter: false,
          professional: true,
          enterprise: true,
        },
      ],
    },
    {
      category: 'Support & SLA',
      features: [
        {
          name: 'Support',
          starter: 'Community',
          professional: 'Email',
          enterprise: '24/7 Priority',
        },
        {
          name: 'SLA Guarantee',
          starter: false,
          professional: '99.9%',
          enterprise: 'Custom',
        },
        {
          name: 'Dedicated Account Manager',
          starter: false,
          professional: false,
          enterprise: true,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free, scale as you grow. All plans include our hardware-first architecture 
            for unmatched security and reliability.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== 'Free' && <span className="text-gray-600 ml-2">/ month</span>}
                  </div>
                  <Link
                    href={plan.href}
                    className={`block w-full text-center px-6 py-4 rounded-lg font-semibold mb-8 transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare plans
            </h2>
            <p className="text-xl text-gray-600">
              Detailed feature comparison across all tiers
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {comparison.map((section, sectionIdx) => (
              <div key={section.category} className={sectionIdx > 0 ? 'border-t border-gray-200' : ''}>
                <div className="bg-gray-50 px-8 py-4">
                  <h3 className="text-lg font-bold text-gray-900">{section.category}</h3>
                </div>
                {section.features.map((feature, featureIdx) => (
                  <div
                    key={feature.name}
                    className={`grid grid-cols-4 gap-8 px-8 py-6 ${
                      featureIdx < section.features.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="col-span-1">
                      <span className="font-medium text-gray-900">{feature.name}</span>
                    </div>
                    <div className="text-center text-gray-700">
                      {typeof feature.starter === 'boolean' ? (
                        feature.starter ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        feature.starter
                      )}
                    </div>
                    <div className="text-center text-gray-700">
                      {typeof feature.professional === 'boolean' ? (
                        feature.professional ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        feature.professional
                      )}
                    </div>
                    <div className="text-center text-gray-700">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        feature.enterprise
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What's included with the Zap hardware?
              </h3>
              <p className="text-gray-600">
                Professional and Enterprise plans include Zap gateway hardware at no additional cost. 
                This includes the device, all necessary cables, and lifetime firmware updates. 
                The hardware enables local control, sub-100ms response times, and offline operation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I start with Starter and upgrade later?
              </h3>
              <p className="text-gray-600">
                Absolutely! Start with the free Starter plan to develop and test your integration. 
                When you're ready to deploy, upgrade to Professional or Enterprise seamlessly. 
                All your configurations and integrations will carry over.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What makes Sourceful different from cloud-only platforms?
              </h3>
              <p className="text-gray-600">
                Our hardware-first architecture means critical functions work even without internet connectivity. 
                You get sub-100ms response times (vs 200-500ms for cloud), hardware-level security, 
                and no dependency on third-party APIs. This makes us the most reliable choice for mission-critical energy applications.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do you offer custom enterprise pricing?
              </h3>
              <p className="text-gray-600">
                Yes! For large-scale deployments (1000+ devices), we offer custom pricing, 
                dedicated infrastructure, white-labeling options, and flexible SLAs. Contact our sales team to discuss your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Start building for free, or talk to sales for a custom plan
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/developers/quickstart"
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center space-x-2"
            >
              <span>Start Building</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
