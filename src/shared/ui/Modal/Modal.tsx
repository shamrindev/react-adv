import { useTheme } from '@/app/providers/ThemeProvider'
import { ReactNode, useEffect, useRef } from 'react'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Portal } from '@/shared/ui/Portal'
import { Overlay } from '../Overlay/Overlay'
import cls from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_DELAY = 200

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export const Modal = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}: ModalProps) => {
  const { theme } = useTheme()
  const contentRef = useRef<HTMLDivElement>(null)
  const lastActiveRef = useRef<HTMLElement | null>(null)

  const { close, isMounted, isClosing } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  })

  // focus management: move focus into the dialog on open and restore it to the
  // previously-focused trigger on close (Escape handling lives in useModal)
  useEffect(() => {
    if (!isOpen) {
      return
    }
    lastActiveRef.current = document.activeElement as HTMLElement | null
    contentRef.current?.focus()
    return () => {
      lastActiveRef.current?.focus?.()
    }
  }, [isOpen])

  // trap Tab within the dialog so focus can't escape to the page behind it
  const onContentKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') {
      return
    }
    const focusables =
      contentRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    if (!focusables || focusables.length === 0) {
      e.preventDefault()
      contentRef.current?.focus()
      return
    }
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  }

  if (lazy && !isMounted) {
    return null
  }
  return (
    <Portal>
      <div
        className={classNames(cls.modal, mods, [
          className,
          theme,
          'app_modal',
          'app_redesigned',
        ])}
      >
        <Overlay onClick={close}>
          <div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onKeyDown={onContentKeyDown}
            onClick={(e) => e.stopPropagation()}
            className={cls.content}
          >
            {children}
          </div>
        </Overlay>
      </div>
    </Portal>
  )
}
