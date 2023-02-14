import type { Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('http://localhost:5173/login')
    await this.page.waitForURL('http://localhost:5173/login')
  }

  async populateForm(username: string, password: string) {
    await this.page.fill('#username', username)
    await this.page.fill('#password', password)
  }
}
