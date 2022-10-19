import React, { FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui";
import cls from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  className?: string,
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  }

  return (
    <Button className={classNames(className)} onClick={changeLanguage}>
      {t('Язык')}
    </Button>
  );
};

export default LanguageSwitcher;
