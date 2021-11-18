<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        width="256px"
        collapsible
      >
        <div class="logo">在线考试管理平台</div>
        <SiderMenu :theme="navTheme"></SiderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #ffffff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          />
        </a-layout-header>
        <Header></Header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item>
          </a-breadcrumb>
          <div
            :style="{
              padding: '24px',
              background: 'white',
              minHeight: '360px',
            }"
          >
            Bill is a cat.
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer />
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/Setting/SettingDrawer";

export default {
  name: "BasicLayout",
  data() {
    return {
      collapsed: false,
    };
  },
  components: {
    SettingDrawer,
    Header,
    Footer,
    SiderMenu,
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
};
</script>

<style lang="less" scoped>
@import "./BasicLayout.less";
</style>
