<template>
  <div class="index" style="height:100%;">
    <view-box ref="viewBox">
    <flexbox class="search_box" :gutter="0">
      <x-address style="display:none;" :hide-district="provinceCityShow" @on-shadow-change="onShadowChange" @on-hide="searchClickHide" title="title" v-model="searchCityVal" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"></x-address>
      <flexbox-item :span="2"><group class="search_cell"><div @click="searchClick"><cell :title="cityVal" is-link :arrow-direction="'down'"></cell></div></group></flexbox-item>
      <flexbox-item :span="8"><input class="search_input" v-model="searchVal" placeholder="输入所要搜索的关键字"/></flexbox-item>
      <flexbox-item :span="2"><div class="search_btn" @click="searchResultChange">搜索</div></flexbox-item>
    </flexbox>
    <swiper :list="indexImgList"  @on-index-change="onIndexChange" :dots-position="'center'" :aspect-ratio="0.4" :auto="true" :show-desc-mask="false"></swiper>
    <grid :show-lr-borders="false" :show-vertical-dividers="false" class="act_box mb5">
      <grid-item link="/">
        <img slot="icon" src="../../assets/img/icon_tuijian.png">
        <span slot="label">任务推荐</span>
      </grid-item>
      <grid-item link="/">
        <img slot="icon" src="../../assets/img/icon_shop.png">
        <span slot="label">在线商城</span>
      </grid-item>
      <grid-item link="/">
        <img slot="icon" src="../../assets/img/icon_msg.png">
        <span slot="label">活动资讯</span>
      </grid-item>
      <grid-item link="/">
        <img slot="icon" src="../../assets/img/icon_ranking.png">
        <span slot="label">收益排行</span>
      </grid-item>
    </grid>
    <div class="activity_title">
      <div><i class="star_img"></i><span>活动推广</span></div>
    </div>
    <div class="activity_box clearfix">
      <div class="left">
        <!--
        <div class="t1 mt20 ml15">超级周末欢乐享</div>
        <div class="t2 mt15 ml15">长期活动</div>
        <div class="t3 mt20 ml15">预估收益5%</div>
        <x-button mini type="warn" style="margin-top:20px;margin-left:15px;padding-left:10px;padding-right:10px;">分享赚钱</x-button>
        -->
      </div>
      <div class="right">
        <div class="r_top clearfix">
          <!--
          <div class="t1 mt5 ml15">天天实惠</div>
          <div class="t3 mt5 ml15">预估收益3%</div>
          <x-button mini type="warn" style="margin-top:2px;margin-left:15px;padding-left:10px;padding-right:10px;">分享赚钱</x-button>
          -->
        </div>
        <div class="r_bottom clearfix">
          <!--
          <div class="t1 mt5 ml15">新实惠</div>
          <div class="t3 mt5 ml15">预估收益4%</div>
          <x-button mini type="warn" style="margin-top:2px;margin-left:15px;padding-left:10px;padding-right:10px;">分享赚钱</x-button>
          -->
        </div>
      </div>
    </div>
    <div class="activity_title mt10">
      <div><i class="star_img"></i><span>商品推广</span></div>
    </div>
    <sticky :check-sticky-support="false">
      <tab :line-width=2 active-color='#FF7878' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in listTab" @on-item-click="changeTab" :key="index">{{item}}</tab-item>
      </tab>
    </sticky>
    <div class="prod_box" v-for="(it, index) in listProd" :key="index">
      <flexbox :gutter="0">
        <flexbox-item :span="4">
          <div class="left">
            <img class="previewer-demo-img" :src="srcList[0].src" width="100" @click="showImg(0)"/>
            <div v-transfer-dom>
              <previewer :list="srcList" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
            </div>
          </div>
        </flexbox-item>
        <flexbox-item :span="5">
          <div class="center">
            <div class="title">花茶礼盒</div>
            <div class="price mb10">原价：￥55</div>
            <div>推广价：<span class="tc_price">￥50.5</span></div>
          </div>
        </flexbox-item>
        <flexbox-item :span="3">
          <div class="right">
            <img slot="icon" src="../../assets/img/icon_share.png">
            <div slot="label " class="mt10">赚5.1</div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    </view-box>
    <common :checked="checked"></common>
  </div>
</template>

<script>
import common from '../../components/common.vue'
import { Swiper,SwiperItem,Search,Flexbox,FlexboxItem,Group,Cell,Grid,GridItem,XButton,ViewBox,Sticky,Tab,TabItem,Previewer,TransferDom,XAddress,ChinaAddressV4Data } from 'vux'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      checked: 0,
      index: 0,
      searchVal: '',
      cityVal: '北京',
      isLink: true,
      listTab: ['热门商品', '北京特产', '农贸商品', '海淘商品'],
      demo2: '热门商品',
      indexImgList: [{
        url: 'javascript:void(0)',
        img: 'static/img/index_bg.png',
        title: ''
      }],
      srcList: [{
        msrc: require('../../assets/img/prod_01.png'),
        src: require('../../assets/img/prod_01.png')
      }],
      listProd: [
        {
          name:'',
        },
        {
          name:'',
        },
        {
          name:'',
        }
      ],
      addressData: ChinaAddressV4Data,
      showAddress: false,
      provinceCityShow: true,
      cityName: '',
      searchCityVal: [],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  created(){
    document.title = '商城首页'
  },
  methods: {
    onIndexChange (index) {
      console.log('demo item change', index)
    },
    searchResultChange () {
      console.log(this.searchVal)
    },
    logIndexChange (arg) {
      console.log(arg)
    },
    showImg (index) {
      this.$refs.previewer[0].show(index)
    },
    changeTab (data) {
      console.log(data)
    },
    searchClick () {
      this.showAddress = true
    },
    onShadowChange (ids, names) {
      //console.log(ids, names)
      this.cityName = names[1] === '市辖区' ? names[0] : names[1]
    },
    searchClickHide (str) {
      console.log('on-hide', str)
      if(str){
        this.cityVal = this.cityName.replace(/市/g, "")
      }
    }
  },
  directives: {
    TransferDom
  },
  components: {
    common,
    Swiper,
    SwiperItem,
    Search,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    Grid,
    GridItem,
    XButton,
    ViewBox,
    Sticky,
    Tab,
    TabItem,
    Previewer,
    TransferDom,
    XAddress
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weui-grid:after{
  border:none;
}
</style>
