import { test, expect } from '@fixtures/quotes.fixture'

// // Make sure adding a quote results in a quote on the page
test('should allow you to add a quote to the page', async ({
  homePage,
  getQuote,
  page
}) => {
  const quote = getQuote(true, true)
  await homePage.populateForm(quote.body, quote.tags)
  await page.click('#save-quote')

  await expect(page.getByText(quote.body)).toBeVisible()
  await expect(page.getByText(quote.tags)).toBeVisible()
})
// // Make sure deleting a quote removes quotes from the page

// // Adding tags should show up on the quotes
