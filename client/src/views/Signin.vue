<template>
  <el-container>
    <el-card style="width: 400px;  margin: 0 auto; margin-top: 100px;">
      <el-form ref="signinForm" :model="form" :rules="rules">
        <el-form-item prop="email" label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="Password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Sign in</el-button>
          <el-button @click="clearFields">Clear</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { clone } from 'ramda'

const DEFAULT_FORM = {
  email: '',
  password: '',
}

@Component
export default class Home extends Vue {
  form = clone(DEFAULT_FORM)

  rules = {
    email: [
      { required: true, message: 'Please enter valid Email', trigger: 'blur' },
    ],
    password: [
      {
        required: true,
        message: 'Please enter Password',
        trigger: 'blur',
      },
      { min: 5, message: 'Length should be more than 5', trigger: 'blur' },
    ],
  }

  onSubmit() {
    const signinForm: any = this.$refs.signinForm
    signinForm.validate((valid: boolean) => {
      if (!valid) return

      console.log(this.form)
    })
  }

  clearFields() {
    const signinForm: any = this.$refs.signinForm

    this.form = clone(DEFAULT_FORM)
    signinForm.resetFields()
  }
}
</script>
