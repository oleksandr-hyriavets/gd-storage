<template>
  <div>
    <div style="display: flex; align-items: center;">
      <el-button round @click="$router.back()"
        ><i class="el-icon-back"
      /></el-button>
      <h1 style="margin: 0 auto;">
        Create Folder
      </h1>
    </div>
    <hr />
    <el-card style="width: 400px;  margin: 0 auto; margin-top: 20px;">
      <FolderForm />
    </el-card>
  </div>
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
