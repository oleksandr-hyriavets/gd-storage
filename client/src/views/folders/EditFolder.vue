<template>
  <div>
    <div style="display: flex; align-items: center;">
      <el-button round @click="$router.back()"
        ><i class="el-icon-back"
      /></el-button>
      <h1 style="margin: 0 auto;">
        Edit Folder
      </h1>
    </div>
    <hr />
    <el-card style="width: 400px;  margin: 0 auto; margin-top: 20px;">
      <FolderForm v-if="folderToEdit" :folder="folderToEdit" />
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { FolderForm } from '@/components/sections/folders/FolderForm'
import { Action, Getter } from 'vuex-class'
import { FoldersService } from '@/services/ApiServices'

@Component({
  components: {
    FolderForm,
  },
})
export default class EditFolderView extends Vue {
  folder: any = null

  get folderToEdit() {
    if (!this.folder) return

    const { name } = this.folder

    return {
      name,
    }
  }

  async created() {
    const id = this.$route.params.id

    this.folder = await FoldersService.getFolderById(id)
  }
}
</script>

