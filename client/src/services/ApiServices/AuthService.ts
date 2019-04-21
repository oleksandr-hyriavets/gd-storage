import { axiosInstance } from './axiosInstance'

const AuthService = {
  async register(userData: any) {
    await axiosInstance.post('users/register', userData)
  },

  async login(credentials: any): Promise<string> {
    const { data: userId } = await axiosInstance.post(
      'users/login',
      credentials,
    )

    return userId
  },

  async fetchUser(userId: string): Promise<any> {
    const { data: user } = await axiosInstance.get('users/profile', {
      params: { userId },
    })

    return user
  },
}

export { AuthService }
