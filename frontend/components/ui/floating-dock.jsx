"use client"
import React from 'react'

export function FloatingDock({ children }) {
  return (
    <div aria-hidden="true" className="fixed right-6 bottom-6 z-50">
      <div className="bg-white/80 backdrop-blur rounded-full p-2 shadow-lg">{children}</div>
    </div>
  )
}

export default FloatingDock
