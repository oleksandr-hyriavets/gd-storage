import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { ResourcesService } from '@/services/ApiServices'

const MUTATIONS = {
  SET_RESOURCES: 'SET_RESOURCES',
  SET_RESOURCE: 'SET_RESOURCE',
  SET_RELATED_RESOURCES: 'SET_RELATED_RESOURCES',
}

const state: any = {
  resources: [],
  resource: null,
  relatedResources: [],
}

const getters: GetterTree<any, any> = {
  resources: state => state.resources,
  resource: state => state.resource,
}

const actions: ActionTree<any, any> = {
  async fetchResources({ commit }) {
    const resources = await ResourcesService.fetchResources()

    commit(MUTATIONS.SET_RESOURCES, resources)
  },

  async fetchResourceById({ commit }, id: string) {
    const resource = await ResourcesService.fetchResourceById(id)

    commit(MUTATIONS.SET_RESOURCE, resource)
  },

  async fetchRelatedResources({ commit }, id: string) {
    const relatedResources = await ResourcesService.fetchRelatedResources(id)

    commit(MUTATIONS.SET_RELATED_RESOURCES, relatedResources)
  },
}

const mutations: MutationTree<any> = {
  [MUTATIONS.SET_RESOURCES](state, newResources) {
    state.resources = newResources
  },
  [MUTATIONS.SET_RESOURCE](state, newResource) {
    state.resource = newResource
  },
  [MUTATIONS.SET_RELATED_RESOURCES](state, newRelatedResources) {
    state.relatedResources = newRelatedResources
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
