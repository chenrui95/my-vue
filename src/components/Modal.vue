<template>
  <el-dialog
  :title="title"
  :visible="visible"
  :width="width"
  @close="$emit('cancel')">
  <slot></slot>
  <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('cancel')">取 消</el-button>
    <el-button type="primary" @click="$emit('confirm')">确 定</el-button>
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
    }
  }
};
</script>
