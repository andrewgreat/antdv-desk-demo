<template>
  <div ref="chartDom" style="height: 400px"></div>
</template>

<script>
/* eslint-disable */
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";
// import "echarts";
let echarts = require("echarts");

export default {
  name: "Chart",
  props: {
    option: {
      type: Object,
      default: () => {
      }
    }
  },
  watch: {
    //普通监视
    option(val) {
      this.chart.setOption(val);
    }
    //深度监听,比较耗性能
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      this.chart.resize();
    },

    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      // 绘制图表
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style scoped>

</style>
