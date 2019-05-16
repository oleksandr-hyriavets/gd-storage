<template>
  <div v-if="currentFolder">
    <div style="display: flex; align-items: center;">
      <el-button round @click="$router.back()"
        ><i class="el-icon-back"
      /></el-button>
      <h1 style="margin: 0 auto;">{{ currentFolder.name }}</h1>
    </div>
    <hr />
    <div v-if="childFolders.length">
      <h3>Folders</h3>
      <FolderList>
        <FolderListItem
          v-for="(folder, index) in childFolders"
          :key="index"
          :folder="folder"
        />
      </FolderList>
    </div>
    <div v-if="folderResources.length">
      <h3>Resources</h3>
      <ResourcesList>
        <ResourcesListItem
          v-for="(resource, index) in folderResources"
          :key="index"
          :resource="resource"
        />
      </ResourcesList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import {
  FolderList,
  FolderListItem,
} from '@/components/sections/folders/FolderList'
import {
  ResourcesList,
  ResourcesListItem,
} from '@/components/sections/resources/ResourcesList'

import { FoldersService, ResourcesService } from '@/services/ApiServices'

@Component({
  components: {
    ResourcesList,
    ResourcesListItem,
    FolderList,
    FolderListItem,
  },
})
export default class FolderOpenedView extends Vue {
  currentFolder: any = null
  childFolders: any = []
  folderResources: any = []

  async fetchFolderResources(folderId: string) {
    try {
      const folderResources = await ResourcesService.fetchRelatedResources(
        folderId,
      )

      this.folderResources = folderResources
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching folder resources',
      })
    }
  }

  async fetchChildFolders(id: string) {
    try {
      const childFolders = await FoldersService.getChildFolders(id)

      this.childFolders = childFolders
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching child folders',
      })
    }
  }

  async fetchCurrentFolder(id: string) {
    try {
      const currentFolder = await FoldersService.getFolderById(id)

      this.currentFolder = currentFolder
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching folder',
      })
    }
  }

  created() {
    const { id } = this.$route.params

    if (!id) return

    this.fetchCurrentFolder(id)
    this.fetchChildFolders(id)
    this.fetchFolderResources(id)
  }
}
</script>
