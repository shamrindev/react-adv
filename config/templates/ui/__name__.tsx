import { FC } from 'react';
import classNames from 'classnames';
import cls from './__name__.module.scss';

interface __name__Props {
  className?: string,
}

export const __name__: FC<__name__Props> = ({ className }) => {

  return (
    <div className={classNames(className)}>
    </div>
  );
};
