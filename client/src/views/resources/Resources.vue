<template>
  <div>
    <div
      style="width: 100%; display: flex; justify-content: space-between; align-items: center;"
    >
      <h2>Folders</h2>
      <el-button
        style="height: 40px;"
        type="success"
        round
        @click="$router.push({ name: 'create-folder' })"
        >Create folder</el-button
      >
    </div>
    <FolderList>
      <FolderListItem
        v-for="(folder, index) in rootFolders"
        :key="index"
        :folder="folder"
      />
    </FolderList>
    <div
      style="width: 100%; display: flex; justify-content: space-between; align-items: center;"
    >
      <h2>Resources</h2>
      <el-button
        style="height: 40px;"
        type="success"
        round
        @click="$router.push({ name: 'resources-create' })"
        >Create resource</el-button
      >
    </div>
    <!-- <div style="width: 100%">
      <el-input
        type="text"
        placeholder="Search"
        style="width: 550px; display: block; margin: 0 auto;"
      />
    </div> -->
    <ResourcesList>
      <ResourcesListItem
        v-for="(resource, index) in rootResources"
        :key="index"
        :resource="resource"
        @refetch-resources="fetchRootResources"
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
import {
  FolderList,
  FolderListItem,
} from '@/components/sections/folders/FolderList'

import { FoldersService, ResourcesService } from '@/services/ApiServices'

@Component({
  components: {
    ResourcesList,
    ResourcesListItem,
    FolderList,
    FolderListItem,
  },
})
export default class ResourcesView extends Vue {
  rootFolders: any = []
  rootResources: any = []

  async fetchRootFolders() {
    try {
      const folders = await FoldersService.getFolders()

      this.rootFolders = folders.filter(
        (folder: any) => !Boolean(folder.parent),
      )
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching root folders',
      })
    }
  }

  async fetchRootResources() {
    try {
      const resources = await ResourcesService.fetchResources()

      this.rootResources = resources.filter(
        (resource: any) => !Boolean(resource.folder),
      )
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching root resources',
      })
    }
  }

  created() {
    this.fetchRootFolders()
    this.fetchRootResources()
  }

  // @Action('resources/fetchResources')
  // fetchResources!: () => Promise<void>

  // @Getter('resources/resources')
  // resources!: any[]

  // get resourcesWithoutParent() {
  //   return this.resources.filter(resource => !Boolean(resource.parent))
  // }

  // async localFetchResources() {
  //   try {
  //     await this.fetchResources()
  //   } catch (err) {
  // this.$notify.error({
  //   title: 'Error',
  //   message: 'Error during fetching resources',
  // })
  //   }
  // }

  // created() {
  //   this.localFetchResources()
  // }
}
</script>
