import { FC, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string,
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className={classNames(cls.navbar, className)}>
      <Button onClick={() => setIsOpen(true)} variant="ghost">{t('Войти')}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>{t('Войти')}</Modal>
    </nav>
  );
};
