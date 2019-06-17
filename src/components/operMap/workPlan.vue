<template>
	<div class="app">
		<div class="nav-wrap">
		   <div class="nav" :class="navIndex==index?'navActive':''" @click="navClcik(index)" v-for="(item,index) in navData">
		      <div>{{item.name}}<div :class="navIndex==index?'navStyle':''"></div></div>
		   </div>
		</div>
		<div class="list-wrap" v-if="navIndex==0">
			<div class="list" v-for="(v,i) in today">
				<div class="list-title">{{v.name}}</div>
				<div class="list-address">地址 <span>{{v.address}}</span></div>
				<div class="list-button g-pointer" @click="navigation(v.lat,v.lng,v.address)">导航</div>
			</div>
		</div>
		<div class="list-wrap" v-else>
			<div class="list" v-for="(v,i) in tomorrow">
				<div class="list-title">{{v.name}}</div>
				<div class="list-address">地址 <span>{{v.address}}</span></div>
				<div class="list-button g-pointer" @click="navigation(v.lat,v.lng,v.address)">导航</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import Tabnav from "../tabNav/tebNav"
	import remoteLoad from '@/utils/remoteLoad.js'
	export default{
		data(){
			return{
				navData:[{name:'今日计划'},{name:'明日计划'}],
				navIndex:0,
				userId:"",
				tomorrow:[],
				today:[]
			}
		},
		created(){
			this.userId = window.localStorage.getItem("userMapId");
			document.title = '工作计划'
			this.getLinePlanList()
		},
		mounted(){
			mui.back = function() {
				window.history.go(-1);
			}
		},
		methods:{
			navClcik(index){
			  this.navIndex=index;
			},
			getLinePlanList(){
				let $v=this,
				params = {user_id:$v.userId};
				$v.apiAxios.getLinePlanList(params).then(res => {
					$v.tomorrow=res.result.tomorrow
					$v.today=res.result.today
				}).catch(err => {
				  //Toast(err.msg)
				})
			},
			navigation(i,s,t){
				wx.openLocation({
					latitude: parseFloat(i), // 纬度，浮点数，范围为90 ~ -90
					longitude: parseFloat(s), // 经度，浮点数，范围为180 ~ -180。
					name: t, // 位置名
					address: '', // 地址详情说明
					scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
					infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
				});
				event.stopPropagation();
			},
			
		}
	}
</script>

<style scoped="scoped">
	body{ background: #F9F9F9; }
	.nav-wrap{ height: 1.87234rem; background: #fff; font-size: 0.595744rem; color: #999; display: flex; justify-content: space-around; padding: 0 0.638297rem; margin-bottom: 0.510638rem;}
	.nav{ text-align: center; width: 50%; box-sizing: border-box; margin-top: 0.510638rem; position: relative;} 
	.navActive{ font-size: 0.680851rem; color: #333; font-weight: 600; margin-top: 0.425531rem;}
	.navStyle{ width: 1.702127rem; height: 0.127659rem; position: absolute; bottom: 0.255319rem; left: 50%; margin-left: -0.851063rem; background: #3699FF; border-radius: 0.063829rem; }
	.list-wrap{ padding: 0 0.510638rem;}
	.list{ background: #fff; border-radius: 0.425531rem; font-size: 0.595744rem; color: #333; padding: 0.531914rem 0.531914rem 0.489361rem 0.510638rem; box-sizing: border-box; position: relative;margin-bottom: 0.341333rem;}
	.list-title{ font-size: 0.680851rem; font-weight: 600; margin-bottom: 0.340425rem;}
	.list-button{ width: 2.553191rem; height: 1.063829rem; line-height: 1.063829rem; text-align: center; border: 0.042553rem solid #3699FF; color: #3699FF; background: #fff; border-radius: 0.531914rem; position: absolute; top: 0.340425rem; right: 0.531914rem;} 
</style>