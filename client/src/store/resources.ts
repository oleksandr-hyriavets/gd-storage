import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { ResourcesService } from '@/services/ApiServices'

const MUTATIONS = {
  SET_RESOURCES: 'SET_RESOURCES',
}

const state: any = {
  resources: [],
  resource: null,
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

    commit(MUTATIONS.SET_RESOURCES, resource)
  },
}

const mutations: MutationTree<any> = {
  [MUTATIONS.SET_RESOURCES](state, newResources) {
    state.resources = newResources
  },
  [MUTATIONS.SET_RESOURCES](state, newResource) {
    state.resource = newResource
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
