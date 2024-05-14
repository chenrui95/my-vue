<template>
  <!--
    记录图片、名称、日期、卡路里、价格，可以选食材里的也可以选菜单里的，也可以自己新增食材或菜单（新增时填到对应页面）
    最上面添加一行卡片，有个按钮可以随机生成要吃的菜，展示今天已摄入的卡路里和今天的总金额，今天的日期啥的还有一些心里鸡汤都可以展示
    如果有计划的饮食，可以展示为卡片
    要有计划饮食功能
  -->
  <div>
    <header>
      <div>{{ date }}</div>
    </header>
  </div>
</template>

<script>
import { getDate } from '../../utils';
export default {
  data () {
    return {
      date: getDate(),
      interval: null
    };
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = getDate();
    }, 1000);
  },
  beforeDestroy () {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.header {
  display: flex;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
