import router from "@/router";
import request from "@/utils/request";
import { notification } from "ant-design-vue";

const state = {
  step: {
    payAccount: "123456",
    receiverAccount: {
      type: "bank",
      number: "",
    },
  },
};

const actions = {
  async submitStepForm({ commit }, payload) {
    if (payload.payload.password === "123123") {
      let res = await request({
        url: "api/form",
        method: "POST",
        data: payload.payload,
      });
      if (res.data.message === "成功") {
        commit("saveStepFormData", payload);
        router.push("/form/stepform/result");
      }
    } else {
      notification.error({
        message: "密码错误",
      });
    }
  },
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload,
    };
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
