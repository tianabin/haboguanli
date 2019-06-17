<template>
	<div class="app">
		<div class="wrap">
			<div class="nav-wrap" :style="'height:'+sHeight+'px'">
				<div class="nav" :class="navIndex==index?'navActive':''" v-for="(item,index) in areaList" @click="navClick(index,item.name)">{{item.name}}<span v-if="navIndex==index"></span></div>
			</div>
			<div class="second-level-nav-wrap" :style="'height:'+sHeight+'px'" >
				<div class="second-level-nav " :class="navIndexs==index?'second-level-nav-active':''" v-for="(item,index) in circleList" @click="navClick1(index)">{{item.name}}</div>
			</div>
			
		</div>
			
			
		
	</div>
</template>

<script>
	import { Toast,Indicator} from 'mint-ui'
	import Tabnav from "../tabNav/tebNav"
	export default{
		data(){
			return{
				navIndex:0,
				navIndexs:'a',
				city:'北京市',
				areaId:'',
				circleList:[],
				areaList:[],
				navMousedown:true,
				levelNavMousedown:true,
				sHeight:""
			}
		},
		created(){
			document.title = '商圈筛选'
			this.sHeight=document.documentElement.clientHeight
			this.getAreaCircleData(this.city,'')
		},
	  mounted(){
		mui.back = function() {
			window.history.go(-1);
		}
	},
		methods:{
			navClick(index,s){
				Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
				this.areaId=s
				this.navIndex=index
				this.getAreaCircleData(this.city,this.areaId)
			},
			navClick1(index){
				this.navIndexs=index
			},
			getAreaCircleData(){
				let _this=this;
				let params = {city:_this.city,area:_this.areaId};
					_this.apiAxios.getAreaCircle(params).then(res => {
						Indicator.close();
						if(res.errcode==0){
							_this.circleList=res.result.circle_list;
						    _this.areaList=res.result.area;
						}
					}).catch(err => {
						Toast(err.errmsg)
					})
			}
			
		}
	}
</script>

<style scoped="scoped">
	div{ box-sizing: border-box; }
	.wrap{ display: flex;}
	.nav{ width: 5.957446rem; height: 1.702127rem; background: #fff; color: #666; font-size: 0.595744rem; line-height: 1.702127rem; padding-left: 0.851063rem; position: relative; }
	.nav span{ width: 0.085106rem; height: 0.595744rem; background: #3699FF; position: absolute; top: 0.553191rem; left: 0;}
	.navActive{ color: #333; }
	.second-level-nav{ width: 5.957446rem; height: 1.702127rem;  color: #666; font-size: 0.595744rem; line-height: 1.702127rem; padding-left: 0.851063rem;}
	.second-level-nav-active{ color: #3699FF;}
	.nav-wrap{overflow-y: auto;}
	.second-level-nav-wrap{overflow-y: auto;}
</style>