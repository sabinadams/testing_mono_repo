import { test, expect } from '@fixtures/quotes.fixture'

test('should allow you to add a quote to the page', async ({
  homePage,
  getQuoteDetails,
  page
}) => {
  const quote = getQuoteDetails(true, true)
  await homePage.populateForm(quote.body, quote.tags)
  await page.click('#save-quote')

  await expect(page.getByText(quote.body)).toBeVisible()
  await expect(page.getByText(quote.tags)).toBeVisible()
})

test('should allow you to delete a quote', async ({
  homePage,
  quote,
  page
}) => {
  homePage.page.on('dialog', dialog => dialog.accept())

  await homePage.page.click(`#delete-${quote.id}`)
  await homePage.page.waitForLoadState('networkidle')
  await expect(page.getByText(quote.text)).not.toBeVisible()
})
