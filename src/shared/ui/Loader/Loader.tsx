import { FC } from 'react';
import classNames from 'classnames';
import cls from './Loader.module.scss';

interface LoaderProps {
  className?: string,
  size?: 's' | 'm' | 'l'
}

export const Loader: FC<LoaderProps> = ({ className, size = 'm' }) => (
  <span className={classNames(cls.loader, className, cls[size])} />
);
