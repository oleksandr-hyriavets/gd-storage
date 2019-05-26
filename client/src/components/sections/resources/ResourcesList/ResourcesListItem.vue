<template>
  <el-col :xs="24" :sm="8" :md="6" style="margin-bottom: 20px;">
    <el-card style="position: relative">
      <p
        style="font-size: 12px; position: absolute; top: 0; right: 10px; color: #ccc;"
      >
        {{ resource.createdAt }}
      </p>
      <h3 @click="goToDetails" style="cursor: pointer;">{{ resource.name }}</h3>
      <p style="font-size: 14px;">
        {{ shortDescription }}
      </p>
      <p>File: {{ resource.file.filename }}</p>
      <p>Owner: {{ resource.owner.fullname }}</p>
      <div v-if="isOwner">
        <el-button type="primary" @click="goToDetails">Details</el-button>
        <el-button @click="goToEditPage">Edit</el-button>
        <el-button @click="removeResource" type="danger">Remove</el-button>
      </div>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { ResourcesService } from '@/services/ApiServices'

@Component
export default class ResourcesListItem extends Vue {
  @Prop({ type: Object, required: true })
  resource!: any

  @Getter('auth/userId')
  userId!: string

  get isOwner() {
    return this.userId === this.resource.owner._id
  }

  get shortDescription() {
    const max = 200

    const concated = this.resource.description
      .split('')
      .filter((char: string, i: number) => {
        if (i < max) return true
      })

    return `${concated.join('')}...`
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

  async removeResource() {
    try {
      await ResourcesService.removeResource(this.resource._id)

      this.$notify.success({
        title: 'Success',
        message: 'Resource removed',
      })

      this.$emit('refetch-resources')
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during removing resource',
      })
    }
  }
}
</script>
