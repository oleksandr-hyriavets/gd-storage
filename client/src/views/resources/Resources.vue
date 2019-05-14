<template>
  <div>
    <div
      style="display: flex; align-items: center; justify-content: space-between;"
    >
      <h1>Resources</h1>
      <el-button
        type="success"
        round
        @click="$router.push({ name: 'resources-create' })"
        >Create resource</el-button
      >
    </div>
    <div style="width: 100%">
      <el-input
        type="text"
        placeholder="Search"
        style="width: 550px; display: block; margin: 0 auto;"
      />
    </div>
    <br />
    <br />
    <ResourcesList>
      <ResourcesListItem
        v-for="(resource, index) in resourcesWithoutParent"
        :key="index"
        :resource="resource"
      />
    </ResourcesList>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import {
  ResourcesList,
  ResourcesListItem,
} from '@/components/sections/resources/ResourcesList'

@Component({
  components: {
    ResourcesList,
    ResourcesListItem,
  },
})
export default class ResourcesView extends Vue {
  @Action('resources/fetchResources')
  fetchResources!: () => Promise<void>

  @Getter('resources/resources')
  resources!: any[]

  get resourcesWithoutParent() {
    return this.resources.filter(resource => !Boolean(resource.parent))
  }

  async localFetchResources() {
    try {
      await this.fetchResources()
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching resources',
      })
    }
  }

  created() {
    this.localFetchResources()
  }
}
</script>
