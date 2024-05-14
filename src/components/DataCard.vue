<template>
  <div class="data-card" @contextmenu.prevent.stop="$emit('contextmenu', data, $event)" @click="$emit('click', data, $event)">
    <el-image style="height: 100px; width: 100%" :src="data.img" fit="cover">
    </el-image>
    <div>{{ data[nameKey] }}</div>
    <el-row style="margin-top: 4px;">
      <el-col v-for="item in columns" :key="item.key" :span="item.span || 24"
        style="color: #7d6f6f;">
        <span v-if="item.label">{{ item.label }}：</span>
        {{ item.render ? item.render(data[item.key], data) : data[item.key] === undefined ?
      item.default : data[item.key] }}
      </el-col>
    </el-row>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    data: { required: true },
    columns: {},
    nameKey: { default: 'name' }
  }
};
</script>

<style scoped>
.data-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 8px;
  transition: scale 0.3s ease;
}

.data-card:hover {
  scale: 1.05;
}
</style>
