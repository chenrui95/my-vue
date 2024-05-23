<template>
  <Modal :visible="visible" title="向你推荐" @cancel="$emit('cancel')" confirmText="就吃这个" width="500px"
    :showCancel="false" @confirm="$emit('confirm', randomFood)">
    <template v-slot:actions>
      <el-button @click="getRandomFood">换一个</el-button>
    </template>
    <div v-loading="!randomFood">
      <div v-if="randomFood && randomFood.type === 'food'">
        <div v-for="(item) in randomFood.list" :key="item.id">
          <el-row style="display: flex; align-items: center;" :gutter="20">
            <el-col :span="8">
              <img :src="item.img" style="width: 100%" />
            </el-col>
          </el-row>
          <el-row style="margin-top: 12px;">
            <el-col :span="8" style="margin-bottom: 8px;">
              <span class="label">价格：</span>
              {{ item.price }}
            </el-col>
            <el-col :span="8" style="margin-bottom: 8px;">
              <span class="label">卡路里：</span>
              {{ item.calorie }}
            </el-col>
            <el-col :span="24" style="margin-bottom: 8px;">
              <span class="label">食材：</span>
              <el-tag size="small" v-for="(material, index) in item.material" :key="index">
                根据接口获取list然后按id获取name
              </el-tag>
            </el-col>
            <el-col :span="12" style="margin-bottom: 8px;">
              <span class="label">评论：</span>
              {{ item.comment }}
            </el-col>
            <el-col :span="24" style="margin-bottom: 8px;">
              <span class="label">食谱：</span>
              <span class="link-like" @click="viewRecipe">{{ item.recipe }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-else-if="randomFood && randomFood.type === 'material'">
        <el-tag v-for="(item) in randomFood.list" :key="item.id" style="margin-right: 12px;">
          {{ item.name }}
        </el-tag>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
export default {
  data() {
    return {
      randomFood: null
    };
  },
  components: {
    Modal
  },
  props: {
    visible: Boolean
  },
  methods: {
    viewRecipe() {
      window.open(this.detail.recipe);
    },
    getRandomFood() {
      this.randomFood = [{
        type: 'food',
        list: [
          {
            name: '西红柿炒蛋',
            id: 1,
            price: 10,
            calorie: 100,
            material: [{ id: 1, amount: '1个' }],
            recipe: 'https://www.xiachufang.com/recipe/1023133/',
            comment: '超好吃的菜，推荐！',
            favorite: true,
            img: 'https://materials.cdn.bcebos.com/images/19250972/d1ae0cc3172937554dc085b8950afe11.jpeg'
          }
        ]
      },
      {
        type: 'material',
        list: [
          { name: '牛肉', gi: 70, calorie: 200, id: 3 },
          { name: '鸡蛋', gi: 100, calorie: 100, id: 4 }
        ]
      }
      ][Math.floor(Math.random() * 2)];
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getRandomFood();
      }
    }
  },
  created() {
    this.getRandomFood();
  }
};
</script>
