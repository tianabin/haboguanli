<template>
	<div class="app">
		<div class="list-wrap"  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" v-if="commanderList.length>0">
			<div class="list" v-for="(item,index) in commanderList">
				<div class="header">
					<div class="header-img"><img :src="item.header_url"/></div>
					<div class="header-content">
						<p>{{item.user_name}}</p>
						<p>微信昵称：{{item.wx_name}}</p>
						<p>{{item.address}}</p>
					</div>
				</div>
				<div class="person-value-wrap">
					<div class="person-value"><div>人脉值</div><div></div><div>{{item.user_rank}}</div></div>
					<div class="person-value"><div>活跃值</div><div style="background: #06C761;"></div><div>{{item.say_nums}}</div></div>
					<div class="person-value"><div>成交值</div><div style="background: #FF1A2B;"></div><div>0</div></div>
				</div>
				<div class="details_btn" @click="toDetails(item.id)">查看详情</div>
				<div class="list_type" :class="item.is_join==1?'':'list_type_active'">已合作</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast,InfiniteScroll  } from 'mint-ui'
	import Tabnav from "../tabNav/tebNav"
	export default{
		data(){
			return{
				commanderList:[],
				page:1,
				pageSize:10,
				total:0,
				loading:false
			}
		},
		created(){
			document.title = '团长信息'
			this.getCommanderList()
		},
		methods:{
			toDetails(id){
//				this.$router.push({path:'./personalinfo',query:{id:id}});
			},
			getCommanderList(){
				let _this=this;
				let params = {circle_id:156,page:_this.page,page_size:_this.pageSize,};
				_this.apiAxios.getCommanderList(params).then(res => {
					if(res.errcode==0){
						_this.total=res.result.total;
						if(_this.commanderList.length<res.result.total){
							_this.commanderList=_this.commanderList.concat(res.result.data);
						}
					}
				}).catch(err => {
					Toast(err.errmsg)
				})
			},
			loadMore() {
				let _this=this;
				_this.loading = true;
				_this.page=_this.page+1;
			    _this.getCommanderList()
			    _this.loading = false;
			}
						
			
		}
	}
</script>

<style scoped="scoped">
	body{ background: #F9F9F9; }
	div{ box-sizing: border-box; }
	.list-wrap{ padding: 0 0.510638rem;}
	.list{ border-radius: 0.425531rem; background: #fff; margin-top: 0.340425rem; margin-bottom: 0.340425rem; overflow: hidden; position: relative;}
	.header{   padding: 0 0.510638rem; padding-top: 0.510638rem; display: flex; }
	.header-img{ width: 1.702127rem; height: 1.702127rem; border-radius: 50%; overflow: hidden; margin-right: 0.510638rem; }
	.header-img img{ width: 100%; height: 100%;}
	.header-content{ font-size: 0.595744rem; color: #333; }
	.person-value-wrap{    padding: 0 0.510638rem; padding-top: 0.510638rem; }
	.person-value{ font-size: 0.595744rem; color: #333; display: flex;  }
	.person-value div:nth-child(2){ width: 6.80851rem; height: 0.425531rem; background: #FFC20A; border-radius: 0.212765rem; margin: 0.212765rem 0.340425rem 0.340425rem 0.510638rem;}
	.person-value div:nth-child(3){  color: #FFC20A;}
	.details_btn{ width: 3.829787rem; height: 1.063829rem; line-height: 1.063829rem; text-align: center; border:0.042553rem solid rgba(54,153,255,1); border-radius: 0.531914rem; color: #3699FF; font-size: 0.595744rem; float: right; margin: 0.553191rem 0.510638rem 0.510638rem 0;  }
	.list_type{ font-size: 0.510638rem; color: #3699FF; position: absolute; top: 0.553191rem; right: 0.553191rem;}
	.list_type_active{ color: #FF1A2B;}
</style>