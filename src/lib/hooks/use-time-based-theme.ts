'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * Custom hook to handle time-based theme detection
 * This will override the system theme with a time-based theme
 * Dark mode: 6 PM - 6 AM
 * Light mode: 6 AM - 6 PM
 */
export function useTimeBasedTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [timeBasedTheme, setTimeBasedTheme] = useState<'light' | 'dark' | null>(null)

  // Function to determine if it's dark time of day
  const isDarkTimeOfDay = () => {
    const hour = new Date().getHours()
    // Consider it dark from 6 PM to 6 AM
    return hour < 6 || hour >= 18
  }

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update time-based theme when mounted or theme changes
  useEffect(() => {
    if (!mounted) return

    // Only apply time-based theme if system theme is selected
    if (theme === 'system') {
      const isDark = isDarkTimeOfDay()
      setTimeBasedTheme(isDark ? 'dark' : 'light')
    } else {
      setTimeBasedTheme(null)
    }
  }, [mounted, theme])

  // Apply the time-based theme to the DOM
  useEffect(() => {
    if (!mounted || !timeBasedTheme) return

    if (timeBasedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mounted, timeBasedTheme])

  // Create a custom setTheme function
  const customSetTheme = (newTheme: string) => {
    setTheme(newTheme)
  }

  // Return the effective theme (time-based if system is selected)
  const effectiveTheme = theme === 'system' && timeBasedTheme ? timeBasedTheme : theme

  return {
    theme: effectiveTheme,
    setTheme: customSetTheme,
    resolvedTheme: effectiveTheme,
  }
}
