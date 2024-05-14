<template>
  <el-drawer :destroy-on-close="true" :visible="visible" :title="data ? '编辑' : '新增'" size="800px" @close="closeForm">
    <div style="width: 800px; padding-right: 20px;">
      <el-form v-footer-top :model="form" ref="form" label-width="80px" :rules="rules">
        <el-form-item label="名称" required prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="卡路里" prop="calorie">
          <el-input-number v-model="form.calorie" placeholder="请输入卡路里" style="margin-right: 10px"></el-input-number> 大卡/100g
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="form.price" placeholder="请输入价格" style="margin-right: 10px"></el-input-number> 元/份
        </el-form-item>
        <el-form-item label="图片">
          <el-upload class="el-uploader" action="" :beforeUpload="beforeUpload" :file-list="fileList" accept=".jpg,.png,.jpeg,.gif">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="食材">
          <div @click="showDrawer = true" class="link-like">去选择</div>
          {{ selectedStr }}
        </el-form-item>
        <el-form-item label="链接" prpp="link">
          <el-input v-model="form.link" placeholder="请输入连接"></el-input>
        </el-form-item>
        <el-form-item label="评价" prop="description">
          <el-input type="textarea" rows="2" v-model="form.description" placeholder="请输入评价"></el-input>
        </el-form-item>
      </el-form>
      <footer class="footer-actions">
        <el-button @click="closeForm">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </footer>
    </div>

    <el-drawer :show-close="false" :visible="showDrawer" title="选择食材" :append-to-body="true" size="800px">
      <div style="padding: 0 12px;">
        <Material :selectMode="true" :selected="selected" @select="selectMaterial"  @confirm="() => showDrawer = false"/>
      </div>
    </el-drawer>
  </el-drawer>
</template>

<script>
import Material from './Material.vue';
export default {
  name: 'FoodModal',
  components: {
    Material
  },
  props: ['visible', 'data'],
  data () {
    return {
      form: {},
      fileList: [],
      rules: {
        name: [{ required: true, message: '请输入名称' }]
      },
      showDrawer: false,
      selected: []
    };
  },
  watch: {
    data (newVal) {
      if (newVal) {
        this.form = newVal;
        this.selected = newVal.materials || [];
      } else {
        this.initForm();
      }
    }
  },
  methods: {
    beforeUpload (file) {
      console.log(file);
      this.fileList = [file];
      return false;
    },
    initForm () {
      this.form = {
        img: '',
        name: '',
        price: '',
        calorie: '',
        link: '',
        description: ''
      };
    },
    closeForm () {
      this.$emit('cancel');
      this.initForm();
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('confirm', {
            ...this.form,
            img: this.fileList[0],
            materiels: this.selected
          });
        }
      });
    },
    selectMaterial (materiel) {
      if (Array.isArray(materiel)) {
        this.selected = materiel;
        return;
      }
      const index = this.selected.indexOf(materiel.id);
      if (index === -1) {
        this.selected.push(materiel.id);
      } else {
        this.selected.splice(index, 1);
      }
    }
  },
  created () {
    this.initForm();
  },
  computed: {
    selectedStr () {
      // TODO: 根据列表获取name
      return this.selected.join('/');
    }
  }
};
</script>
