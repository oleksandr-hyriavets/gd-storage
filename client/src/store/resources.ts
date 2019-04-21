import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { ResourcesService } from '@/services/ApiServices'

const MUTATIONS = {
  SET_RESOURCES: 'SET_RESOURCES',
}

const state: any = {
  resources: [],
}

const getters: GetterTree<any, any> = {
  resources: state => state.resources,
}

const actions: ActionTree<any, any> = {
  async fetchResources({ commit }) {
    const resources = await ResourcesService.fetchResources()

    commit(MUTATIONS.SET_RESOURCES, resources)
  },
}

const mutations: MutationTree<any> = {
  [MUTATIONS.SET_RESOURCES](state, newResources) {
    state.resources = newResources
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
