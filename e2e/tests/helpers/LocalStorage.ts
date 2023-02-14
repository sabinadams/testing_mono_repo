import type { BrowserContext } from '@playwright/test'

export class LocalStorage {
  private context: BrowserContext

  constructor(context: BrowserContext) {
    this.context = context
  }

  get localStorage() {
    return this.context.storageState().then(storage => {
      const origin = storage.origins.find(
        ({ origin }) => origin === 'http://localhost:5173'
      )
      if (origin) {
        return origin.localStorage.reduce(
          (acc, curr) => ({ ...acc, [curr.name]: curr.value }),
          {}
        )
      }
      return {}
    })
  }
}
