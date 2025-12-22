'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const products = [
    { name: 'Platform Overview', href: '/platform', description: 'Complete energy coordination solution' },
    { name: 'Connect', href: '/connect', description: 'Device connectivity & control' },
    { name: 'Optimize', href: '/optimize', description: 'Smart energy algorithms' },
    { name: 'Flex', href: '/flex', description: 'Virtual power plant services' },
  ]

  const useCases = [
    { name: 'For Installers & Wholesalers', href: '/use-cases/installers' },
    { name: 'For OEMs', href: '/use-cases/oems' },
    { name: 'For Energy Companies', href: '/use-cases/energy-companies' },
    { name: 'For Developers', href: '/use-cases/developers' },
  ]

  const developers = [
    { name: 'API Reference', href: '/developers/api-reference' },
    { name: 'Quickstart', href: '/developers/quickstart' },
    { name: 'Authentication', href: '/developers/authentication' },
    { name: 'Device Integration', href: '/developers/device-integration' },
    { name: 'Code Examples', href: '/developers/code-examples' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sourceful-blue to-sourceful-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Sourceful</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-sourceful-blue font-medium">
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-4">
                {products.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Use Cases Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-sourceful-blue font-medium">
                <span>Use Cases</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                {useCases.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-sourceful-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/pricing" className="text-gray-700 hover:text-sourceful-blue font-medium">
              Pricing
            </Link>

            {/* Developers Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-sourceful-blue font-medium">
                <span>Developers</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                {developers.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-sourceful-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" className="text-gray-700 hover:text-sourceful-blue font-medium">
              Company
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact"
              className="px-5 py-2.5 text-gray-700 hover:text-sourceful-blue font-medium transition-colors"
            >
              Contact Sales
            </Link>
            <Link
              href="/developers/quickstart"
              className="px-5 py-2.5 bg-gradient-to-r from-sourceful-blue to-sourceful-purple text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Start Building
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-6 space-y-4">
            <div>
              <div className="font-semibold text-gray-900 mb-2">Products</div>
              {products.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-2">Use Cases</div>
              {useCases.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-2">Developers</div>
              {developers.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link href="/pricing" className="block py-2 font-medium text-gray-900">
              Pricing
            </Link>
            <Link href="/about" className="block py-2 font-medium text-gray-900">
              Company
            </Link>
            <div className="pt-4 space-y-3">
              <Link
                href="/contact"
                className="block w-full text-center px-5 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
              >
                Contact Sales
              </Link>
              <Link
                href="/developers/quickstart"
                className="block w-full text-center px-5 py-3 bg-gradient-to-r from-sourceful-blue to-sourceful-purple text-white rounded-lg font-medium"
              >
                Start Building
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
