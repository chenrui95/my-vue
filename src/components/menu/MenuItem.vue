<template>
  <ul class="menu-item-wrapper">
    <li @click="$emit('clickItem', menu)">
      <div :class="['item-content', theme || 'dark', {selected: $route.path === menu.link}]">
        <span>{{ menu.title }}</span>
        <span v-if="menu.children && menu.children.length">{{
          extendIds.includes(menu.id)? '▲' : '▼'
        }}</span>
      </div>
    </li>
    <div v-if="menu.children && menu.children.length && extendIds.includes(menu.id)">
      <menu-item @clickItem="$emit('clickItem', child)" v-for="child in menu.children" :menu="child" :key="child.title" :theme="theme" />
    </div>
    </ul>
  </template>

<script>
export default {
  name: 'menu-item',
  props: ['menu', 'extendIds', 'theme']
}
</script>

<style scoped>
.item-content {
  cursor: pointer;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
}

.dark:hover, .dark.selected {
  background-color: #384677;
}

.light:hover, .light.selected {
  background-color: antiquewhite;
}

li {
  list-style: none;
}

.menu-item-wrapper {
  padding-left: 8px;
}
</style>
