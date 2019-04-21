import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { AuthService } from '@/services/ApiServices'
import { TokenService } from '@/services'

const MUTATIONS = {
  FETCH_USER: 'FETCH_USER',
  CLEAR_USER: 'CLEAR_USER',
}

const state: any = {
  user: null,
}

const getters: GetterTree<any, any> = {
  loggedIn: state => Boolean(state.user),
  fullname: state => state.user.fullname,
}

const actions: ActionTree<any, any> = {
  async register(ctx, userData: any) {
    await AuthService.register(userData)
  },

  async login({ dispatch }, credentials: any) {
    const userId = await AuthService.login(credentials)

    TokenService.setUserId(userId)

    try {
      await dispatch('fetchUser')
    } catch (err) {
      console.error(err)
    }
  },

  async logout({ commit }) {
    TokenService.removeUserId()

    commit(MUTATIONS.CLEAR_USER)
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

  [MUTATIONS.CLEAR_USER](state) {
    state.user = null
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
