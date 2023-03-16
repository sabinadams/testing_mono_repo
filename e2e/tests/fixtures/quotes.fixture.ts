import { testBase } from './base.fixture'
import { HomePage } from '@pages/home.page'
import prisma from '@helpers/prisma'
import { Prisma } from '@helpers/prisma'
import { faker } from '@faker-js/faker'

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
  homePage: HomePage
}

export const test = testBase.extend<QuoteFixtures>({
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
    const responsePromise = page.waitForResponse(
      resp => resp.url().includes('/quotes') && resp.status() === 200
    )
    await homePage.populateForm(details.body, details.tags)
    await page.click('#save-quote')
    await responsePromise

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
