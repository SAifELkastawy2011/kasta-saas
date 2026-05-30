// components/layout/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  FiHome, 
  FiGrid, 
  FiDollarSign, 
  FiUser, 
  FiSettings,
  FiLogOut,
  FiBell,
  FiStar
} from 'react-icons/fi'
import { Avatar } from '@/components/ui/Avatar'
import IconBtn from '@/components/ui/IconBtn'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/', label: 'Home', icon: FiHome },
  { href: '/templates', label: 'Templates', icon: FiGrid },
  { href: '/pricing', label: 'Pricing', icon: FiDollarSign },
  { href: '/profile', label: 'Profile', icon: FiUser },
  { href: '/settings', label: 'Settings', icon: FiSettings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Debug: Log when sidebar renders
  useEffect(() => {
    console.log('📍 Sidebar rendered, current path:', pathname)
    console.log('📍 FiBell type:', typeof FiBell, FiBell)
    console.log('📍 FiStar type:', typeof FiStar, FiStar)
  }, [pathname])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Add your logout logic here
      // await signOut()
      console.log('Logging out...')
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleNotification = () => {
    console.log('Notifications clicked')
    // Add notification logic
  }

  const handleUpgrade = () => {
    console.log('Upgrade clicked')
    router.push('/pricing')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-primary-800 to-primary-900 border-r border-primary-700/50 flex flex-col shadow-2xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-primary-700/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow-sm">
            <span className="text-primary-900 font-bold text-sm">K</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            Kasta
          </h1>
        </div>
        <p className="text-xs text-text/40 mt-2">Premium SaaS Platform</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-3">
        <ul className="space-y-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    group relative flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'text-secondary bg-primary-700/80 shadow-lg shadow-secondary/5' 
                      : 'text-text/60 hover:text-secondary hover:bg-primary-700/40'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-secondary rounded-r-full shadow-glow-sm" />
                  )}
                  
                  <Icon 
                    className={`h-5 w-5 transition-all duration-200 ${isActive ? 'text-secondary' : 'text-text/50 group-hover:text-secondary'}`} 
                  />
                  <span className={`font-medium ${isActive ? 'text-secondary' : 'group-hover:text-text'}`}>
                    {link.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Action Buttons Section using IconBtn */}
      <div className="px-3 py-2 space-y-2">
        {/* Debug: Log before rendering IconBtn */}
        {console.log('🎯 Rendering Notifications IconBtn with:', { icon: FiBell, text: 'Notifications' })}
        
        <IconBtn
          icon={FiBell}
          text="Notifications"
          variant="ghost"
          size="md"
          rounded="lg"
          fullWidth
          onClick={handleNotification}
          className="justify-start px-3"
          style={{ justifyContent: 'flex-start' }}
        />
        
        {console.log('🎯 Rendering Upgrade IconBtn with:', { icon: FiStar, text: 'Upgrade to Pro' })}
        
        <IconBtn
          icon={FiStar}
          text="Upgrade to Pro"
          variant="gradient"
          size="md"
          rounded="lg"
          fullWidth
          onClick={handleUpgrade}
          className="justify-start px-3 shadow-glow-sm"
          style={{ justifyContent: 'flex-start' }}
        />
      </div>

      {/* User Section using IconBtn for logout */}
      <div className="p-4 border-t border-primary-700/50">
        <div className="group relative">
          <div className="absolute inset-0 rounded-xl bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="relative flex items-center gap-3 p-3 rounded-xl bg-primary-800/50 backdrop-blur-sm border border-primary-700/30 hover:border-primary-700/60 transition-all">
            <Avatar name="Saif Elkastawy" size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text group-hover:text-secondary transition-colors truncate">
                Saif Elkastawy
              </p>
              <p className="text-xs text-text/40 truncate">saif@kasta.com</p>
            </div>
            {console.log('🎯 Rendering Logout IconBtn with:', { icon: FiLogOut })}
            <IconBtn
              icon={FiLogOut}
              variant="solid"
              bgColor="transparent"
              size="sm"
              rounded="full"
              color="white"
              onClick={handleLogout}
              loading={isLoggingOut}
              className="!text-text/40 hover:!text-red-500"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}