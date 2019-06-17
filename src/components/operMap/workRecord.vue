<template>
	<div class="app">
		<div class="nav-wrap">
		   <div class="nav" :class="navIndex==index?'navActive':''" @click="navClcik(index)" v-for="(item,index) in navData">
		      <div>{{item.name}}<div :class="navIndex==index?'navStyle':''"></div></div>
		   </div>
		</div>
		<!--<div class="secondary-nav-wrap" v-if="navIndex==0">
	      	<div class="secondary-nav" :class="secondaryNavIndex==index?'secondary-nav-avtive':''" @click="secondaryNavClick(index)" v-for="(item,index) in secondaryNavData">{{item.name}}</div>
    	</div>-->
    	<!--<div class="secondary-nav-wrap" v-if="navIndex==1">
	      	<div class="secondary-nav" :class="installedIndex==index?'secondary-nav-avtive':''" @click="installedClcik(index)" v-for="(item,index) in installed">{{item.name}}</div>
    	</div>-->
		
		
		<div class="have-visited-list-wrap"  v-if="navIndex==0">
			<div class="have-visited-list" v-for="(item,index) in commanderSignlist">
				<div class="have-visited-list-title">{{item.customer_name}}</div>
				<div>拜访时间 <span>{{item.create_time}}</span></div>
				<div>地址 </span>{{item.address}}</span></div>
				<div  v-if="navIndex==0 && secondaryNavIndex==0" class="list-button" @click="navigation(item.lat,item.lng,v.address)">导航</div>
			</div>
		</div>
		
		<div class="installed-list-wrap" v-if="navIndex==1 && installedList.length>0">
			<div class="installed-list" v-for="(item,index) in installedList">
				<div class="installed-list-content">
					<div class="image-wrap">
						<img :src="item.header_url"/>
					</div>
					<div class="information-wrap">
						<div class="information-name">{{item.wx_name}}</div>
						<div class="information-heat">
							<img src="../../assets/heat.png"/>
							<span>16214.5</span>
							<img src="../../assets/liang.png"/>
							<img src="../../assets/liang.png"/>
						</div>
						<div class="information-address">{{item.address}}</div>
						<div class="information-time">安装时间  <span>{{item.create_time}}</span></div>
					</div>
				</div>
				<div class="classification-list" >
					<div v-for="label_list in item.label_list">{{item.name}}</div>
				</div>
			</div>
		</div>
		
		<!-- <Tabnav></Tabnav> -->
		
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import Tabnav from "../tabNav/tebNav"
	export default{
		components:{
		        Tabnav:Tabnav
		},
		data(){
			return{
				navData:[{name:'已拜访'},{name:'已安装'}],
				navIndex:0,
				secondaryNavData:[{name:'小区'},{name:'团长'},{name:'店铺'}],
				secondaryNavIndex:0,
				installed:[{name:'团长'},{name:'店铺'}],
				installedIndex:0,
				user_id:localStorage.getItem('userMapId'),
				page:1,
				pageSize:10000,
				commanderSignlist:[],
				installedList:[]
			}
		},
		created(){
			document.title = '工作记录'
			this.getCommanderSignlist()
		},
		mounted(){
			mui.back = function() {
				window.history.go(-1);
			}
		},
		methods:{
			navClcik(index){   //一级导航
			  this.navIndex=index;
			  if(index==0){
			  	this.getCommanderSignlist()
			  }else{
			  	this.getInstalledList()
			  }
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
			secondaryNavClick(index){   // 已拜访二级
				this.secondaryNavIndex=index;
			},
			installedClcik(index){    //已安装二级
				this.installedIndex=index;
			},
			getCommanderSignlist(){   //获取拜访记录
				let _this=this;
				let params = {user_id:_this.user_id,page:_this.page,page_size:_this.pageSize,};
				_this.apiAxios.getCommanderSignlist(params).then(res => {
					console.log(res)
					if(res.errcode==0){
						_this.commanderSignlist=res.result
//						_this.commanderSignlist=_this.commanderSignlist.concat(res.result)
					}
				}).catch(err => {
					Toast(err.errmsg)
				})
			},
			getInstalledList(){   // 获取已安装记录
				let _this=this;
				let params = {user_id:_this.user_id};
				_this.apiAxios.getInstalledList(params).then(res => {
					console.log(res)
					if(res.errcode==0){
						_this.installedList=res.result.data
					}
				}).catch(err => {
					Toast(err.errmsg)
				})
			},
			
		}
	}
</script>

<style>
	html{ background: #F9F9F9; }
	.nav-wrap{ height: 1.87234rem; background: #fff; font-size: 0.595744rem; color: #999; display: flex; justify-content: space-around; padding: 0 0.638297rem; margin-bottom: 0.510638rem;}
	.nav{ text-align: center; width: 50%; box-sizing: border-box; margin-top: 0.510638rem; position: relative;} 
	.navActive{ font-size: 0.680851rem; color: #333; font-weight: 600; margin-top: 0.425531rem;}
	.navStyle{ width: 1.702127rem; height: 0.127659rem; position: absolute; bottom: 0.255319rem; left: 50%; margin-left: -0.851063rem; background: #3699FF; border-radius: 0.063829rem; }
	.secondary-nav-wrap{ margin-top: 0.510638rem; font-size: 0.595744rem; color: #666; padding: 0 0.510638rem; display: flex; padding-bottom: 0.510638rem;}
	.secondary-nav{ width: 2.553191rem; height: 1.063829rem; text-align: center; line-height: 1.063829rem;} 
	.secondary-nav-avtive{ background: #3699FF; color: #fff; border-radius: 0.531914rem;}
	.have-visited-list-wrap{ padding: 0 0.510638rem;}
	.have-visited-list{  background: #fff; padding: 0.531914rem 0 0.659574rem 0.446808rem; border-radius: 0.425531rem; box-sizing: border-box; font-size: 0.595744rem ; color: #333 ; position: relative; margin-bottom: 0.340425rem; }
	.have-visited-list-title{ font-size: 0.680851rem; font-weight: 600; margin-bottom: 0.255319rem; }
	.have-visited-list>div:nth-child(2){ margin-bottom: 0.361702rem;}
	.list-button{ width: 2.553191rem; height: 1.063829rem; line-height: 1.063829rem; text-align: center; border: 0.042553rem solid #3699FF; color: #3699FF; background: #fff; border-radius: 0.531914rem; position: absolute; top: 0.340425rem; right: 0.531914rem;}
	.installed-list-wrap{ padding: 0 0.510638rem; }
	.installed-list{  background: #fff; border-radius: 0.425531rem; margin-bottom: 0.340425rem; box-sizing: border-box; padding: 0.510638rem; }
	.installed-list-content{ display: flex; font-size: 0.595744rem; color: #333;}
	.image-wrap{ width: 2.127659rem; height: 2.127659rem; border-radius: 50%; overflow: hidden; margin-right: 0.489361rem;}
	.image-wrap>img{ width: 100%; height: 100%;}
	.information-name{ font-size: 0.680851rem; color: #333; font-weight: 600; margin-bottom: 0.297872rem; }
	.information-heat{ font-size: 0.595744rem; color: #333; display: flex;}
	.information-heat img:nth-child(1){ width: 0.680851rem; height: 0.765957rem; margin-right: 0.319148rem;}
	.information-heat img:nth-child(3){ width: 0.851063rem; height: 0.851063rem; margin-left: 0.851063rem;}
	.information-heat img:nth-child(4){ width: 0.851063rem; height: 0.851063rem; margin-left: 0.340425rem;}
	.information-address{ margin-top: 0.297872rem; margin-bottom: 0.127659rem;}
	.classification-list{ margin-top: 0.680851rem; display: flex; justify-content: flex-start; flex-wrap: wrap;}
	.classification-list div{ padding: 0.234042rem 0.595744rem; border: 0.042553rem solid #3699FF; font-size: 0.595744rem; color: #3699FF; border-radius: 0.531914rem; text-align: center; margin-right: 0.510638rem; margin-bottom: 0.510638rem;}
</style>