import {
  ImgHTMLAttributes,
  ReactElement,
  useLayoutEffect,
  useState,
} from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  fallback?: ReactElement
  errorFallback?: ReactElement
}

export const AppImage = ({
  className,
  src,
  alt = 'image',
  errorFallback,
  fallback,
  ...rest
}: AppImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useLayoutEffect(() => {
    setIsLoading(true)
    setHasError(false)
    const img = new Image()
    img.src = src ?? ''
    img.onload = () => {
      // Some dead hotlinks resolve (HTTP 200) to a 1x1 tracking/placeholder
      // pixel that "loads" successfully but renders as a blank box. Treat such
      // degenerate images as missing so the errorFallback is shown instead.
      if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
        setHasError(true)
      }
      setIsLoading(false)
    }
    img.onerror = () => {
      // Previously isLoading stayed true here, so the loading fallback was shown
      // forever and the errorFallback never rendered. Resolve loading on error.
      setHasError(true)
      setIsLoading(false)
    }
  }, [src])

  if (isLoading && fallback) {
    return fallback
  }
  if (hasError && errorFallback) {
    return errorFallback
  }
  return <img className={className} src={src} alt={alt} {...rest} />
}
