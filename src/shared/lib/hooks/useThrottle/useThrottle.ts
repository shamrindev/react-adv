import { useCallback, useEffect, useRef } from 'react'

export function useThrottle<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
) {
  // refs (not state) — a throttle gate is internal bookkeeping, it should never
  // trigger a re-render of the component that owns the throttled handler
  const throttleRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    },
    []
  )

  return useCallback(
    (...args: Args) => {
      if (!throttleRef.current) {
        callback(...args)
        throttleRef.current = true
        timerRef.current = setTimeout(() => {
          throttleRef.current = false
        }, delay)
      }
    },
    [callback, delay]
  )
}
