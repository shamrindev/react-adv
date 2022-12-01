declare module '*.scss';

declare module '*.svg' {
  import { FC, SVGAttributes } from 'react';

  const content: FC<SVGAttributes<SVGElement>>;
  export default content;
}

declare const __IS_DEV__: boolean;

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>
} : T;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
