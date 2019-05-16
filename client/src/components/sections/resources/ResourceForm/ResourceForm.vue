<template>
  <el-form ref="resourceForm" :model="form" :rules="rules">
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

    <el-form-item v-loading="fileUploading" prop="file" label="File">
      <input type="file" @change="onFileSelect" />
    </el-form-item>

    <el-form-item prop="folder" label="Folder">
      <el-select v-model="form.folder" placeholder="Select folder">
        <el-option
          v-for="(option, index) in avaliableFolders"
          :key="index"
          :label="option.name"
          :value="option.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <div>
      <el-button type="success" @click="onAccept">Accept</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { clone } from 'ramda'
import { Action, Getter } from 'vuex-class'
import { FoldersService } from '@/services/ApiServices'

const DEFAULT_FORM = {
  name: '',
  description: '',
  file: '',
  folder: '',
  readPermissions: [],
  editPermissions: [],
  deletePermissions: [],
}

@Component
export default class ResourceForm extends Vue {
  @Prop({ type: Object })
  resource!: any

  form: any = clone(this.resource || DEFAULT_FORM)

  fileUploading: boolean = false

  avaliableFolders: any = []

  selectedFile: any = null

  rules = {
    name: [{ required: true, message: 'Please enter name', trigger: 'blur' }],
    description: [
      { required: true, message: 'Please enter description', trigger: 'blur' },
    ],
    file: [
      { required: true, message: 'Please select the file', trigger: 'blur' },
    ],
    folder: [
      { required: true, message: 'Please select the folder', trigger: 'blur' },
    ],
  }

  @Action('resources/uploadFile')
  uploadFile!: (file: any) => Promise<any>

  @Action('resources/createResource')
  createResource!: (newResource: any) => Promise<void>

  @Action('resources/editResource')
  editResource!: (newResource: any) => Promise<void>

  @Getter('auth/userId')
  userId!: string

  get isEditing() {
    return Boolean(this.resource)
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0]
    this.form.file = -1
  }

  resetForm() {
    this.form = clone(DEFAULT_FORM)
  }

  async fetchFolders() {
    try {
      const folders = await FoldersService.getFolders()

      this.avaliableFolders = [
        ...folders.map((folder: any) => ({
          id: folder._id,
          name: folder.name,
        })),
        { id: -1, name: 'Root' },
      ]
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during fetching folders',
      })
    }
  }

  async localUploadFile() {
    if (!this.selectedFile && this.isEditing) return this.resource.file

    this.fileUploading = true

    const fd = new FormData()
    fd.append('file', this.selectedFile, this.selectedFile.name)

    try {
      const file = await this.uploadFile(fd)

      return file._id
    } catch (err) {
      this.$notify.error({
        title: 'Error',
        message: 'Error during uploading file',
      })
    } finally {
      this.fileUploading = false
    }
  }

  async onAccept() {
    const resourceForm: any = this.$refs.resourceForm
    resourceForm.validate(async (valid: boolean) => {
      if (!valid) return

      const payload = {
        ...this.form,
        folder: this.form.folder === -1 ? undefined : this.form.folder,
        owner: this.userId,
        editPermissions: ['Admin'],
        deletePermissions: ['Admin'],
        readPermissions: ['Admin'],
      }

      try {
        payload.file = await this.localUploadFile()

        if (this.isEditing) {
          await this.editResource(payload)
        } else {
          await this.createResource(payload)
        }

        this.$notify.success({
          title: 'Success',
          message: `Resource ${this.isEditing ? 'edited' : 'created'}`,
        })

        if (!this.isEditing) {
          this.resetForm()
        }
      } catch (err) {
        this.$notify.error({
          title: 'Error',
          message: 'Error during creating resource',
        })
      }
    })
  }

  created() {
    this.fetchFolders()
  }
}
</script>
