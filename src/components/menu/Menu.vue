<template>
  <div :class="['menu-wrapper', theme || 'dark']">
      <MenuItem @clickItem="clickItem" v-for="(menu, index) in menus" :key="index" :menu="menu" :extendIds="extendIds" :theme="theme"  />
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
export default {
  name: 'Menu',
  data () {
    return {
      extendIds: [],
      selectedId: -1
    };
  },
  methods: {
    clickItem (menu) {
      const extended = this.extendIds.includes(menu.id);
      const children = menu.children ? menu.children.map(child => child.id) : [];
      if (extended) {
        this.extendIds = this.extendIds.filter(id => ![menu.id, ...children].includes(id));
      } else {
        this.extendIds.push(menu.id, ...children);
      }
      this.$emit('clickMenu', menu);
    }
  },
  props: ['menus', 'theme'],
  components: {MenuItem}
};
</script>

<style scoped>
.menu-wrapper {
  height: 100%;
  width: 200px;
  padding: 8px;
}

.dark {
  background-color: #21232b;
  color: rgba(255, 255, 255, 0.65);
}

.light {
  border-right: solid 1px rgba(0, 0, 0, 0.12);
}
</style>
