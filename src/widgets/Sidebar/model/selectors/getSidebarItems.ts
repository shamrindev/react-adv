import MainIcon from '@/shared/assets/icons/main-20-20.svg'
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg'
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg'
import SettingsIcon from '@/shared/assets/icons/about-20-20.svg'
import HomeIconRedesigned from '@/shared/assets/icons/home.svg'
import SettingsIconRedesigned from '@/shared/assets/icons/settings.svg'
import UserIconRedesigned from '@/shared/assets/icons/user.svg'
import FeedIconRedesigned from '@/shared/assets/icons/feed.svg'

import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '../../../../entities/User'
import { SidebarItemType } from '../types/sidebar'
import {
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/const/router'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: MainIcon,
      IconRedesigned: HomeIconRedesigned,
      text: 'Главная',
    },
    {
      path: getRouteSettings(),
      Icon: SettingsIcon,
      IconRedesigned: SettingsIconRedesigned,
      text: 'Настройки',
    },
  ]
  if (userData) {
    sidebarItemList.push(
      {
        path: getRouteProfile(userData?.id),
        Icon: ProfileIcon,
        IconRedesigned: UserIconRedesigned,
        text: 'Профиль',
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: ArticleIcon,
        IconRedesigned: FeedIconRedesigned,
        text: 'Статьи',
        authOnly: true,
      }
    )
  }
  return sidebarItemList
})
