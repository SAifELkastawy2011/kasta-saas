// app/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home | Kasta SaaS',
  description: 'Welcome to Kasta - Premium SaaS Platform',
}

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-secondary">Kasta</span>
        </h1>
        <p className="text-text/70 text-lg max-w-2xl mx-auto">
          Build premium scroll-driven websites with Next.js 16, GSAP, and Framer Motion
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/templates"
            className="px-6 py-3 bg-secondary text-primary-900 font-semibold rounded-lg hover:bg-accent-600 transition-colors shadow-glow"
          >
            Explore Templates
          </Link>
          <Link
            href="/pricing"
            className="px-6 py-3 border border-primary-600 text-text rounded-lg hover:bg-primary-700 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-primary-700/30 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <div className="w-6 h-6 rounded-full bg-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-secondary mb-2">Premium Quality</h3>
          <p className="text-text/60">High-quality components built with best practices</p>
        </div>

        <div className="bg-primary-700/30 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <div className="w-6 h-6 rounded-full bg-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-secondary mb-2">Scroll Animations</h3>
          <p className="text-text/60">GSAP + Framer Motion for stunning effects</p>
        </div>

        <div className="bg-primary-700/30 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <div className="w-6 h-6 rounded-full bg-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-secondary mb-2">TypeScript Ready</h3>
          <p className="text-text/60">Full type safety for better development</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-8">
        <div>
          <div className="text-3xl font-bold text-secondary">50+</div>
          <div className="text-text/50 text-sm">Components</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-secondary">10+</div>
          <div className="text-text/50 text-sm">Templates</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-secondary">100%</div>
          <div className="text-text/50 text-sm">TypeScript</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-secondary">24/7</div>
          <div className="text-text/50 text-sm">Support</div>
        </div>
      </div>
    </div>
  )
}