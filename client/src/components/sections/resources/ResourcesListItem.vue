<template>
  <el-col :xs="24" :sm="8" :md="6" style="margin-bottom: 20px;">
    <el-card style="position: relative">
      <p
        style="font-size: 12px; position: absolute; top: 0; right: 10px; color: #ccc;"
      >
        {{ resource.createdAt }}
      </p>
      <h2 @click="goToDetails" style="cursor: pointer;">{{ resource.name }}</h2>
      <p style="font-size: 14px;">
        {{ resource.description }}
      </p>
      <p>File: {{ resource.file.filename }}</p>
      <p>Owner: {{ resource.owner.fullname }}</p>
      <div>
        <el-button type="primary" @click="goToDetails">Details</el-button>
      </div>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ResourcesListItem extends Vue {
  @Prop({ type: Array, required: true })
  resource!: any

  goToDetails() {
    this.$router.push({
      name: 'resources-id',
      params: { id: this.resource._id },
    })
  }
}
</script>
