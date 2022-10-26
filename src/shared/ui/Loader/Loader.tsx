import { FC } from 'react';
import classNames from 'classnames';
import cls from './Loader.module.scss';

interface LoaderProps {
  className?: string,
}

const Loader: FC<LoaderProps> = ({ className }) => (
  <span className={classNames(cls.loader, className)} />
);

export default Loader;
