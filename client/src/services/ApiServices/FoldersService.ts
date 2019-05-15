import { axiosInstance } from './axiosInstance'

const FoldersService = {
  async getFolders(): Promise<any> {
    const { data: response } = await axiosInstance.get('/folders')

    return response
  },

  async editFolder(payload: any): Promise<any> {
    await axiosInstance.put('/folders', payload)
  },

  async createFolder(payload: any): Promise<any> {
    await axiosInstance.post('/folders', payload)
  },
}

export { FoldersService }
