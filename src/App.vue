<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-icon-favorite, .el-icon-indulge, .el-icon-un-favorite, .el-icon-un-indulge {
  font-size: 12px;
  background-size: cover;
  width: 12px;
  height: 12px;
  transform: translateY(1px);
}
.el-icon-favorite {
  background-image: url('~@/assets/favorite.svg');
}
.el-icon-un-favorite {
  background-image: url('~@/assets/un-favorite.svg');
}
.el-icon-indulge {
  background-image: url('~@/assets/indulge.svg');
}
.el-icon-un-indulge {
  background-image: url('~@/assets/un-indulge.svg');
}
</style>
