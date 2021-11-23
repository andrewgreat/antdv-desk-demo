import { check } from "../utils/auth";

function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentElement && el.parentNode.removeChild(el);
      }
    },
  });
}

export default { install };
