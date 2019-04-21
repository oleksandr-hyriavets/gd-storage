import { axiosInstance } from './axiosInstance'

const ResourcesService = {
  async fetchResources(): Promise<any[]> {
    const { data: response } = await axiosInstance.get('/resources')

    return response
  },
}

export { ResourcesService }
