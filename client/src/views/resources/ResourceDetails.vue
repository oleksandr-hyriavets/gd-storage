<template>
  <div v-if="resource">
    <el-button @click="$router.back()">Back</el-button>
    <el-button>
      <a
        style="color: inherit; text-decoration: none; text-transform: inherit;"
        :href="
          `http://localhost:3001/files/download?id=${resource.file.gdFileId}`
        "
        download
        >Download</a
      ></el-button
    >

    <h1>{{ resource.name }}</h1>
    <span>Owner: {{ resource.owner.fullname }}</span>
    <p>
      {{ resource.description }}
    </p>
    <div v-if="relatedResources && relatedResources.length">
      <br />
      <br />
      <h2>Related resources</h2>
      <ResourcesList>
        <ResourcesListItem
          v-for="(resource, index) in relatedResources"
          :key="index"
          :resource="resource"
        />
      </ResourcesList>
    </div>
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

  @Action('resources/fetchRelatedResources')
  fetchRelatedResources!: (id: string) => Promise<void>

  @Getter('resources/resource')
  resource!: any

  @Getter('resources/relatedResources')
  relatedResources!: any

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

  async localFetchRelatedResources(id: string) {
    try {
      await this.fetchRelatedResources(id)
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching related resources',
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
    this.localFetchRelatedResources(id)
  }
}
</script>
