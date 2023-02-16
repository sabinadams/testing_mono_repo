import type { Page } from '@playwright/test'
import { LoginPage } from './login.page'

export class HomePage {
  readonly page: Page
  readonly loginPage: LoginPage
  constructor(page: Page) {
    this.page = page
    this.loginPage = new LoginPage(page)
  }

  async goto(user: { username: string; password: string }) {
    await this.loginPage.goto()
    await this.loginPage.populateForm(user.username, user.password)
    await this.page.click('#login')
    await this.page.waitForLoadState('networkidle')
  }

  async populateForm(body: string, tags: string) {
    await this.page.locator('#body').type(body)
    await this.page.fill('#tags', tags)
  }
}
