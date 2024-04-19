<template>
  <div style="position: relative;">
    <el-menu mode="horizontal" :default-active="this.$route.path" @select="handleClick">
      <el-menu-item v-for="menu in menus" :key="menu.path" :index="menu.path">
        {{ menu.name }}
      </el-menu-item>
    </el-menu>
    <el-dropdown class="avatar" trigger="click"  @command="handleAvatar">
      <el-avatar :size="40" src="/assets/avatar.jpeg"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {path: '/home', name: '主页'},
        {path: '/weight', name: '体重管理'},
        {path: '/sports', name: '健身管理'},
        {path: '/meal', name: '饮食管理'}
      ]
    }
  },
  methods: {
    handleClick (path) {
      this.$router.push(path)
    },
    handleAvatar (v) {
      if (v === 'logout') {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.main {
  min-height: calc(100vh - 61px);
  width: 100%;
}

.avatar {
  position: absolute;
  right: 16px;
  top: 13px;
}
</style>
