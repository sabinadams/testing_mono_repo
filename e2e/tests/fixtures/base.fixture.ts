import { test as base } from '@playwright/test'
import { faker } from '@faker-js/faker'
import prisma from '@helpers/prisma'
import { LoginPage } from '@pages/login.page'

type UserDetails = {
  username: string
  password: string
}

type BaseFixtures = {
  user_credentials: UserDetails
  account: UserDetails
}

export const testBase = base.extend<BaseFixtures>({
  user_credentials: async ({}, use) => {
    const username = faker.internet.userName()
    const password = faker.internet.password()

    await use({
      username,
      password
    })

    await prisma.user.deleteMany({ where: { username } })
  },
  account: async ({ browser, user_credentials }, use) => {
    const page = await browser.newPage()
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.populateForm(
      user_credentials.username,
      user_credentials.password
    )

    await page.click('#signup')
    await page.waitForLoadState('networkidle')
    await page.close()

    await use(user_credentials)
  }
})
