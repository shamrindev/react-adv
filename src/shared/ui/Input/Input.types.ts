import { InputHTMLAttributes } from 'react'

type HtmlInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>

export interface InputProps extends HtmlInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  type?: string
  placeholder?: string
  autoFocus?: boolean
  readonly?: boolean
}
