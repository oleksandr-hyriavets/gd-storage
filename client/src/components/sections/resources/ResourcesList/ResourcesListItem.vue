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
      <div v-if="isOwner">
        <el-button type="primary" @click="goToDetails">Details</el-button>
        <el-button @click="goToEditPage">Edit</el-button>
        <el-button type="danger">Remove</el-button>
      </div>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ResourcesListItem extends Vue {
  @Prop({ type: Object, required: true })
  resource!: any

  @Getter('auth/userId')
  userId!: string

  get isOwner() {
    return this.userId === this.resource.owner._id
  }

  goToDetails() {
    this.$router.push({
      name: 'resources-id',
      params: { id: this.resource._id },
    })
  }

  goToEditPage() {
    this.$router.push({
      name: 'resources-id-edit',
      params: { id: this.resource._id },
    })
  }
}
</script>
