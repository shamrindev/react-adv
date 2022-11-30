import { FC, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { IconClose } from '@/shared/assets/icons';
import { Portal } from '../Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string,
  isOpen: boolean,
  onClose: () => void,
  container?: HTMLElement,
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    container,
  } = props;

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return (
    <Portal container={container}>
      <div
        className={classNames(cls.Modal, className, { [cls.opened]: isOpen })}
        data-testid="modal"
      >
        <div className={cls.overlay} onClick={onClose} data-testid="overlay" />
        <div className={cls.content} data-testid="content">
          <IconClose className={cls.close} onClick={onClose} />
          {children}
        </div>
      </div>
    </Portal>
  );
};
