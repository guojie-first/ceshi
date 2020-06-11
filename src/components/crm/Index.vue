<template>
  <div>
    <el-container class="container">
      <el-aside width="200px">crm</el-aside>
      <el-main>
        <div class="box" ref='box'>

        </div>
        <div class="box" ref='box2'>

        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
import echarts from 'echarts';
let options = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
}
let option2 = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
    }]
};

export default {
  name: "CRM",
  data() {
    return {
      chart:null
    };
  },
  mounted(){
    //init执行的参数的是已经存在宽高的元素,所以不能写在created 里
    this.chart = echarts.init(this.$refs.box);
    this.chart.setOption(options);
    this.chart2 = echarts.init(this.$refs.box2);
    this.chart2.setOption(option2)
  }
};
</script>
<style lang="less">
.box{
  width:300px;
  height:300px;
}
</style>