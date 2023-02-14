import { test as base } from '@playwright/test'
import { LoginPage } from '@pages/login.page'
import { LocalStorage } from '@helpers/LocalStorage'

import prisma from '@helpers/prisma'
import { createUser } from '@helpers/auth'

type UserDetails = {
  username: string
  password: string
}

type AuthWorkerFixtures = {
  validUser: UserDetails
  user_credentials: UserDetails
}

type AuthFixtures = {
  loginPage: LoginPage
  storage: LocalStorage
}

export const test = base.extend<AuthFixtures, AuthWorkerFixtures>({
  user_credentials: [
    async ({}, use, workerInfo) => {
      const username = `user-${workerInfo.workerIndex}`
      const password = 'password'

      await use({
        username,
        password
      })

      await prisma.user.deleteMany({ where: { username } })
    },
    { scope: 'worker' }
  ],
  validUser: [
    async ({ user_credentials }, use) => {
      const user = await createUser(
        user_credentials.username,
        user_credentials.password
      )
      await use({
        username: user.username,
        password: user_credentials.password
      })
    },
    { scope: 'worker' }
  ],
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await use(loginPage)
  },
  storage: async ({ page }, use) => {
    const storage = new LocalStorage(page.context())
    await use(storage)
  }
})

export { expect } from '@playwright/test'
