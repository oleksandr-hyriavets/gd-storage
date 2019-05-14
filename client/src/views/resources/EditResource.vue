<template>
  <el-card style="width: 400px;  margin: 0 auto; margin-top: 100px;">
    <ResourceForm v-if="resourceToEdit" :resource="resourceToEdit" />
  </el-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ResourceForm } from '@/components/sections/resources/ResourceForm'
import { Action, Getter } from 'vuex-class'
import { ResourcesService } from '@/services/ApiServices'

@Component({
  components: {
    ResourceForm,
  },
})
export default class EditResourceView extends Vue {
  resource: any = null

  get resourceToEdit() {
    if (!this.resource) return

    const {
      deletePermissions,
      description,
      editPermissions,
      file,
      name,
      owner,
      readPermissions,
      _id,
    } = this.resource

    return {
      deletePermissions,
      description,
      editPermissions,
      file: file._id,
      name,
      owner: owner._id,
      readPermissions,
      _id,
    }
  }

  async created() {
    const id = this.$route.params.id

    this.resource = await ResourcesService.fetchResourceById(id)
  }
}
</script>

