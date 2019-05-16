import { axiosInstance } from './axiosInstance'

const FilesService = {
  async uploadFile(file: any): Promise<any> {
    const { data: response } = await axiosInstance.post('/files/upload', file)

    return response
  },

  async downloadFile(fileId: string): Promise<any> {
    const { data: response } = await axiosInstance.get('/files/download', {
      params: { id: fileId },
    })

    return response
  },
}

export { FilesService }
