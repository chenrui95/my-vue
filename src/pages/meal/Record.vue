<template>
  <!--
    记录图片、名称、日期、卡路里、价格，可以选食材里的也可以选菜单里的，也可以自己新增食材或菜单（新增时填到对应页面）
    最上面添加一行卡片，有个按钮可以随机生成要吃的菜，展示今天已摄入的卡路里和今天的总金额，今天的日期都可以展示
    如果有计划的饮食，可以展示为卡片
    要有计划饮食功能
  -->
  <div>
    <RecordHeader :foodPlan="selectedFoods" />
    <div>
      <div style="margin: 12px 0">
        <el-button type="primary" size="small" @click="openRecordModal()">记录饮食</el-button>
        <el-button type="primary" size="small" @click="openPlanModal">规划饮食</el-button>
        <el-date-picker style="margin-left: 12px;" size="small" v-model="dateRange" type="daterange"
          align="right" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          unlink-panels :picker-options="pickerOptions" value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>

      <el-collapse>
        <el-collapse-item v-for="record in records" :title="record.date" :name="record.date"
          :key="record.date">
          <div class="total-info">
            <span>总卡路里：</span>
            <span style="padding-right: 25px;">{{ record.foods.some(item => !item.calorie) ? '未知' :
      record.foods.reduce((acc, cur) => acc + (cur.calorie || 0), 0) }}</span>
            <span>总花费：</span>
            <span style="padding-right: 25px;">{{ record.foods.some(item => !item.price) ? '未知' :
      record.foods.reduce((acc, cur) => acc + (cur.price || 0), 0) }}</span>
            <span>零食：</span><span :style="`color: ${record.snacks ? '#d9534f' : '#b688c8'}`">{{
      record.snacks ? '有' : '没有' }}</span>
          </div>
          <div class="food-list">
            <div class="food-item" v-for="item in record.foods" :key="item.id">
              <div class="title">{{ item.name }}
                <el-button @click="openRecordModal({ ...item, date: new Date(record.date) })" circle
                  size="small" icon="el-icon-edit" style="margin-left: 8px;" />
              </div>
              <el-image v-if="item.img" style="height: 100px; width: 100%" :src="item.img"
                fit="cover">
              </el-image>
              <div v-if="item.desc" class="name">{{ item.desc }}</div>
              <div><span class="label">卡路里：</span>{{ item.calorie || '未知' }}</div>
              <div><span class="label">价格：</span>{{ item.price || '未知' }}</div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <Modal title="记录饮食" :visible="showRecord" :showFooter="false" @cancel="closeRecordModal"
      width="500px">
      <el-form ref="recordForm" :model="recordForm" label-width="80px">
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="recordForm.date" type="date" placeholder="选择日期"
            :clearable="false" style="width: 250px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="类型" prop="name">
          <el-select v-model="recordForm.name" placeholder="请选择类型" style="width: 250px;">
            <el-option v-for="item in ['早餐', '午餐', '晚餐', '宵夜', '上午加餐', '下午加餐']" :key="item"
              :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡路里" prop="calorie">
          <el-input-number v-model="recordForm.calorie" :min="0"
            style="width: 250px; margin-right: 8px;" />大卡
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="recordForm.price" :min="0"
            style="width: 250px; margin-right: 8px;" />元
        </el-form-item>
        <el-form-item label="详情" prop="desc">
          <el-input type="textarea" v-model="recordForm.desc" placeholder="请输入详情"
            style="width: 250px;"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload class="el-uploader" action="" :beforeUpload="beforeUpload"
            :file-list="fileList" accept=".jpg,.png,.jpeg,.gif">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <footer style="text-align: right;">
        <el-button size="small" type="primary" @click="handleRecordSubmit(false)">保存</el-button>
        <el-button size="small" type="primary" @click="handleRecordSubmit(true)"
          v-if="showRecord === 'new'">保存并继续</el-button>
      </footer>
    </Modal>

    <Modal title="规划饮食" :visible="showPlanModal" @cancel="closePlanModal" @confirm="confirmPlan"
      width="400px">
      <el-form ref="form" :model="planForm" label-width="80px" :rules="rules">
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="planForm.date" type="date" :pickerOptions="{ disabledDate }"
            placeholder="选择日期" style="width: 250px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="食材" prop="foods">
          <el-cascader v-model="planForm.foods" placeholder="请选择食材" :options="options"
            style="width: 250px;" :show-all-levels="false" filterable :props="{ multiple: true }"
            collapse-tags></el-cascader>
        </el-form-item>
      </el-form>
    </Modal>
  </div>
</template>

<script>
import RecordHeader from './RecordHeader.vue';
import Modal from '@/components/Modal.vue';
import { sameDay } from '@/utils';

