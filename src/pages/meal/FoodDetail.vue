<template>
  <el-drawer :visible="!!visible" title="详情" @close="$emit('cancel')" size="800px">
    <div style="padding: 16px;">
      <el-row style="display: flex; align-items: center;" :gutter="20">
        <el-col :span="8">
          <img :src="detail.img" style="width: 100%" />
        </el-col>
        <el-col :span="12" style="font-weight: 500; font-size: 20px">
          {{ detail.name }}
              <i v-if="detail.favorite" class="el-icon-favorite" />
              <i v-else class="el-icon-un-favorite" />
              <i v-if="detail.indulge" class="el-icon-indulge" />
              <i v-else class="el-icon-un-indulge"/>
      </el-col>
      </el-row>
      <el-row style="margin-top: 12px;">
        <el-col :span="8">
          <span class="label">分类：</span>
          {{ category.find(c => c.key === detail.category).label }}
        </el-col>
        <el-col :span="8">
          <span class="label">价格：</span>
          {{ detail.price }}
        </el-col>
        <el-col :span="8">
          <span class="label">卡路里：</span>
          {{ detail.calorie }}
        </el-col>
        <el-col :span="24">
          <span class="label">食材：</span>
          <el-tag size="small" v-for="(item, index) in detail.material" :key="index">
            根据接口获取list然后按id获取name
            <!-- {{ item.name }} -->
          </el-tag>
        </el-col>
        <el-col :span="12">
          <span class="label">评论：</span>
          {{ detail.comment }}
        </el-col>
        <el-col :span="24">
          <span class="label">食谱：</span>
          <!-- TODO: 用node根据链接获取网页的图片、描述等 -->
          <span class="link-like" @click="viewRecipe">{{ detail.recipe }}</span>
          <iframe v-if="detail.recipe" :src="detail.recipe" frameborder="0" width="100%" height="400px"></iframe>
        </el-col>

      </el-row>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'FoodDetail',
  data () {
    return {
      // TODO: 详情根据id从接口获取
      detail: {
        name: '西红柿炒蛋',
        id: 1,
        category: 'cook',
        price: 10,
        calorie: 100,
        material: [{id: 1, amount: '1个'}],
        recipe: 'https://www.xiachufang.com/recipe/103797341/',
        comment: '超好吃的菜，推荐！',
        favorite: true,
        img: 'https://materials.cdn.bcebos.com/images/19250972/d1ae0cc3172937554dc085b8950afe11.jpeg'
      },
      category: [{key: 'cook', label: '自制菜'}]
    }
  },
  methods: {
    viewRecipe () {
      window.open(this.detail.recipe)
    }
  },
  props: ['id', 'visible']
}
</script>

<style scoped lang="less">
.label {
  margin-bottom: 12px;
  display: inline-block;
  font-weight: 500;
  color:  #909399;
}

iframe {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
