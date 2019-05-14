<template>
  <el-card style="width: 400px;  margin: 0 auto; margin-top: 100px;">
    <ResourceForm />
  </el-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ResourceForm } from '@/components/sections/resources/newResourceForm'

const DEFAULT_FORM = {
  name: '',
  description: '',
  file: '',
}

@Component({
  components: {
    ResourceForm,
  },
})
export default class CreateResourceView extends Vue {
  form = {
    name: '',
  }
}
</script>

