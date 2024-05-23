<template>
  <!-- TODO: 点击cancel和closeBtn应该抛出不同的事件 -->
  <el-dialog :title="title" :visible="visible" :width="width" @close="$emit('cancel')"
    v-bind="$attrs">
    <slot></slot>
    <span slot="footer" class="dialog-footer" v-if="showFooter">
      <slot name="actions"></slot>
      <el-button v-if="showCancel" @click="$emit('cancel')">{{ cancelText }}</el-button>
      <el-button v-if="showConfirm" type="primary" @click="$emit('confirm')">{{ confirmText
        }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'my-modal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50%'
    },
    confirmText: {
      type: String,
      default: '确 定'
    },
    cancelText: {
      type: String,
      default: '取 消'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  }
};
</script>
