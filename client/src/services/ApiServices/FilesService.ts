import { axiosInstance } from './axiosInstance'

const FilesService = {
  async uploadFile(file: any): Promise<any> {
    const { data: response } = await axiosInstance.post('/files/upload', file)

    return response
  },
}

export { FilesService }
