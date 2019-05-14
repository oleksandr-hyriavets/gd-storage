import { axiosInstance } from './axiosInstance'

const FoldersService = {
  async getFolders(): Promise<any> {
    const { data: response } = await axiosInstance.get('/folders')

    return response
  },
}

export { FoldersService }
