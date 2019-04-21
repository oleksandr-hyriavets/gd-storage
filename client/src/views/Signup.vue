<template>
  <el-container>
    <el-card style="width: 400px;  margin: 0 auto; margin-top: 100px;">
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
import { Action } from 'vuex-class'
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

  @Action('auth/register')
  register!: (userData: any) => Promise<void>

  onSubmit() {
    const signupForm: any = this.$refs.signupForm
    signupForm.validate(async (valid: boolean) => {
      if (!valid) return

      try {
        await this.register(this.form)

        this.$notify.success({
          title: 'Success',
          message: 'User registered successfully',
        })

        this.clearFields()
      } catch (err) {
        this.$notify.error({
          title: 'Error',
          message: 'Error during user registration. Try again latter',
        })
      }
    })
  }

  clearFields() {
    const signupForm: any = this.$refs.signupForm

    this.form = clone(DEFAULT_FORM)
    signupForm.resetFields()
  }
}
</script>
