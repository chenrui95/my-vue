<template>
  <!--
    种类分为：
    自制菜、外卖、外食、零食和点心、奶茶咖啡饮料  种类也可以新增，新增的可以删除和修改，需要设置默认图片和key（都是必填）
    具体内容可以有：图片、名称、价格、卡路里、食材、菜谱链接、评价等
    可以给菜单加喜欢和放纵餐标记功能，推荐时喜欢中的优先级更高，可以筛选我喜欢的菜单，放纵餐
  -->
  <div>
    <header style="display: flex; justify-content: space-between;">
      <div>
        <el-tag
          v-for="(category) in categories"
          :key="category.key"
          :style="`margin-right: 8px; cursor: pointer; ${showType.includes(category.key) ? 'color: #fff' : ''}`"
          :color="showType.includes(category.key) ? '#409EFF' : ''"
          @click="selectType(category.key)"
          >
          {{ category.name }}
        </el-tag>
        <el-tooltip content="管理分类">
          <el-button icon="el-icon-setting" circle size="small"></el-button>
        </el-tooltip>
      </div>
      <div>
        <el-button :type="!showFavorite && !showIndulge? 'primary' : ''" size="small" round @click="getList(false, false)">全部</el-button>
        <el-button :type="showFavorite? 'primary' : ''" icon="el-icon-favorite" size="small" round @click="getList(!showFavorite, showIndulge)">我喜欢的</el-button>
        <el-button :type="showIndulge? 'primary' : ''" icon="el-icon-indulge" size="small" round @click="getList(showFavorite, !showIndulge)">放纵餐</el-button>
      </div>
    </header>
    <div class="list-wrapper">
      <div class="add-item" @click="showAdd = {visible: true}">
        <div><i class="el-icon-plus" /></div>
        新增
      </div>
      <DataCard @contextmenu="onShowMenu" class="food-item" v-for="(item) in list" :key="item.id"
      :data="{...item, img: item.img || categories.find(c => c.key === item.category).img}" :columns="columns">
        <div class="actions">
          <i v-if="item.favorite" class="el-icon-favorite" @click="favoriteItem(item.id, true)" />
          <i v-else class="el-icon-un-favorite" @click="favoriteItem(item.id, false)" />
          <i v-if="item.indulge" class="el-icon-indulge" @click="indulgeItem(item.id, true)" />
          <i v-else class="el-icon-un-indulge" @click="indulgeItem(item.id, false)" />
        </div>
      </DataCard>
    </div>
    <div v-clickoutside="hideMenu" ref="menu" v-if="showMenu" class="action-menu" :style="`top: ${showMenu.y}px; left: ${showMenu.x}px;`">
      <div @click="editItem(showMenu.data)" >
        <i class="el-icon-edit" />编辑
      </div>
      <div  @click="deleteItem(showMenu.data.id)">
        <i class="el-icon-delete" />删除
      </div>
    </div>

    <FoodModal :visible="showAdd.visible" :data="showAdd.item" @cancel="showAdd = {visible: false}" @confirm="submitAdd"></FoodModal>
  </div>
</template>

<script>
import DataCard from '../../components/DataCard.vue'
import FoodModal from './FoodModal.vue'

export default {
  data () {
    return {
      showFavorite: false,
      showIndulge: false,
      showType: [],
      showMenu: false,
      showAdd: {visible: false},
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
      ],
      list: [
        {name: '西红柿炒蛋',
          id: 1,
          category: 'cook',
          price: 10,
          calorie: 100,
          material: [{id: 1, amount: '1个'}],
          recipe: 'https://www.xiachufang.com/recipe/1023133/',
          comment: '超好吃的菜，推荐！',
          favorite: true,
          img: 'https://materials.cdn.bcebos.com/images/19250972/d1ae0cc3172937554dc085b8950afe11.jpeg'
        },
        {
          name: '大盘鸡',
          id: 2,
          category: 'takeaway',
          indulge: true
        },
        {
          name: '喜来稀肉',
          id: 3,
          category: 'restaurant'
        },
        {
          name: '薯片',
          id: 4,
          category: 'snacks'
        },
        {
          name: '霸王茶姬',
          id: 5,
          category: 'drinks'
        },
        {
          name: '啥东西',
          id: 6,
          category: 'custom'
        }
      ],
      columns: [
        {key: 'calorie', label: '卡路里', default: '未知'}
      ]
    }
  },
  methods: {
    selectType (type) {
      const index = this.showType.indexOf(type)
      if (index > -1) {
        this.showType.splice(index, 1)
      } else {
        this.showType.push(type)
      }
      this.getList(this.showFavorite, this.showIndulge)
    },
    getList (favorite, indulge) {
      this.showFavorite = favorite
      this.showIndulge = indulge
      // 根据分类(showType)\喜欢\放纵获取菜单列表
    },
    favoriteItem (id, flag) {

    },
    indulgeItem (id, flag) {

    },
    onShowMenu (data, event) {
      this.showMenu = {data, x: event.clientX, y: event.clientY}
    },
    editItem (item) {
      this.showMenu = false
      // 打开弹窗
      this.showAdd = {visible: true, item}
    },
    deleteItem (id) {
      this.showMenu = false
      // 删除菜单
    },
    hideMenu () {
      this.showMenu = false
    },
    submitAdd (item) {
      console.log(item)
      if (this.showAdd.item) {
        // 编辑
      } else {
        // 新增
      }
      this.showAdd = {visible: false}
    }
  },
  components: {
    DataCard,
    FoodModal
  }
}
</script>

<style scoped>
.add-item {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.list-wrapper {
  padding: 12px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 120px);
  grid-gap: 12px;
}
.food-item {
  position: relative;
}
.food-item:hover .actions {
  display: block;
}
.actions {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 4px;
}

.action-menu {
  position: fixed;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: black;
  color: #fff;
}
.action-menu div {
  padding: 8px;
  border-bottom: 1px solid #dcdfe6;
  cursor: pointer;
}
.action-menu div i {
  margin-right: 4px;
}
.action-menu:nth-last-child() {
  border-bottom: none;
}
/deep/.el-icon-favorite, /deep/.el-icon-indulge, /deep/.el-icon-un-indulge, /deep/.el-icon-un-favorite {
  cursor: pointer;
}
</style>
