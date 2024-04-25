<template>
  <!-- 运动可选项：游泳、羽毛球、跳操、跑步（跳操要细分）、走路也算吧
    最上面展示：本周的健身计划（已运动的话就展示已完成）心灵鸡汤
    长期的健身计划、运动的图表
    下面有添加计划按钮，可以查看计划的历史记录
    最下方是所有可选的运动列表，可以标记为喜欢，记录图片、名称、预计卡路里、链接
    展示运动记录：记录日期、时长、运动种类、消耗能量、评价
  -->
  <div>健身管理</div>
</template>

<script>
export default {
  data () {
    return {
      todoList: [
        {sport_id: 1, week: 1, done: true}
      ],
      sports: [
        {id: 1, name: '游泳', calorie: 1000, img: ''}
      ]
    }
  }
}
</script>
