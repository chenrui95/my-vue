<template>
  <header class="header">
    <div class="current-state state-card">
      <Date className="crucial" />
      <div>已摄入：
        <span class="num" :style="'color:' + getColor('calorie')">
          {{ current.calorie }}
        </span>大卡
      </div>
      <div>总金额：<span class="num" :style="'color:' + getColor('price')">
          {{ current.price }}
        </span>元</div>
    </div>
    <div class="plan-card state-card">
      <div>
        <span class="crucial">近期计划</span>
        <el-button icon="el-icon-edit" circle v-if="plan" type="warning" size="small"
          style="margin-left: 8px;" @click="() => openPlanModal(plan)"></el-button>
      </div>
      <div v-if="plan">
        <div>今日可摄入<span class="num">{{ plan.calorie }}</span>大卡</div>
        <div>今日预计消费<span class="num">{{ plan.price }}</span>元</div>
      </div>
      <span v-else @click="() => openPlanModal()" class="crucial"
        style="position: absolute; top: 52px; left: 52px; color: #409EFF; cursor: pointer;">设置一个计划吧！</span>
    </div>
    <div :class="foodCardConf.type === 'recommend' ? 'recommend-list' : 'plan-list'"
      v-if="foodCardConf.type !== 'random'">
      <div class="list-btn">
        <div class="crucial">{{ foodCardConf.type === 'recommend' ? '向你安利' : '今日菜单' }}</div>
        <el-button round v-if="foodCardConf.type === 'recommend'" type="success"
          @click="showRandomModal = true">换一批</el-button>
      </div>
      <div class="food-list">
        <div v-for="(item) in foodCardConf.list" :key="item.type">
          <div style="display: flex;" v-if="item.type === 'food'">
            <div class="food-item" v-for="(food) in item.list" :key="food.id">
              <div style="border-radius: 4px; overflow: hidden;">
                <el-image style="width: 80px; height: 65px;" :src="food.img" fit="cover">
                </el-image>
              </div>
              <div> {{ food.name }}</div>
            </div>
          </div>
          <div
            style="display: grid; gap: 4px 8px;grid-template-columns: repeat(4, 1fr); min-width: 200px"
            v-else>
            <el-tag v-for="(me) in item.list" :key="me.id" size="small">
              {{ me.name }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
    <div v-if="foodCardConf.type === 'random'" class="random-btn" @click="showRandomModal = true">
      <span class="crucial" style="margin-bottom: 0; color: #409EFF">让我猜猜你想吃什么吧！</span>
    </div>

    <RandomModal :visible="showRandomModal" @cancel="showRandomModal = false"
      @confirm="acceptRecommend"></RandomModal>

    <Modal title="设置计划" :visible="showPlanModal" @cancel="showPlanModal = false" width="400px"
      @confirm="confirmPlan">
      <el-form :model="planForm" label-width="80px" ref="planForm">
        <el-form-item label="每日摄入">
          <el-input v-model.number="planForm.calorie" placeholder="请输入摄入大卡"
            style="width: calc(100% - 60px); margin-right: 10px;"></el-input>大卡
        </el-form-item>
        <el-form-item label="每日消费">
          <el-input v-model.number="planForm.price" placeholder="请输入消费金额"
            style="width: calc(100% - 60px); margin-right: 10px;"></el-input>元
        </el-form-item>
      </el-form>
    </Modal>
  </header>
</template>

<script>
import RandomModal from './RandomModal.vue';
import Modal from '@/components/Modal';
import Date from '@/components/Date.vue';

export default {
  data() {
    return {
      recommend: null,
      current: {
        calorie: 1200,
        price: 400
      },
      plan: null,
      showRandomModal: false,
      showPlanModal: false,
      planForm: { calorie: 2400, price: 100 }
    };
  },
  methods: {
    acceptRecommend(recommend) {
      // TODO: 推荐现在只做了推荐food或者material，后续要改成可以既要还要
      this.recommend = [recommend];
      this.showRandomModal = false;
    },
    confirmPlan() {
      this.showPlanModal = false;
      this.$refs.planForm.validate((valid) => {
        if (valid) {
          // TODO: 这里应该是发送请求保存计划
          this.plan = { ...this.plan, ...this.planForm };
          this.showPlanModal = false;
        }
      });
    },
    openPlanModal(form) {
      this.planForm = form || { calorie: 0, price: 0 };
      this.showPlanModal = true;
    }
  },
  components: {
    RandomModal,
    Modal,
    Date
  },
  computed: {
    foodCardConf() {
      if (this.plan && this.plan.foods && this.plan.foods.length) return { type: 'plan', list: this.plan.foods };
      if (this.recommend && this.recommend.length) return { type: 'recommend', list: this.recommend };
      return { type: 'random' };
    },
    getColor() {
      return (type) => {
        if (!this.plan || !this.plan[type] || !this.current || !this.current[type]) return '';
        if (this.current[type] <= this.plan[type]) {
          return '#75a83e';
        }
        return '#e86635';
      };
    }
  },
  props: {
    foodPlan: {
      required: false,
      type: Array
    }
  },
  watch: {
    foodPlan(v) {
      if (v && v.length) {
        this.plan = { ...this.plan, foods: v };
      }
    }
  }

};
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 130px;
}

.crucial {
  display: inline-block;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 12px;
}

.state-card {
  width: 250px;
  padding: 12px;
  margin-right: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.current-state {
  background-image: linear-gradient(to right bottom, #fcae5c 0%, #f3e31c 100%);

}

.plan-card {
  position: relative;
  background-image: linear-gradient(to right bottom, #dfcbff 0%, #fbc8d4 100%);
}

.num {
  padding: 0 4px;
  font-weight: 500;
  font-size: 18px;
}

.random-btn,
.recommend-list,
.plan-list {
  flex: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  display: flex;
  padding: 12px;

  .list-btn {
    width: 100px;
    border-right: solid 1px #e8e8e8;
  }
}

.food-list {
  display: flex;
  justify-content: flex-start;
  padding-left: 12px;
  width: calc(100% - 120px);
  overflow: auto;

  .food-item {
    margin-right: 8px;
    min-width: 80px;
    overflow: hidden;
  }
}

.recommend-list {
  background-image: linear-gradient(to right bottom, #d9afd9 0%, #97d9e1 100%);
}

.plan-list {
  background-image: linear-gradient(to right bottom, #21d4fd 0%, #d9b5ea 100%);
}

.random-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right bottom, #d9afd9 0%, #97d9e1 100%);
  color: #fff;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }
}
</style>