export default {
  data() {
    return {
      showPlanModal: false,
      selectedFoods: [],
      fileList: [],
      planForm: {
        date: '',
        foods: []
      },
      recordForm: {
        date: new Date(),
        img: '',
        name: '',
        desc: '',
        calorie: null,
        price: null
      },
      showRecord: false,
      dateRange: [new Date(), new Date()],
      rules: {
        date: [
          { required: true, message: '请选择日期' }
        ],
        foods: [
          { required: true, message: '请选择食材' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      columns: [
        { key: 'calorie', label: '卡路里', default: '未知' }
      ],
      records: [
        {
          date: '2024-05-02',
          snacks: true,
          foods: [{
            img: 'https://materials.cdn.bcebos.com/images/19250972/d1ae0cc3172937554dc085b8950afe11.jpeg',
            calorie: 456,
            price: 9.9,
            name: '早餐',
            id: 1
          },
          {
            desc: '炒饭',
            calorie: 300,
            price: 12.9,
            name: '午餐',
            id: 2
          },
          {
            desc: '水果',
            calorie: 300,
            price: 12.9,
            name: '上午茶',
            id: 3
          },
          {
            desc: '水果',
            calorie: 300,
            price: 12.9,
            name: '下午茶',
            id: 4
          },
          {
            desc: '烤鸭',
            img: 'https://materials.cdn.bcebos.com/images/19250972/d1ae0cc3172937554dc085b8950afe11.jpeg',
            calorie: 500,
            price: 15.9,
            name: '晚餐',
            id: 5
          }]
        },
        {
          date: '2024-05-01',
          foods: [{
            img: 'https://materials.cdn.bcebos.com/images/19250972/d1ae0cc3172937554dc085b8950afe11.jpeg',
            calorie: 456,
            price: 9.9,
            name: '早餐',
            id: 6
          },
          {
            desc: '炒饭',
            calorie: 300,
            name: '午餐',
            id: 7
          },
          {
            desc: '烤鸭',
            img: 'https://materials.cdn.bcebos.com/images/19250972/d1ae0cc3172937554dc085b8950afe11.jpeg',
            price: 15.9,
            name: '晚餐',
            id: 8
          }]
        }
      ],
      options: [
        {
          value: 'food',
          label: '饮食',
          children: [{
            value: 1,
            label: '西红柿炒蛋',
            img: 'https://materials.cdn.bcebos.com/images/19250972/d1ae0cc3172937554dc085b8950afe11.jpeg'
          }, {
            value: 2,
            label: '红烧肉',
            img: 'https://img95.699pic.com/photo/50048/1100.jpg_wh860.jpg'
          }]
        },
        {
          value: 'material',
          label: '食材',
          children: [
            { value: 3, label: '豆腐' },
            { value: 4, label: '豆角' },
            { value: 5, label: '豆瓣酱' }
          ]
        }
      ]
    };
  },
  methods: {
    disabledDate(date) {
      return date.getTime() < new Date().getTime() - 8.64e7; // 86400000ms = 1天
    },
    formatSelected(type) {
      return this.planForm.foods.filter(item => item[0] === type).map((item) => {
        const list = this.options.find(option => option.value === type).children;
        const target = list.find(child => child.value === item[1]);
        return {
          ...target,
          id: target.value,
          name: target.label
        };
      });
    },
    closePlanModal() {
      this.showPlanModal = false;
    },
    openPlanModal() {
      this.showPlanModal = true;
    },
    confirmPlan() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // TODO: 保存数据到服务器
          this.$message.success('保存成功');
          if (sameDay(this.planForm.date, new Date())) {
            // TODO: 刷新页面
            const foods = this.formatSelected('food');
            const materials = this.formatSelected('material');
            this.selectedFoods = [{ type: 'food', list: foods }, { type: 'material', list: materials }];
          }
          this.planForm = {
            date: '',
            foods: []
          };
          this.showPlanModal = false;
        }
      });
    },
    openRecordModal(item) {
      if (item) {
        this.showRecord = 'edit';
        this.recordForm = item;
      } else {
        this.showRecord = 'new';
      }
    },
    closeRecordModal() {
      this.showRecord = false;
      this.recordForm = {
        date: new Date(),
        img: '',
        name: '',
        desc: '',
        calorie: null,
        price: null
      };
    },
    beforeUpload(file) {
      this.fileList = [file];
      return false;
    },
    handleRecordSubmit(continueFlag) {
      // TODO: 保存数据到服务器并刷新
      if (!continueFlag) {
        this.showRecord = false;
      }
      this.recordForm = {
        date: this.recordForm.date,
        img: '',
        name: '',
        desc: '',
        calorie: null,
        price: null
      };
      this.fileList = [];
      this.$message.success('保存成功');
    }
  },
  watch: {
    dateRange(val) {
      console.log(val);
      // TODO: 刷新页面
    }
  },
  components: {
    RecordHeader,
    Modal
  }
};

</script>

<style scoped lang="less">
.total-info {
  font-weight: bold;
  color: #b688c8;
  font-size: 16px;
}

.food-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 12px;

  .food-item {
    border: solid 1px #eee;
    padding: 8px;
    border-radius: 4px;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 8px;
  }

  .name {
    font-weight: 500;
  }

  .label {
    color: #666;
  }
}
</style>
