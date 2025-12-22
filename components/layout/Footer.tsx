import Link from 'next/link'
import { Github, Twitter, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-sourceful-blue to-sourceful-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-white">Sourceful</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Hardware-first energy coordination platform. Secure, resilient, and built for the distributed energy future.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/srcfl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/srcful" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/sourceful" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@srcful-official" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/platform" className="hover:text-white transition-colors">Platform Overview</Link></li>
              <li><Link href="/connect" className="hover:text-white transition-colors">Connect</Link></li>
              <li><Link href="/optimize" className="hover:text-white transition-colors">Optimize</Link></li>
              <li><Link href="/flex" className="hover:text-white transition-colors">Flex</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-white font-semibold mb-4">Developers</h3>
            <ul className="space-y-3">
              <li><Link href="/developers/api-reference" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="/developers/quickstart" className="hover:text-white transition-colors">Quickstart</Link></li>
              <li><Link href="/developers/authentication" className="hover:text-white transition-colors">Authentication</Link></li>
              <li><Link href="/developers/device-integration" className="hover:text-white transition-colors">Device Integration</Link></li>
              <li><a href="https://docs.sourceful.energy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Sales</Link></li>
              <li><a href="https://support.sourceful.energy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="https://explorer.sourceful.energy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Explorer</a></li>
              <li><a href="https://discord.gg/srcful" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Sourceful Labs. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/security" className="text-gray-500 hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
