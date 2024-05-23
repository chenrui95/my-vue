<!-- 1. 饮食记录页面，可以配置显示的卡片：今日计划、当前状态、饮食推荐&今天菜单，就往上堆....
饮食记录页面：展示最近几天的记录
饮食推荐设置：可选从已有菜单中推荐，或者食材推荐，也可两个都选
菜单推荐配置：是否我喜欢的优先级更高，放纵餐里的是否推荐，还是哪天可以推荐，推荐几个菜，推荐的种类（外卖、快餐、自制等）
随机食材设置：水果蔬菜碳水分别是什么数量 -->
<template>
  <div>
    <el-form :form="form" :rules="rules" label-width="120px">
      <el-divider content-position="left">饮食记录</el-divider>
      <el-form-item label="显示卡片" prop="recordCards">
        <el-checkbox-group v-model="form.recordCards">
          <el-checkbox label="今日计划"></el-checkbox>
          <el-checkbox label="当前状态"></el-checkbox>
          <el-checkbox label="饮食推荐&今日菜单"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="默认时间" prop="defaultDate">
        <el-select v-model="form.defaultDate">
          <el-option v-for="item in ['最近一周', '最近两周', '最近一个月', '最近三个月']" :key="item" :label="item"
            :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-divider content-position="left">饮食推荐</el-divider>
      <el-form-item label="推荐来源" prop="recommendSource">
        <el-checkbox-group v-model="form.recommendSource">
          <el-checkbox label="菜单"></el-checkbox>
          <el-checkbox label="食材"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="推荐种类" prop="recommendCategory">
        <el-checkbox-group v-model="form.recommendCategory">
          <el-checkbox label="外卖"></el-checkbox>
          <el-checkbox label="饭店"></el-checkbox>
          <el-checkbox label="自制"></el-checkbox>
          <el-checkbox label="零食"></el-checkbox>
          <el-checkbox label="饮料"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="食材数量" prop="foodCount">
        蔬菜：
        <el-input-number style="width: 90px;" v-model="form.foodCount.vegetables"
          controls-position="right" :min="0"></el-input-number>
        水果：
        <el-input-number style="width: 90px;" v-model="form.foodCount.fruits"
          controls-position="right" :min="0"></el-input-number>
        碳水：
        <el-input-number style="width: 90px;" v-model="form.foodCount.carbohydrates"
          controls-position="right" :min="0"></el-input-number>
        肉类：
        <el-input-number style="width: 90px;" v-model="form.foodCount.meat"
          controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="推荐放纵餐" prop="recommendIndulge">
        <el-switch v-model="form.recommendIndulge" active-text="推荐" inactive-text="不推荐">
        </el-switch>
      </el-form-item>
      <el-form-item label="喜爱的菜优先级" prop="favoriteFirst">
        <el-switch v-model="form.favoriteFirst" active-text="高" inactive-text="低">
        </el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        recordCards: ['今日计划', '当前状态', '饮食推荐&今日菜单'],
        recommendSource: ['菜单', '食材'],
        defaultDate: '最近一周',
        foodCount: { vegetables: 2, fruits: 1, carbohydrates: 1, meat: 1 },
        recommendIndulge: false,
        favoriteFirst: true,
        recommendCategory: ['外卖', '自制', '饭店']
      },
      rules: {
        // recommendSource: { required: true, message: '请至少选择一个推荐来源' }
      }

    };
  }
};
</script>
