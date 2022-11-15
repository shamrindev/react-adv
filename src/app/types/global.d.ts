declare module '*.scss';

declare module '*.svg' {
  import { FC, SVGAttributes } from 'react';

  const content: FC<SVGAttributes<SVGElement>>;
  export default content;
}

declare const __IS_DEV__: boolean;
