<template>
  <div>
    <div style="margin-bottom: 12px;">
      <div style="width: 20px; height: 20px; display: inline-block; margin-right: 12px" class="btn-like" @click="$router.push('/meal/food')">
        <i class="el-icon-back" />
      </div>
      <el-button type="primary" @click="showModal = {visible: true}">新增分类</el-button>
    </div>
    <el-table
    :data="categories"
    border
    stripe
    style="width: 100%">
    <el-table-column
      label="名称" prop="name">
    </el-table-column>
    <el-table-column
      label="key"
      prop="key">
    </el-table-column>
    <el-table-column
      label="默认图片"
      >
      <slot slot-scope="scope">
        <img :src="scope.row.img" style="width: 50px">
      </slot>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Modal :title="showModal.data? '编辑分类' : '新增分类'" :visible="showModal.visible" :data="showModal.data" @cancel="closeModal" @confirm="handleSubmit">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name" required>
        <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="key" prop="key" required>
        <el-input v-model="form.key" placeholder="请输入分类key"></el-input>
      </el-form-item>
      <!-- 编辑时图片非必填 -->
      <el-form-item label="默认图片" :required="!showModal.data">
        <el-upload class="el-uploader" action="" :beforeUpload="beforeUpload" :file-list="fileList" accept=".jpg,.png,.jpeg,.gif">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal';
export default {
  name: 'FoodDetail',
  components: {Modal},
  data () {
    return {
      showModal: {visible: false},
      form: {name: '', key: ''},
      rules: {
        name: [{ required: true, message: '请输入分类名称' }],
        key: [{ required: true, message: '请输入分类key' }]
      },
      fileList: [],
      categories: [
        {name: '自制菜', key: 'cook', img: 'https://big.justeasy.cn/effect/202105/20210504142006_6090e796e30d3.jpg'},
        {name: '外卖',
          key: 'takeaway',
          img: 'https://p1.ifengimg.com/2019_05/D7EA7CC764D654C4ACA444ABD4838478C1039140_w1280_h720.jpg'},
        {name: '外食',
          key: 'restaurant',
          img: 'https://img95.699pic.com/photo/50048/1100.jpg_wh860.jpg'},
        {name: '零食',
          key: 'snacks',
          img: 'https://img.zcool.cn/community/0157d85d737b85a8012060be87d34d.jpg@2o.jpg'},
        {name: '饮料', key: 'drinks', img: 'https://img95.699pic.com/photo/50053/8275.jpg_wh300.jpg!/fh/300/quality/90'},
        {name: '自定义',
          key: 'custom',
          custom: true,
          img: 'https://img95.699pic.com/photo/50096/6083.jpg_wh860.jpg'}
      ]
    };
  },
  methods: {
    handleEdit (data) {
      this.showModal = {visible: true, data};
      this.form = data;
    },
    beforeUpload (file) {
      this.fileList = [file];
      return false;
    },
    closeModal () {
      this.showModal = {visible: false};
      this.form = {name: '', key: ''};
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        // 只有新增时图片才必填，编辑时不必填
        if (!this.fileList.length && !this.showModal.data) {
          this.$message({
            type: 'error',
            message: '请上传默认图片'
          });
          return;
        }
        if (valid) {
          // TODO: 要提交给接口
          console.log(this.form, this.fileList);
          this.closeModal();
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
