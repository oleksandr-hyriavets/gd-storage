import { MutationTree, ActionTree, GetterTree } from 'vuex'

const MUTATIONS = {}

const state: any = {}

const getters: GetterTree<any, any> = {}

const actions: ActionTree<any, any> = {}

const mutations: MutationTree<any> = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
