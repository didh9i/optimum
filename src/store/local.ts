import { defineStore } from 'pinia'
import Localization from '@/locals/localization'

type Languages = 'ru_ru' | 'en_us'

interface State {
  language: Languages | null
  localization: Localization | null
}

type AsyncLocalization = Promise<{ default: Localization }>

const localizations = {
  en_us: (): AsyncLocalization => import('@/locals/en_us.json'),
  ru_ru: (): AsyncLocalization => import('@/locals/ru_ru.json')
}

const useLocal = defineStore('local', {
  state: (): State => ({
    language: null,
    localization: null
  }),
  actions: {
    init () {
      this.language = 'ru_ru'
    },
    select (language: Languages) {
      localizations[language]().then((module) => {
        this.language = language
        this.localization = module.default
      })
    }
  }
})

export default useLocal
