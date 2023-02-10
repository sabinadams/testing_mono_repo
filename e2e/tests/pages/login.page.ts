import type { Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('http://localhost:5173/login')
  }

  async login(username: string, password: string) {
    await this.page.fill('#username', username)
    await this.page.fill('#password', password)
    await this.page.click('#login')
  }

  async signup(username: string, password: string) {
    await this.page.fill('#username', username)
    await this.page.fill('#password', password)
    await this.page.click('#signup')
  }
}
