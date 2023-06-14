import {
  ChangeEvent,
  FC,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { InputProps } from '../Input.types'
import cls from './Input.module.scss'

export const Input: FC<InputProps> = memo(
  ({
    className,
    value = '',
    onChange,
    type = 'text',
    placeholder,
    autoFocus,
    readonly,
    ...otherProps
  }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    const onBlur = () => {
      setIsFocused(false)
    }

    const onFocus = () => {
      setIsFocused(true)
    }

    useEffect(() => {
      if (autoFocus) {
        setIsFocused(true)
        ref.current?.focus()
      }
    }, [autoFocus])

    const mods: Mods = {
      [cls.readonly]: readonly,
      [cls.focused]: isFocused && !readonly,
    }

    return (
      <div className={classNames(cls.inputWrapper, mods, [className])}>
        <input
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
          readOnly={readonly}
          placeholder={placeholder}
          {...otherProps}
        />
      </div>
    )
  }
)
