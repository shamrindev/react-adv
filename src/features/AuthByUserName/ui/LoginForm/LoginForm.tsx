import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Text, TextTheme } from '@/shared/ui/Text'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import cls from './LoginForm.module.scss'

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { username, password, isLoading, error } = useSelector(getLoginState)

  const onChangeUserName = useCallback(
    (value: string) => {
      dispatch(loginActions.setUserName(value))
    },
    [dispatch]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch]
  )

  const onLoginClick = useCallback(async () => {
    // ignore empty submits (incl. Enter key) — the button is also disabled,
    // but this keeps the keyboard path from firing a doomed request
    if (!username || !password) {
      return
    }
    const res = dispatch(loginByUserName({ username, password }))
    if ((await res).meta.requestStatus === 'fulfilled') {
      // close the modal but stay on the current page (Reddit-style) — logging in
      // from an article's comments shouldn't bounce the reader back to home.
      onSuccess()
    }
  }, [dispatch, username, password, onSuccess])

  const onEnterPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onLoginClick()
    }
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.loginform, {}, [className])}>
        <Text title={t('Форма авторизации')} />
        {error && (
          <Text
            text={t('Вы ввели неправильный логин или пароль')}
            theme={TextTheme.ERROR}
          />
        )}
        <Input
          type="text"
          className={cls.input}
          placeholder={t('Введите имя')}
          aria-label={t('Введите имя')}
          autoFocus
          onChange={onChangeUserName}
          value={username}
          onKeyDown={onEnterPressHandler}
        />
        <Input
          type="password"
          className={cls.input}
          placeholder={t('Введите пароль')}
          aria-label={t('Введите пароль')}
          onChange={onChangePassword}
          value={password}
          onKeyDown={onEnterPressHandler}
        />
        <Button
          theme={ButtonTheme.BACKGROUND_INVERTED}
          className={cls.loginBtn}
          onClick={onLoginClick}
          disabled={isLoading || !username || !password}
          fullWidth
        >
          {t('Войти')}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
})
export default LoginForm
