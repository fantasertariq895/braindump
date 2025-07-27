"use client"

import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 p-6">
      {children}
    </div>
  )
}