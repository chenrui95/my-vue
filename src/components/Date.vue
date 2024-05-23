<template>
  <div :class="className">{{ date }}</div>
</template>

<script>
import { getDate } from '@/utils';
export default {
  data() {
    return {
      date: getDate(),
      interval: null
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = getDate();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  props: {
    className: { type: String }
  }
};
</script>
