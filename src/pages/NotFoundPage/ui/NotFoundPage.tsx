import { FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface NotFoundPageProps {
  className?: string,
}

const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(className)}>
      {t('Страница не найдена')}
    </div>
  );
};

export default NotFoundPage;
