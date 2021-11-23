<template>
  <a-result
    status="500"
    title="500"
    sub-title="Sorry, the server is reporting an error."
  >
    <template #extra>
      <a-button type="primary" @click="toHome"> Back Home </a-button>
    </template>
  </a-result>
</template>

<script>
import { Result } from "ant-design-vue";

export default {
  name: "Exception500",
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
