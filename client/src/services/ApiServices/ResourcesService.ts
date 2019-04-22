import { axiosInstance } from './axiosInstance'

const ResourcesService = {
  async fetchResources(): Promise<any[]> {
    const { data: response } = await axiosInstance.get('/resources')

    return response
  },

  async fetchResourceById(id: string): Promise<any> {
    const { data: response } = await axiosInstance.get('/resources', {
      params: { id },
    })

    return response
  },

  async fetchRelatedResources(id: string): Promise<any> {
    const { data: response } = await axiosInstance.get('/resources/related', {
      params: { id },
    })

    return response
  },

  async editResource(newResource: any) {
    await axiosInstance.put('/resources/edit', newResource)
  },
}

export { ResourcesService }
