<template>
	<div class="app" :style="'height:'+sHeight+'px'">
		<div class="navList">
			<div :class="$store.state.isFlow==0?'active':''" @click="clkNav(0)">群开关</div>
			<div :class="$store.state.isFlow==1?'active':''" @click="clkNav(1)">团长报告</div>
		</div>
		<div style="height: 2.176rem;"></div>
		<ul class="pepList1" v-if="$store.state.isFlow==0">
			<li v-for="(v,i) in groupList" @click="toGroup(v.group_id)">
				<div><img :src="v.head_img==''?$store.state.errorGoodsImg:v.head_img" alt="" :onerror="$store.state.errorGoodsImg"></div>
				<div v-if="v.group_name!=''">{{v.group_name}}</div>
				<div v-else>{{v.group_name}}</div>
				<div class="div1" v-if="v.is_open==0" @click.stop="isOpenNo(i)"></div>
				<div class="div2" v-if="v.is_open==1" @click.stop="isOpenYes(i)"></div>
			</li>
			<li class="loadMore" @click="loadMore()">{{loadMoreCount}}</li>
			<li style="height:2rem"></li>
		</ul>
		<ul class="pres" v-if="$store.state.isFlow==1">
			<li v-for="v in getPreGrouList">
				<div class="time">{{v.first_login_time}}</div>
				<div class="headInfo">
					<div class="div1"><img :src="v.head_img" alt=""></div>
					<div class="div2">{{v.nickname}}</div>
					<div class="div3" v-if="v.user_rank!=null&&v.user_rank!=0"></div>
					<div  class="div4" v-if="v.user_rank!=null&&v.user_rank!=0">{{v.user_rank/10}}</div>
					<div class="btnLock">
						<p class="btnLock1" v-if="v.user_rank!=null&&v.user_rank!=0" @click="look(v.wx_id)">查看</p>
						<p class="btnLock2" v-else>生成中</p>
					</div>
				</div>
			</li>
			<li class="loadMore" @click="loadMore()">{{loadMoreCount}}</li>
			<li style="height:2rem"></li>
		</ul>
		<div style="font-size: 0.597333rem;text-align: center;color: #999;" v-if="kong">暂无数据</div>
		<Tabnav></Tabnav>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui'
import Tabnav from "../tabNav/tebNav"
export default {
  name: "mailList",
  data() {
    return {
		userid:'',
		unionid:'',
		groupList:[],
		kong:false,
		page:1,
		sHeight:"",
		getPreGrouList:[],
		loadMoreCount:"加载更多"
    }
  },
  created:function(){
  	this.userid = window.localStorage.getItem("userMapId");
  	this.unionid = window.localStorage.getItem("unionidUser");
  	this.getGroupList()
	this.sHeight=document.documentElement.clientHeight
	this.getPreGrou()
  },
  components:{
        Tabnav:Tabnav
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
  	getGroupList:function(){
		let $v=this,
		params = {uid:$v.userid,unionid:$v.unionid,page_id:$v.page,page_nums:30};
		$v.apiAxios.getGroupList(params).then(res => {
			$v.groupList=$v.groupList.concat(res.result)
		}).catch(err => {
		  if($v.groupList.length>0){
				$v.loadMoreCount="已经到底了"
		  }
		})
  	},
  	isOpenYes:function(i){
		Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		});
		let $v=this,
		params = {group_id:$v.groupList[i].group_id,is_open:0,user_id:$v.userid};
		$v.apiAxios.openMyGroup(params).then(res => {
			Indicator.close();
			Toast('关闭成功')
			$v.groupList[i].is_open=0
		}).catch(err => {
		  Toast(err.errmsg)
		})
  	},
  	isOpenNo:function(i){
		Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		});
		let $v=this,
		params = {group_id:$v.groupList[i].group_id,is_open:1,user_id:$v.userid};
		$v.apiAxios.openMyGroup(params).then(res => {
			Indicator.close();
			Toast('开启成功')
			$v.groupList[i].is_open=1
		}).catch(err => {
		  Toast(err.errmsg)
		})
  	},
	loadMore(){
		this.page++
		if(this.$store.state.isFlow==0){
			this.getGroupList()
		}else{
			this.getPreGrou()
		}
		
	},
  	toGroup:function(i){
  		localStorage.setItem('group_id',i)
		this.$router.push({path:'./buscen'});
  	},
	clkNav(i){
		this.page=1
		this.$store.commit('changeFoll',i)
		this.loadMoreCount="加载更多"
		this.kong=false
		this.getPreGrouList=[]
		this.groupList=[]
		this.getPreGrou()
		this.getGroupList()
	},
	getPreGrou(){
		let $v=this,
		params = {page_nums:30,page_id:$v.page};
		$v.apiAxios.getPreGrou(params).then(res => {
			$v.getPreGrouList=$v.getPreGrouList.concat(res.result)
		}).catch(err => {
		  //Toast(err.errmsg)
// 		  if($v.groupList.length==0){
// 		  	$v.kong=true
// 		  }
		  if($v.getPreGrouList.length>0){
			  $v.loadMoreCount="已经到底了"
		  }
		})
	},
	look(s){
		this.$router.push({path:'./pres',query:{wxid:s}});
	}
  }
};
</script>

