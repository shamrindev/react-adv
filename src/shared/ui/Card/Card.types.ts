import { HTMLAttributes, ReactNode } from 'react'

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
}
