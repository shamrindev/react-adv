import { useTheme } from '@/app/providers/ThemeProvider'
import { getUserInited, userActions } from '@/entities/User'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { AppRouter } from './providers/router'

export const App = () => {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const inited = useSelector(getUserInited)
  // mobile sidebar (off-canvas) open state, lifted here so the Navbar burger
  // and the Sidebar drawer share it
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const openSidebar = useCallback(() => setIsSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])
  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app_redesigned', {}, [theme])}>
      <Suspense fallback="">
        <Navbar onOpenSidebar={openSidebar} />
        <div className="content-page">
          <Sidebar isMobileOpen={isSidebarOpen} onClose={closeSidebar} />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}
