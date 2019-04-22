<template>
  <el-form>
    <el-form-item prop="name" label="Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item prop="description" label="Description">
      <el-input
        v-model="form.description"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
      ></el-input>
    </el-form-item>
    <el-form-item v-loading="uploading" prop="file" label="File">
      <input type="file" @change="onFileSelect" />
    </el-form-item>
    <el-form-item prop="parent" label="Parent">
      <el-select v-model="form.parent" placeholder="Select">
        <el-option
          v-for="(option, index) in resourcesOptions"
          :key="index"
          :label="option.name"
          :value="option.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <div>
      <el-button @click="onAccept">Accept</el-button>
      <el-button>Reset</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { clone } from 'ramda'

const DEFAULT_FORM = {
  name: '',
  description: '',
  file: '',
  parent: '',
  readPermissions: [],
  editPermissions: [],
  deletePermissions: [],
}

@Component
export default class ResourceForm extends Vue {
  form = clone(DEFAULT_FORM)

  uploading = false

  resourcesOptions: any[] = []

  selectedFile: any = null

  @Action('resources/uploadFile')
  uploadFile!: (file: any) => Promise<any>

  @Action('resources/fetchResources')
  fetchResources!: () => Promise<any>

  async localUploadFile() {
    this.uploading = true

    const fd = new FormData()
    fd.append('file', this.selectedFile, this.selectedFile.name)

    try {
      const file = await this.uploadFile(fd)

      this.$notify.success({
        title: 'Success',
        message: 'File uploaded successfully!',
      })

      this.form.file = file._id
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during uploading file',
      })
    } finally {
      this.uploading = false
    }
  }

  async onFileSelect(event: any) {
    this.selectedFile = event.target.files[0]
  }

  async localFetchResources() {
    try {
      const resources = await this.fetchResources()

      this.resourcesOptions = resources.map((resource: any) => ({
        id: resource._id,
        name: resource.name,
      }))
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching resources',
      })
    }
  }

  async onAccept() {
    const payload = {
      ...this.form,
    }

    try {
      console.log('end form with payload', payload)
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during accepting resource form',
      })
    }
  }

  created() {
    this.localFetchResources()
  }
}
</script>