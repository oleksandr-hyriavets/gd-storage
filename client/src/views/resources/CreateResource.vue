<template>
  <div>
    <div style="display: flex; align-items: center;">
      <el-button round @click="$router.back()"
        ><i class="el-icon-back"
      /></el-button>
      <h1 style="margin: 0 auto;">
        Create Resource
      </h1>
    </div>
    <hr />
    <el-card style="width: 400px;  margin: 0 auto; margin-top: 20px;">
      <ResourceForm />
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ResourceForm } from '@/components/sections/resources/ResourceForm'

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

