<template>
  <div class="home">
    <el-button @click="$router.push({ name: 'resources' })"
      >Go to resources</el-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  created() {
    this.$router.push({ name: 'resources' })
  }
}
</script>
