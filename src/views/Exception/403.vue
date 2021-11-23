<template>
  <a-result
    status="403"
    title="403"
    sub-title="Sorry, you don't have access to this page."
  >
    <template #extra>
      <a-button type="primary" @click="toHome">Back Home</a-button>
    </template>
  </a-result>
</template>

<script>
import { Result } from "ant-design-vue";

export default {
  name: "Forbidden",
  components: {
    "a-result": Result,
  },
  methods: {
    toHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style scoped></style>
