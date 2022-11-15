import React, { FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';

interface LanguageSwitcherProps {
  className?: string,
  short?: boolean
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className, short }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  return (
    <Button
      className={classNames(className)}
      variant="clear"
      onClick={changeLanguage}
    >
      {short ? t('Язык короткий') : t('Язык')}
    </Button>
  );
};
