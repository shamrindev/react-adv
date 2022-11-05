import { FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';

import cls from './PageError.module.scss';

export const PageError: FC = () => {
  const { t } = useTranslation();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(cls.pageError)}>
      <h2>{t('Произошла непредвиденная ошибка')}</h2>
      <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
    </div>
  );
};
