// app/repositories/AuthRepository.ts
import type { User, LoginCredentials } from '~~/types'

export default class AuthRepository {
  private fetch: ReturnType<typeof $fetch.create>

  constructor(fetch: ReturnType<typeof $fetch.create>) {
    this.fetch = fetch
  }

  async login(credentials: LoginCredentials) {
    return await this.fetch<User>('/auth/login', {
      method: 'POST',
      body: credentials,
    })
  }
}
