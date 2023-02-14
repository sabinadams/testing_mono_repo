import { test as base } from '@playwright/test'
import { HomePage } from '@pages/home.page'
import { LoginPage } from '@pages/login.page'
import prisma from '@helpers/prisma'
import { faker } from '@faker-js/faker'

type UserDetails = {
  username: string
  password: string
}

type QuoteDetails = {
  body: string
  tags: string
}

type QuoteFixtures = {
  getQuote: (includeQuote: boolean, includeTags: boolean) => QuoteDetails
  user_credentials: UserDetails
  account: UserDetails
  homePage: HomePage
}

export const test = base.extend<QuoteFixtures>({
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
    await page.waitForURL('http://localhost:5173/')
    await page.close()

    await use(user_credentials)
  },
  getQuote: async ({}, use) => {
    const testBody = faker.lorem.sentence()
    const testTag = faker.word.adverb()

    await use((includeQuote: boolean, includeTags: boolean) => ({
      body: includeQuote ? testBody : '',
      tags: includeTags ? testTag : ''
    }))

    await prisma.quote.deleteMany({
      where: { text: testBody }
    })
    await prisma.tag.deleteMany({
      where: { name: testTag }
    })
  },
  homePage: async ({ page, account }, use) => {
    const homePage = new HomePage(page)
    await homePage.goto(account)
    await use(homePage)
  }
})

export { expect } from '@playwright/test'
