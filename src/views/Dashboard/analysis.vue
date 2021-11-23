<template>
  <div>
    {{ $t("message")["app.dashborad.analysis.timelable"] }}:
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption"></Chart>
  </div>
</template>

<script>
import request from "../../utils/request";
import Chart from "@/components/Chart";

export default {
  name: "analysis",
  data() {
    return {
      chartOption: {},
    };
  },
  components: {
    Chart,
  },
  mounted() {
    this.getChartData();
    // this.interval = setInterval(() => {
    //   this.getChartData();
    // }, 3000);
  },
  beforeDestroy() {
    // clearInterval(this.interval);
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { id: 12345 },
      }).then((res) => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: res.data,
            },
          ],
        };
      });
    },
  },
};
</script>

<style scoped></style>
