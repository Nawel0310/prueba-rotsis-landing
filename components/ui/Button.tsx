'use client'

import { forwardRef } from 'react'

// Factory Method: single interface creates different button implementations at render time via theme prop.
type ButtonTheme = 'dark' | 'light'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // dark → white fill sweep (text → black on hover); light → black fill sweep (text → white on hover).
  theme?: ButtonTheme
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ theme = 'dark', className, children, ...props }, ref) => {
    const fillColor = theme === 'dark' ? 'bg-white' : 'bg-black'
    const textHover = theme === 'dark' ? 'group-hover:text-black' : 'group-hover:text-white'

    return (
      <button
        ref={ref}
        className={`group relative overflow-hidden cursor-pointer ${className ?? ''}`}
        {...props}
      >
        <span
          className={`absolute inset-0 ${fillColor} origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]`}
        />
        <span className={`relative z-10 ${textHover} transition-colors duration-500`}>
          {children}
        </span>
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button }