<style scoped="scoped">
	.app{background: #FAFAFA;}
	.pepList1{margin-top: 0.426666rem;}
	.pepList1 li{height: 2.133333rem;padding: 0 0.512rem;font-size: 0.597333rem;color: #333;}
	.pepList1 li div{float: left;line-height: 2.133333rem;height: 100%;}
	.pepList1 li div:nth-child(1){width:1.493333rem;height:1.493333rem;border-radius:50%;margin: 0rem 0.512rem 0 0;}
	.pepList1 li div:nth-child(1) img{width:1.493333rem;height:1.493333rem;border-radius:50%;}
	.pepList1 li div:nth-child(2){width: 11rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	.pepList1 li .div1{float: right;width: 1.53333rem;height: 1.53333rem;background: url(../../assets/isopen.png) no-repeat;background-size: 100% 100%;margin: 0.3rem 0.234666rem 0 0;}
	.pepList1 li .div2{float: right;width: 1.53333rem;height: 1.53333rem;background: url(../../assets/isopen_y.png) no-repeat;background-size: 100% 100%;margin: 0.3rem 0.234666rem 0 0;}
	.navList{width: 100%;display: flex;height: 2.090666rem;color: #999;position: fixed;top: 0;background: #fff;}
	.navList div{flex: 1;text-align: center;font-size: 0.597333rem;line-height: 2.090666rem;}
	.active{color: #3699FF;border-bottom: 0.085333rem solid #3699FF;}
	.pres .time{height: 1.28rem;line-height: 1.28rem;font-size: 0.512rem;color: #999;padding: 0 0.512rem;}
	.headInfo{background: #fff;height: 2.730666rem;overflow: hidden;padding: 0 0.512rem;font-size: 0.597333rem;color: #333;}
	.headInfo .div1{margin-right: 0.341333rem;float: left;height: 1.706666rem;width: 1.706666rem;border-radius: 50%;background: red;margin-top: 0.512rem;}
	.headInfo .div1 img{width: 100%;height: 100%;border-radius: 50%;}
	.headInfo .div2{line-height: 2.730666rem;float: left;}
	.headInfo .div3{margin: 1rem 0.2rem 0 0.3rem;width: 0.64rem;height: 0.64rem;float: left;background: url(../../assets/heat.png) no-repeat;background-size: 100% 100%;}
	.headInfo .div4{line-height: 2.730666rem;float: left;}
	.btnLock{float: right;}
	.btnLock1{margin-top: 0.76rem;width: 2.56rem;height: 1.066666rem;border: 1px solid #3699FF;color: #3699FF;text-align: center;line-height: 1.066666rem;border-radius: 0.64rem;}
	.btnLock2{color: #999;line-height: 2.730666rem;}
	.loadMore{text-align: center;line-height: 2rem;color: #999!important;font-size: 0.597333rem;}
</style>
