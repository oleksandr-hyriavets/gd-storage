<template>
  <div id="app">
    <el-header
      style="background: #409EFF; display: flex; justify-content: space-between; align-items: center"
    >
      <div
        style="display: flex; align-items: center; cursor: pointer;"
        @click="$router.push({ name: 'home' })"
      >
        <div style="width: 50px; height: 50px; margin-right: 15px;">
          <img
            style="width: 100%; height: auto;"
            src="@/assets/logo.png"
            alt="logo"
          />
        </div>
        <span style="color: white;">Just GD Storage</span>
      </div>
      <div v-if="loggedIn">
        <el-button @click="logout">Logout</el-button>
      </div>
      <div v-else>
        <el-button @click="$router.push({ name: 'signin' })">Sign in</el-button>
        <el-button @click="$router.push({ name: 'signup' })">Sign up</el-button>
      </div>
    </el-header>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class AppVue extends Vue {
  @Action('auth/logout')
  logout!: () => Promise<void>

  @Getter('auth/loggedIn')
  loggedIn!: boolean
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>
