<template>
  <el-form ref="folderForm" :model="form" :rules="rules">
    <el-form-item prop="name" label="Folder Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item prop="folder" label="Folder parent">
      <el-select v-model="form.parent" placeholder="Select folder parent">
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
      <el-button @click="onAccept">Accept</el-button>
      <el-button>Reset</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { clone } from 'ramda'
import { FoldersService } from '@/services/ApiServices'
import { Getter } from 'vuex-class'

const DEFAULT_FORM = {
  name: '',
  parent: '',
  readPermissions: [],
  editPermissions: [],
  deletePermissions: [],
  owner: '',
}

@Component
export default class FolderForm extends Vue {
  @Prop({ type: Object })
  folder!: any

  form = clone(this.folder || DEFAULT_FORM)

  avaliableFolders: any = []

  rules = {
    name: [{ required: true, message: 'Please enter name', trigger: 'blur' }],
    parent: [
      {
        required: true,
        message: 'Please select the folder parent',
        trigger: 'blur',
      },
    ],
  }

  @Getter('auth/userId')
  userId!: string

  get isEditing() {
    return Boolean(this.folder)
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

  async onAccept() {
    const folderForm: any = this.$refs.folderForm
    folderForm.validate(async (valid: boolean) => {
      if (!valid) return

      const payload = {
        ...this.form,
        _id: this.$route.params.id,
        parent: this.form.parent !== -1 ? this.form.parent : undefined,
        owner: this.userId,
        editPermissions: ['Admin'],
        deletePermissions: ['Admin'],
        readPermissions: ['Admin'],
      }

      try {
        if (this.isEditing) {
          await FoldersService.editFolder(payload)
        } else {
          await FoldersService.createFolder(payload)
        }

        this.$notify.success({
          title: 'Success',
          message: `Folder ${this.isEditing ? 'edited' : 'created'}`,
        })

        if (!this.isEditing) {
          this.resetForm()
        }
      } catch (err) {
        this.$notify.error({
          title: 'Error',
          message: `Error during ${
            this.isEditing ? 'edited' : 'created'
          } folder`,
        })
      }
    })
  }

  created() {
    this.fetchFolders()
  }
}
</script>
