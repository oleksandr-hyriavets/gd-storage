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
    <el-form-item prop="file" label="File"> </el-form-item>
    <div>
      <el-button>Accept</el-button>
      <el-button>Reset</el-button>
    </div>
  </el-form>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
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
export default class EditResourceView extends Vue {
  form = clone(DEFAULT_FORM)

  onSuccess(smth: any) {
    console.log(smth)
  }
}
</script>