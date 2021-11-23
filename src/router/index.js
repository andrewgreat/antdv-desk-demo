/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "@/views/Exception/404";
import Forbidden from "@/views/Exception/403";
import { check, isLogin } from "@/utils/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    icon: "user",
    title: "用户",
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        icon: "login",
        title: "登录",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        icon: "login",
        title: "注册",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/User/Register")
      }
    ]
  },
  {
    path: "/",
    isMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        icon: "dashboard", title: "仪表盘",
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            title: "分析页",
            component: () => {
              return import(
                /* webpackChunkName: "dashboard" */ "@/views/Dashboard/analysis"
                );
            }
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        icon: "form",
        title: "表单",
        meta: { authority: ["admin"] },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/form/basicform",
            name: "basicform",
            title: "基础表单",
            component: () =>
              import(/* webpackChunkName: "form" */ "@/views/Forms/BasicForm")
          },
          {
            path: "/form/stepform",
            hideChildrenMenu: true,
            name: "stepform",
            title: "分步表单",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "@/views/Forms/StepForm"
                ),
            children: [
              {
                path: "/form/stepform",
                redirect: "/form/stepform/info"
              },
              {
                path: "/form/stepform/info",
                name: "info",
                title: "表单info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step1"
                    )
              },
              {
                path: "/form/stepform/comfirm",
                name: "comfirm",
                title: "表单comfirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step2"
                    )
              },
              {
                path: "/form/stepform/result",
                name: "result",
                title: "表单result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step3"
                    )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由导航冗余报错（路由重复）
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "您没有权限访问该页面，请联系管理员咨询"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
