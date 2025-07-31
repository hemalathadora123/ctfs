'use client'
import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold gradient-text">CTF Adventures</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
            <Link href="/writeups" className="nav-link">
              Write-ups
            </Link>
            <Link href="/profile" className="nav-link">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 