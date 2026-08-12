import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'

const STORAGE_KEY = 'lang'
const savedLocale = localStorage.getItem(STORAGE_KEY)
const locale = savedLocale === 'ar' || savedLocale === 'en' ? savedLocale : 'en'

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages: { en, ar },
})

export default i18n
