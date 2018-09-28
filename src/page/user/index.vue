<template>
  <div>
    <group>
      <cell title="返回上一页" :is-link="true" link="/"></cell>
    </group>
    <group>
      <cell :title="title">
        <marquee>
          <marquee-item v-for="i in 5" :key="i" @click.native="onClick(i)">{{i}}</marquee-item>
        </marquee>
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Marquee, MarqueeItem } from 'vux'
export default {
  data () {
    return {
      msg: '第二界面加载',
      title: '公告'
    }
  },
  mounted () {
    // 组件创建完后获取数据
    this.getUser()
  },
  methods: {
    getUser () {
      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
        headers: {
 
        },
        emulateJSON: true
      }).then(function(response) {
        // 这里是处理正确的回调
  
          let articles = response.data.subjects
          // this.articles = response.data["subjects"] 也可以
          console.log(articles)
      }, function(response) {
          // 这里是处理错误的回调
          console.log(response)
      })
    }
  },
  components: {
    Group,
    Cell,
    Marquee,
    MarqueeItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
