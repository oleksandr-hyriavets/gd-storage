<template>
  <el-card style="width: 400px;  margin: 0 auto; margin-top: 100px;">
    <FolderForm />
  </el-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { FolderForm } from '@/components/sections/folders/FolderForm'

@Component({
  components: {
    FolderForm,
  },
})
export default class CreateFolderView extends Vue {}
</script>
