/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "@/views/Exception/404";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
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
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/User/Register")
      }
    ]
  },
  {
    path: "/",
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
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/views/Dashboard/analysis"
                )
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/form/basicform",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "@/views/Forms/BasicForm")
          },
          {
            path: "/form/Stepform",
            name: "stepform",
            meta: { title: "分步表单" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "@/views/Forms/StepForm/StepForm"
                ),
            children: [
              {
                path: "/form/stemp-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                meta: { title: "表单info" },
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step1"
                    )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                meta: { title: "表单confirm" },
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step2"
                    )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                meta: { title: "表单result" },
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

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
