<template>
  <div class="header">
    <a-dropdown>
      <a class="ant-dropdown-link">
        语言
        <a-icon type="global" />
      </a>
      <a-menu slot="overlay" @click="localeChange">
        <a-menu-item key="zhCN"> 中文 </a-menu-item>
        <a-menu-item key="enUS"> English </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    localeChange({ key }) {
      this.$router.push({
        query: {
          ...this.$route.query,
          locale: key,
        },
      });
      this.$i18n.locale = key;
    },
  },
};
</script>

<style scoped>
.header {
  float: right;
  display: flex;
  top: 0;
}
</style>
