/* eslint-disable */
<template>
  <a-result title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #icon>
      <Logo />
      <!--      <icon-font type="icon-icon-404" style="font-size: 100px"></icon-font>-->
    </template>
    <template #extra>
      <a-button type="primary" @click="toHome"> Back Home</a-button>
    </template>
  </a-result>
</template>

<script>
import { Result } from "ant-design-vue";
import Logo from "@/assets/aislogo.svg";

export default {
  name: "NotFound",
  components: {
    "a-result": Result,
    Logo,
  },
  methods: {
    toHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped></style>
