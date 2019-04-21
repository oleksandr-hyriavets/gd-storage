const TokenService = {
  setUserId(userId: string): void {
    localStorage.setItem('userId', userId)
  },

  removeUserId(): void {
    localStorage.removeItem('userId')
  },

  getUserId(): string | null {
    return localStorage.getItem('userId')
  },
}

export { TokenService }
