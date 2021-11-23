<template>
  <div>
    <h3>操作成功，预计两小时内到账</h3>
    <div>{{ time }}秒后将自动返回首页</div>
  </div>
</template>

<script>
export default {
  name: "Step3",
  data() {
    return {
      time: 3,
    };
  },
  mounted() {
    let timer = setInterval(() => {
      this.time--;
      if (this.time <= 0) {
        clearInterval(timer);
        this.$router.replace("/form/stepform/info");
      }
    }, 1000);
  },
};
</script>

<style></style>
