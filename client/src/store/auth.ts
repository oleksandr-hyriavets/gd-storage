import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { AuthService } from '@/services/ApiServices'
import { TokenService } from '@/services'

const MUTATIONS = {
  FETCH_USER: 'FETCH_USER',
}

const state: any = {
  user: null,
}

const getters: GetterTree<any, any> = {
  loggedIn: state => Boolean(state.user),
}

const actions: ActionTree<any, any> = {
  async register(ctx, userData: any) {
    await AuthService.register(userData)
  },

  async login({ dispatch }, credentials: any) {
    const userId = await AuthService.login(credentials)

    TokenService.setUserId(userId)

    await dispatch('fetchUser')
  },

  async logout(ctx) {
    TokenService.removeUserId()
  },

  async fetchUser({ commit }) {
    const userId = TokenService.getUserId()

    if (!userId) {
      throw Error('There are no userId')
    }

    const user = await AuthService.fetchUser(userId)

    commit(MUTATIONS.FETCH_USER, user)
  },
}

const mutations: MutationTree<any> = {
  [MUTATIONS.FETCH_USER](state, newUser) {
    state.user = newUser
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
