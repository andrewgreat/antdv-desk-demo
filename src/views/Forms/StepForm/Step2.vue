<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item>
        <a-form-item
          label="付款账户"
          :label-col="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          >{{ step.payAccount }}
        </a-form-item>
        <a-form-item
          label="收款账户"
          :label-col="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <span style="color: #a12221">{{
            step.receiverAccount.type === 'alipay' ? '支付宝' : '银行卡'
          }}</span>
          <span>: {{ step.receiverAccount.number }}</span>
        </a-form-item>
        <a-form-item
          label="账户密码"
          :label-col="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            type="password"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入付款账户密码' }]
              }
            ]"
            placeholder="请输入内容"
          />
        </a-form-item>
        <a-form-item>
          <a-button style="margin-right: 15px" type="dashed" @click="handleBack"
            >上一步
          </a-button>
          <a-button type="primary" @click="handleSubmit">提交</a-button>
        </a-form-item>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step2',
  data() {
    this.form = this.$form.createForm(this)
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    }
  },
  computed: {
    step() {
      console.log(this.$store.state.form.step)
      return this.$store.state.form.step
    }
  },
  methods: {
    handleSubmit() {
      const { form, $store, step } = this
      form.validateFields((err, values) => {
        if (!err) {
          $store.dispatch({
            type: 'form/submitStepForm',
            payload: { ...step, ...values }
          })
        }
      })
    },
    handleBack() {
      this.$router.push('/form/stepform/info')
    }
  }
}
</script>

<style></style>
