<template>
  <div class="tab">
    <tabbar v-model="checked">
      <tabbar-item>
        <img slot="icon" v-if="checked === 0" src="../assets/img/home_icon_active.png">
        <img slot="icon" v-else src="../assets/img/home_icon.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" v-if="checked === 1" src="../assets/img/gift_icon_active.png">
        <img slot="icon" v-else src="../assets/img/gift_icon.png">
        <span slot="label">任务</span>
      </tabbar-item>
      <tabbar-item link="/user/index">
        <img slot="icon" v-if="checked === 2" src="../assets/img/user_icon_active.png">
        <img slot="icon" v-else src="../assets/img/user_icon.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script type="text/javascript">
import { Tabbar, TabbarItem } from 'vux'
export default {
  data () {
    return {
      title: 'tab'
    }
  },
  props: {
    checked: Number
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped>
.weui-tabbar{
  background-color:#fff;
  position:fixed;
}
.weui-tabbar:before{
  border:none;
}
</style>
