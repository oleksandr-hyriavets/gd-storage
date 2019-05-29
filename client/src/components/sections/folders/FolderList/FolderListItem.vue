<template>
  <el-col :xs="24" :sm="8" :md="6" style="margin-bottom: 20px;">
    <el-card style="position: relative">
      <p
        style="font-size: 12px; position: absolute; top: 0; right: 10px; color: #ccc;"
      >
        {{ folder.createdAt }}
      </p>
      <h2 @click="goToDetails" style="cursor: pointer;">{{ folder.name }}</h2>
      <p style="font-size: 14px;">
        {{ folder.description }}
      </p>
      <div>
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="goToEditPage"
        />
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="deleteFolder"
        />
      </div>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FoldersService } from '@/services/ApiServices'

@Component
export default class FolderListItem extends Vue {
  @Prop({ type: Object, required: true })
  folder!: any

  goToDetails() {
    this.$router.push({ name: 'folder-id', params: { id: this.folder._id } })
  }

  goToEditPage() {
    this.$router.push({
      name: 'folder-id-edit',
      params: { id: this.folder._id },
    })
  }

  async deleteFolder() {
    try {
      await FoldersService.removeFolder(this.folder._id)

      this.$notify.success({
        title: 'Success',
        message: 'Folder removed',
      })
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during removing folder',
      })
    }
  }
}
</script>
