// components/ui/Avatar.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

interface AvatarProps {
  src?: string | null
  name?: string | null
  size?: 'sm' | 'md' | 'lg'
  fallback?: string
  href?: string              // ← NEW: Optional link URL
  onClick?: () => void       // ← NEW: Optional click handler
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

export function Avatar({ 
  src, 
  name, 
  size = 'md', 
  fallback, 
  href = '/profile',  // Default redirect to profile page
  onClick 
}: AvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : fallback || 'U'

  const avatarContent = src ? (
    <Image
      src={src}
      alt={name || 'User avatar'}
      width={40}
      height={40}
      className={`${sizes[size]} rounded-full object-cover ring-2 ring-secondary/30 hover:ring-secondary/50 transition-all cursor-pointer`}
    />
  ) : (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br from-secondary to-accent-500 flex items-center justify-center text-primary-900 font-semibold shadow-md hover:shadow-glow-sm transition-all cursor-pointer`}
    >
      {initials}
    </div>
  )

  // If href is provided, wrap in Link
  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        {avatarContent}
      </Link>
    )
  }

  // Otherwise return just the avatar (no link)
  return avatarContent
}