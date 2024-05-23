<template>
  <!-- 食材（蔬菜、肉类、碳水、水果）
  菜单（一些做好的菜，用的食材，也可以是菜谱，卡路里、照片），包括零食、点心、奶茶饮料等记录
  新增记录时，可以随机生成蔬菜肉类碳水的搭配，可以选择需要的食材，也可以自己添加，自己添加的要是菜单里没有可以反填到菜单里
  饮食记录--可以直接从菜单选，也可以直接从食材选，也可以自己添加：记录时间、卡路里、价格也可以记录、零食奶茶点心等要有明显标志
    以上都需要搜索
  饮食目标：就是什么时候可以吃个什么东西之类的，如果有具体日期，可以在Home页展示

  页面配置：
  1. 饮食记录页面，可以配置显示的卡片：今日计划、当前状态、饮食推荐&今天菜单，就往上堆....
     饮食记录页面：展示最近几天的记录
     饮食推荐设置：可选从已有菜单中推荐，或者食材推荐，也可两个都选
     菜单推荐配置：是否我喜欢的优先级更高，放纵餐里的是否推荐，还是哪天可以推荐，推荐几个菜，推荐的种类（外卖、快餐、自制等）
     随机食材设置：水果蔬菜碳水分别是什么数量
-->
  <div class="main-content">
    <Menu @clickMenu="clickMenu" :menus="[
      {
        title: '食材管理',
        id: 1,
        link: '/meal/material'
      },
      {
        title: '菜单管理',
        id: 2,
        link: '/meal/food'
      },
      {
        title: '饮食记录',
        id: 3,
        link: '/meal/record'
      },
      {
        title: '功能管理',
        id: 4,
        link: '/meal/setting'
      }
    ]" theme="light"></Menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from '../../components/menu/Menu.vue';

export default {
  data() {
    return {};
  },
  components: {
    Menu
  },
  methods: {
    clickMenu(menu) {
      if (menu.link) {
        this.$router.push(menu.link);
      }
    }
  }
};
</script>

<style scoped>
.main-content {
  display: flex;
  height: calc(100vh - 77px);
}

.content {
  flex: 1;
  padding: 16px;
  overflow: auto;
}
</style>
