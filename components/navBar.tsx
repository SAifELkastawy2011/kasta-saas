'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const pathname = usePathname()
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/skills', label: 'Skills' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav aria-label="Main navigation" className="bg-gray-900 shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          Kasta
        </Link>

        <ul className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    transition-colors
                    ${isActive 
                      ? 'text-primary font-semibold' 
                      : 'text-gray-600 hover:text-primary'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar