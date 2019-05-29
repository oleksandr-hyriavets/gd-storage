import { axiosInstance } from './axiosInstance'

const FoldersService = {
  async getFolders(): Promise<any> {
    const { data: response } = await axiosInstance.get('/folders')

    return response
  },

  async getChildFolders(id: string): Promise<any> {
    const { data: response } = await axiosInstance.get('/folders', {
      params: { id },
    })

    return response
  },

  async getFolderById(id: string): Promise<any> {
    const { data: response } = await axiosInstance.get('/folders/folder', {
      params: { id },
    })

    return response
  },

  async editFolder(payload: any): Promise<any> {
    await axiosInstance.put('/folders', payload)
  },

  async createFolder(payload: any): Promise<any> {
    await axiosInstance.post('/folders', payload)
  },

  async removeFolder(folderId: string): Promise<any> {
    await axiosInstance.post('/folders/remove', folderId)
  },

  async getFolderTree(): Promise<any> {
    const { data: response } = await axiosInstance.get('/folders/tree')

    return response
  },
}

export { FoldersService }
