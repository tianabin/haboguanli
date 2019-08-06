<template>
	<div class="app" :style="'height:'+sHeight+'px'">
		<div class="box" v-for="v in boxList" @click="location(v.url)">
			<div class="icon" :style="'background-image: url('+v.imgurl+')'"></div>
			<div :style="'color: '+v.color">{{v.name}}</div>
		</div>
		<Tabnav></Tabnav>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
import Tabnav from "../tabNav/tebNav"
export default {
  name: "operation",
  data() {
    return {
		sHeight:"",
		boxList:[
				{
					color:'#3C65FF',
					name:'作战地图',
					imgurl:'https://btj.yundian168.com/biz/baseImg/map.png',
					url:"opermap"
				},
				{
					color:'#FF6243',
					name:'工作计划',
					imgurl:'https://btj.yundian168.com/biz/baseImg/work1.png',
					url:"workplan"
				},
				{
					color:'#FFB71C',
					name:'工作记录',
					imgurl:'https://btj.yundian168.com/biz/baseImg/work2.png',
					url:"workrecord"
				},
				{
					color:'#3cd7ff',
					name:'数据图表',
					imgurl:'https://btj.yundian168.com/biz/baseImg/tubiao.png',
					url:"chart"
				},
				{
					color:'#ff711c',
					name:'我的客户',
					imgurl:'https://btj.yundian168.com/biz/baseImg/kehu.png',
					url:"mycollection"
				},
				{
					color:'#FF9B43',
					name:'群空间',
					imgurl:'https://btj.yundian168.com/biz/baseImg/groupspace.png',
					url:"gslist"
				}
				],
    }
  },
  components:{
        Tabnav:Tabnav
  },
  created(){
	this.sHeight=document.documentElement.clientHeight  
  },
  mounted(){
	var clickNum = 0;
	mui.back = function(event) {
	  clickNum++;
	  if(clickNum > 1) {
		plus.runtime.quit();
	  } else {
		mui.toast("再按一次退出应用");
	  }
	  setTimeout(function() {
		clickNum = 0
	  }, 2000);
	  return false;
	} 
  },
  methods:{
  	location(i){
		  console.log(i)
		this.$router.push({path:i});
	}
  }
};
</script>

<style scoped="scoped">
	.app{background: #f9f9f9;padding: 0.512rem 0.341333rem;}
	.box{width:7.296rem;height:4.266666rem;border-radius:0.426666rem;background: #fff;margin: 0 0.170666rem;font-size: 0.597333rem;text-align: center;overflow: hidden;margin-bottom: 0.341333rem;float: left;}
	.icon{width: 2.133333rem;height: 2.133333rem;background: url(../../assets/map.png) no-repeat;background-size: 100% 100%;margin: 0.661333rem 0 0 2.688rem;}
</style>
