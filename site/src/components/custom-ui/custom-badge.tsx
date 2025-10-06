import React from 'react'

interface CustomBadgeProps {
  children: React.ReactNode
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  className?: string
  title?: string
}

export function CustomBadge({ 
  children, 
  backgroundColor, 
  textColor = '#FFFFFF', 
  borderColor, 
  className = '', 
  title 
}: CustomBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-xs transition-all duration-200 hover:opacity-90 hover:scale-105 ${className}`}
      style={{
        backgroundColor: backgroundColor || '#6B7280', // Gris par défaut
        color: textColor,
        borderColor: borderColor || backgroundColor || '#6B7280',
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
      title={title}
    >
      {children}
    </span>
  )
}
