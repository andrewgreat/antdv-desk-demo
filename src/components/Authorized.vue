<script>
import { check } from "../utils/auth";

export default {
  name: "Authorized",
  props: {
    authority: {
      type: Array,
      required: true,
    },
  },
  functional: true,
  render(h, context) {
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  },
};
</script>

<style scoped></style>
