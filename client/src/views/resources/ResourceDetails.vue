<template>
  <div>
    <el-button>Back</el-button>
    <h1>File name</h1>
    <span>Owner: Iven</span>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
      praesentium reprehenderit incidunt, sint dolore voluptate, aliquam quidem
      rem doloremque ipsam aut harum atque!
    </p>
    <div>
      <h2>Resources</h2>
      <ResourcesList>
        <ResourcesListItem
          v-for="(resource, index) in resources"
          :key="index"
          :resource="resource"
        />
      </ResourcesList>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import {
  ResourcesList,
  ResourcesListItem,
} from '@/components/sections/resources'

@Component({
  components: {
    ResourcesList,
    ResourcesListItem,
  },
})
export default class ResourceDetailsView extends Vue {
  @Action('resources/fetchResourceById')
  fetchResourceById!: (id: string) => Promise<void>

  async localFetchResourcesById(id: string) {
    try {
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching resources',
      })
    }
  }
}
</script>
