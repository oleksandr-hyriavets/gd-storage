<template>
  <el-container>
    <el-card style="width: 400px;  margin: 0 auto; margin-top: 120px;">
      <el-form ref="signupForm" :model="form" :rules="rules">
        <el-form-item prop="fullname" label="Full Name">
          <el-input v-model="form.fullname"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="Password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Sign up</el-button>
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
  fullname: '',
}

@Component
export default class Home extends Vue {
  form = clone(DEFAULT_FORM)

  rules = {
    fullname: [
      { required: true, message: 'Please enter Fullname', trigger: 'blur' },
    ],
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
    const signupForm: any = this.$refs.signupForm
    signupForm.validate((valid: boolean) => {
      if (!valid) return

      console.log(this.form)
    })
  }

  clearFields() {
    const signupForm: any = this.$refs.signupForm

    this.form = clone(DEFAULT_FORM)
    signupForm.resetFields()
  }
}
</script>
