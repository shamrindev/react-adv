import { StateSchema } from '@/app/providers/StoreProvider'
import { JsonSettings } from '../../types/jsonSettings'

const defaultJsonSettings: JsonSettings = {}

export const getJsonSettings = (state: StateSchema): JsonSettings =>
  state.user?.authData?.jsonSettings ?? defaultJsonSettings

export const getJsonSettingsByKey =
  (key: keyof JsonSettings) => (state: StateSchema) =>
    getJsonSettings(state)[key]
