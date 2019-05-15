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
      <!-- <div>
        <el-button type="primary" @click="goToDetails">Details</el-button>
        <el-button @click="goToEditPage">Edit</el-button>
        <el-button type="danger">Remove</el-button>
      </div> -->
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class FolderListItem extends Vue {
  @Prop({ type: Object, required: true })
  folder!: any

  goToDetails() {
    this.$router.push({ name: 'folder-id', params: { id: this.folder._id } })
  }

  goToEditPage() {
    console.log('nu go')
  }
}
</script>
