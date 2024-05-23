<template>
  <div>
    <el-collapse v-footer-top="selectMode" v-model="activeNames">
      <el-collapse-item class="category" v-for="category of categories" :key="category.name"
        :title="category.title" :name="category.name">
        <div class="card-wrapper">
          <div :class="`material-card ${selected && selected.includes(material.id) ? 'active' : ''}`"
            v-for="material of materials[category.name]" @mouseenter="hoverItem(material, $event)"
            @mouseleave="leaveItem" @click="$emit('select', material)" :key="material.id">
            <div style="font-weight: 500;">{{ material.name }}</div>
            <div style="display: flex; justify-content: space-between;">
              <span>GI值：{{ material.gi }}</span>
              <span>热量值：{{ material.calorie }}</span>
            </div>
            <div v-if="!selectMode" class="actions">
              <el-button type="primary" icon="el-icon-edit" circle
                @click="onShowModal(material)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle
                @click="deleteModal = material.id"></el-button>
            </div>
            <div
              :style="`border-right-color: ${getColor(material.gi)}; border-top-color: ${getColor(material.gi)}`"
              class="mark"></div>
            <div class="description" v-if="showDesc === material.id">{{ material.description }}</div>
          </div>
          <div v-if="!selectMode" class="material-card plus-card" @click="onShowModal()">+</div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <footer class="footer-actions" v-if="selectMode">
      <el-button type="success" @click="random()">随机生成</el-button>
      <el-button type="primary" @click="$emit('confirm')">确认</el-button>
    </footer>
    <Modal :visible="modal.visible" :title="modal.item ? '编辑' : '新增'" @cancel="closeModal"
      @confirm="submitModal">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="GI值">
          <el-input-number v-model="form.gi" :min="1" placeholder="请输入"></el-input-number>
        </el-form-item>
        <el-form-item label="热量">
          <el-input-number v-model="form.calorie" :min="1" placeholder="请输入"></el-input-number>
          大卡/100g
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :rows="2" v-model="form.description"
            placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </Modal>
    <Modal width="300px" title="确认删除" :visible="deleteModal !== -1" @cancel="deleteModal = -1"
      @confirm="deleteItem">
      删除后数据将不可恢复，请确认是否删除
    </Modal>
  </div>
</template>

<script>
import Modal from '../../components/Modal.vue';
export default {
  data() {
    return {
      activeNames: ['vegetables', 'fruits', 'carbon', 'meat'],
      categories: [
        { title: '蔬菜', name: 'vegetables' },
        { title: '肉蛋奶', name: 'meat' },
        { title: '碳水', name: 'carbon' },
        { title: '水果', name: 'fruits' }
      ],
      materials: {
        vegetables: [
          { name: '白菜', gi: 10, calorie: 100, description: '营养价值较高，适合于补充蔬菜营养。', id: 1 },
          { name: '黄瓜', gi: 80, calorie: 100, id: 2 }],
        meat: [
          { name: '牛肉', gi: 70, calorie: 200, id: 3 },
          { name: '鸡蛋', gi: 100, calorie: 100, id: 4 }
        ],
        carbon: [
          { name: '豆浆', gi: 30, calorie: 100, id: 5 },
          { name: '玉米淀粉', gi: 50, calorie: 100, id: 6 }],
        fruits: [
          { name: '苹果', gi: 100, calorie: 100, id: 7 },
          { name: '香蕉', gi: 60, calorie: 100, id: 8 },
          { name: '香蕉', gi: 60, calorie: 100, id: 9 },
          { name: '香蕉', gi: 60, calorie: 100, id: 10 },
          { name: '香蕉', gi: 60, calorie: 100, id: 11 }
        ]
      },
      showDesc: '',
      modal: { visible: false },
      deleteModal: -1,
      rules: {
        name: [{ required: true, message: '请输入' }],
        gi: [{ required: true, message: '请输入' }],
        calorie: [{ required: true, message: '请输入' }]
      },
      form: {
        name: '',
        gi: 0,
        calorie: 0,
        description: ''
      }
    };
  },
  methods: {
    getColor(gi) {
      // 低于55是低GI食物
      return gi <= 55 ? '#f56c6c' : gi >= 70 ? '#67c23a' : 'transparent';
    },
    hoverItem(item) {
      if (item.description) {
        this.showDesc = item.id;
      }
    },
    leaveItem() {
      this.showDesc = '';
    },
    onShowModal(item) {
      this.modal.visible = true;
      this.modal.item = item;
      if (item) {
        this.form = item;
      }
    },
    closeModal() {
      this.modal = { visible: false };
      this.form = {
        name: '',
        gi: 0,
        calorie: 0,
        description: ''
      };
    },
    submitModal() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.closeModal();
        }
      });
    },
    deleteItem() {
      this.deleteModal = -1;
    },
    getRandomItem(list, count) {
      const length = list.length;
      const res = [];
      const insert = () => {
        const index = Math.floor(Math.random() * length);
        if (!res.includes(list[index])) {
          res.push(list[index]);
        } else {
          insert();
        }
      };
      new Array(count).fill('').forEach(() => {
        insert();
      });
      return res;
    },
    random() {
      const config = {
        vegetables: 2,
        meat: 1,
        carbon: 1,
        fruits: 1
      };
      const list = Object.keys(config).map(key => this.getRandomItem(this.materials[key], config[key])).flat();
      this.$emit('select', list.map(item => item.id));
      this.$message({
        message: `为你推荐${list.map(item => item.name).join('、')}。`,
        type: 'success'
      });
    }
  },
  components: {
    Modal
  },
  props: {
    selectMode: {
      type: Boolean,
      default: false
    },
    selected: {
    }
  }
};
</script>

<style scoped lang="less">
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 12px 0;
}

.material-card {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 160px;
  height: 48px;
  position: relative;
  padding: 4px 8px;
  margin: 0 12px 12px 0;
}

.active {
  border-color: #409eff;
}

.material-card .actions {
  display: none;
}

.material-card:hover .actions {
  position: absolute;
  top: 0;
  left: 0;
  width: 160px;
  height: 48px;
  display: block;
  padding: 4px 8px;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.plus-card {
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-style: dashed;
  cursor: pointer;
}

.mark {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border: solid 10px transparent;
  z-index: 2;
  border-radius: 4px;
}

.category {
  margin-bottom: 12px;
}

.category /deep/ .el-collapse-item__header {
  background-color: #f2f2f2;
  padding: 0 12px;
}

.category /deep/ .el-collapse-item__content {
  padding-bottom: 0;
}

.description {
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  top: 0;
  padding: 12px;
  left: 187px;
  width: 120px;
  border-radius: 4px;
  z-index: 4;
  color: #716f6f;
  background-image: linear-gradient(45deg, #c1dfc4 0%, #a5e9a0 100%);
}
</style>
