<template>
  <div v-if="resource">
    <div style="display: flex; align-items: center;">
      <el-button round @click="$router.back()"
        ><i class="el-icon-back"
      /></el-button>
      <h1 style="margin: 0 auto;">{{ resource.name }}</h1>
      <el-button type="success">
        <a
          style="color: inherit; text-decoration: none; text-transform: inherit;"
          :href="
            `http://localhost:3001/files/download?id=${resource.file.gdFileId}`
          "
          download
          >Download</a
        ></el-button
      >
    </div>
    <hr />

    <el-card>
      <p><b>Owner:</b> {{ resource.owner.fullname }}</p>
      <p><b>File name:</b> {{ resource.file.filename }}</p>
      <p><b>Created At:</b> {{ resource.createdAt.slice(0, 10) }}</p>
      <p><b>Description:</b> {{ resource.description }}</p>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import {
  ResourcesList,
  ResourcesListItem,
} from '@/components/sections/resources/ResourcesList'
import { FilesService } from '@/services/ApiServices'

@Component({
  components: {
    ResourcesList,
    ResourcesListItem,
  },
})
export default class ResourceDetailsView extends Vue {
  @Action('resources/fetchResourceById')
  fetchResourceById!: (id: string) => Promise<void>

  @Getter('resources/resource')
  resource!: any

  async localFetchResourcesById(id: string) {
    try {
      this.fetchResourceById(id)
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching resources',
      })
    }
  }

  async downloadResource() {
    const { file } = this.resource

    try {
      const linkShouldItBe = await FilesService.downloadFile(file.gdFileId)

      console.log(linkShouldItBe)
    } catch (err) {
      console.error(err)
    }
  }

  created() {
    const id = this.$route.params.id

    if (!id) {
      this.$notify.error({
        title: 'Error',
        message: 'No resource id provider. Try again!',
      })
    }

    this.localFetchResourcesById(id)
  }
}
</script>
