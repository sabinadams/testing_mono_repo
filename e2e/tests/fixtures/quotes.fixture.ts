import { test as base } from '@playwright/test'
import { HomePage } from '@pages/home.page'
import { LoginPage } from '@pages/login.page'
import prisma from '@helpers/prisma'
import { Prisma } from '@helpers/prisma'
import { faker } from '@faker-js/faker'

type UserDetails = {
  username: string
  password: string
}

type QuoteDetails = {
  body: string
  tags: string
}

const quoteWithArgs = Prisma.validator<Prisma.QuoteArgs>()({
  include: { tags: true }
})

type QuoteFixtures = {
  getQuoteDetails: (includeQuote: boolean, includeTags: boolean) => QuoteDetails
  quote: Prisma.QuoteGetPayload<typeof quoteWithArgs>
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
  getQuoteDetails: async ({}, use) => {
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
  quote: async ({ homePage, page, getQuoteDetails }, use) => {
    const details = getQuoteDetails(true, true)
    await homePage.populateForm(details.body, details.tags)
    await page.click('#save-quote')
    await page.waitForLoadState('networkidle')

    const quote = await prisma.quote.findFirst({
      include: { tags: true },
      where: { text: details.body }
    })

    await use(quote)
  },
  homePage: async ({ page, account }, use) => {
    const homePage = new HomePage(page)
    await homePage.goto(account)
    await use(homePage)
  }
})

export { expect } from '@playwright/test'
