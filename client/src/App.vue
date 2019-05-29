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
        <span style="color: white; margin-right: 20px;"
          >Hi, {{ fullname }}</span
        >
        <el-button @click="logout">Logout</el-button>
      </div>
      <div v-else>
        <el-button @click="$router.push({ name: 'signin' })">Sign in</el-button>
        <el-button @click="$router.push({ name: 'signup' })">Sign up</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside v-if="isNotSignInOrSignOutPage" width="200px">
        <div
          style="display: flex; align-items: center; justify-content: space-between;"
        >
          <h1>&nbsp; Folders Tree:</h1>
          <el-button
            size="mini"
            type="primary"
            circle
            icon="el-icon-refresh"
            @click="refreshFolderTreeHandler"
          />
        </div>
        <FolderTreeView ref="folderTreeViewRef" />
      </el-aside>
      <el-main>
        <router-view :key="$route.path" />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { TokenService } from './services'
import { FolderTreeView } from '@/components/sections/folders/FolderTreeView'

@Component({
  components: {
    FolderTreeView,
  },
})
export default class AppVue extends Vue {
  @Action('auth/logout')
  logout!: () => Promise<void>

  @Action('auth/fetchUser')
  fetchUser!: () => Promise<void>

  @Getter('auth/loggedIn')
  loggedIn!: boolean

  @Getter('auth/fullname')
  fullname!: string

  get isNotSignInOrSignOutPage() {
    const routeNamesOfPagesWithoutFolderTree = ['signin', 'signup']
    const currentRouteName = this.$route.name || ''

    return !routeNamesOfPagesWithoutFolderTree.includes(currentRouteName)
  }

  refreshFolderTreeHandler() {
    const r: any = this.$refs.folderTreeViewRef
    r.fetchFolderTree()
  }

  async created() {
    const userId = TokenService.getUserId()

    if (!userId) return

    try {
      await this.fetchUser()
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching user profile',
      })
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>
