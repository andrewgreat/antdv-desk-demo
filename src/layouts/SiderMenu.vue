<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="toMenu(item.path)"
        >
          <a-icon v-if="item.icon" :type="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import { check } from "../utils/auth";

//main menu component
export default {
  name: "SiderMenu",
  components: {
    "sub-menu": SubMenu,
  },
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  watch: {
    "$route.path": function (val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.getMenuRoutes());
    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
    };
  },
  methods: {
    toMenu(path) {
      if (this.$route.path !== path) {
        this.$router.push({
          path: path,
          query: this.$route.query,
        });
      }
    },
    getMenuRoutes() {
      const routes = this.$router.options.routes;
      const menuRoutes = [];
      routes.forEach((route) => {
        if (route.isMenu) {
          route.children.forEach((menu) => {
            menuRoutes.push(menu);
          });
        }
      });
      return menuRoutes;
    },
    getMenuData(routes = [], parentKeys = [], selectedKeys) {
      const menuData = [];
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          continue;
          // console.log(item.meta.authority);
        }
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKeys || item.path];
          const newItem = { ...item };
          //删除当前节点中原始路由children节点
          delete newItem.children;
          if (item.children && !item.hideChildrenMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path,
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKeys ? parentKeys : [...parentKeys, item.path],
              selectedKeys || item.path
            );
          }
          menuData.push(newItem);
        }
      }
      return menuData;
    },
  },

  listToTree(list, tree, parentId) {
    list.forEach((item) => {
      // 判断是否为父级菜单
      // eslint-disable-next-line eqeqeq
      if (item.pid === parentId) {
        const child = {
          ...item,
          key: item.key || item.name,
          children: [],
        };
        // 迭代 list， 找到当前菜单相符合的所有子菜单
        this.listToTree(list, child.children, item.id);
        // 删掉不存在 children 值的属性
        if (child.children.length <= 0) {
          delete child.children;
        }
        // 加入到树中
        tree.push(child);
      }
    });
  },
};
</script>
