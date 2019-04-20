<template>
  <el-container>
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
      <div>
        <el-button>Sign in</el-button>
        <el-button @click="$router.push({ name: 'signup' })">Sign up</el-button>
      </div>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {}
</script>
