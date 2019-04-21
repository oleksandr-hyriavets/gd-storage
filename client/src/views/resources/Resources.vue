<template>
  <div>
    <h1>Resources</h1>
    <div style="width: 100%">
      <el-input
        type="text"
        placeholder="Search"
        style="width: 550px; display: block; margin: 0 auto;"
      />
    </div>
    <br />
    <br />
    <ResourcesList>
      <ResourcesListItem />
    </ResourcesList>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
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
export default class ResourcesView extends Vue {}
</script>
