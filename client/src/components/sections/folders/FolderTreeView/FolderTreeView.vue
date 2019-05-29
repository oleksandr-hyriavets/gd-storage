<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="folderTree"
      :props="defaultProps"
      node-key="_id"
      highlight-current
      default-expand-all
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { FoldersService } from '@/services/ApiServices'

@Component({
  watch: {
    $route(newValue: any) {
      const ref: any = this.$refs.treeRef

      ref.setCurrentKey(newValue.params.id)
    },
  },
})
export default class FolderTreeView extends Vue {
  folderTree: any = []

  defaultProps = {
    children: 'children',
    label: 'name',
  }

  handleNodeClick(event: any) {
    console.log(event)
    this.$router.push({
      name: 'folder-id',
      params: { id: event._id },
    })
  }

  async fetchFolderTree() {
    try {
      this.folderTree = await FoldersService.getFolderTree()
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching folder tree',
      })
    }
  }

  created() {
    this.fetchFolderTree()
  }
}
</script>

