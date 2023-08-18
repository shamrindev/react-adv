import { useCallback, useState } from 'react'

/**
 * Shared open/close state for the LoginModal so every guest sign-in prompt
 * (navbar, article comments, …) reuses the same logic instead of re-declaring
 * the useState + two callbacks each time.
 */
export function useLoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  return { isOpen, open, close }
}
