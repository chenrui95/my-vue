<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './utils/index.js'

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
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 100px;
}
.el-upload .el-icon-plus {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.link-like {
  color: #409EFF;
  cursor: pointer;
}
.footer-actions {
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 60px;
  background-color: #fff;
  z-index: 10;
}
</style>
