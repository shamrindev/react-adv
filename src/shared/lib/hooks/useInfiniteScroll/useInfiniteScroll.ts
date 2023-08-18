import { MutableRefObject, useEffect } from 'react'

export interface UseInfiniteScrollOptions {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
}

export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    if (callback) {
      const options = {
        root: wrapperRef.current,
        rootMargin: '10px',
        threshold: 0.5,
      }

      observer = new IntersectionObserver(([entry]) => {
        // fire the callback once, only when the sentinel enters the viewport
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      observer.observe(triggerRef.current)
    }

    return () => {
      if (observer && triggerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerRef.current)
      }
    }
  }, [triggerRef, wrapperRef, callback])
}
