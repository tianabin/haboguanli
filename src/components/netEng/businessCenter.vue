<template>
	<div>
		<div class="header">
			<div class="header-lf">
				<img :src="info.head_img==''?$store.state.errorGoodsImg:info.head_img" :onerror="$store.state.errorGoodsImg"/>
			</div>
			<div class="header-rit" v-if="info.group_name" style="width: 10rem;">
				{{info.group_name}}（{{info.member_count}}人）
			</div>
			<div class="header-rit" v-else>
				未设置（{{info.member_count}}人）
			</div>
			<div>
				<p class="p1" v-if="info.is_collection==0" @click="fllow(1)"></p>
				<p class="p2" v-else @click="fllow(2)"></p>
			</div>
		</div>
		<div class="group-statistics" v-if="groupStat1.rate &&groupStat1.title">
			<div class="group-statistics-clo" v-if="groupStat1.rate &&groupStat1.title">
				<div class="statistics">{{groupStat1.rate}}</div>
				<div class="statistics-text">{{groupStat1.title}}</div>
			</div>
			<div class="group-statistics-clo" v-if="groupStat2.rate &&groupStat2.title">
				<div class="statistics statistics2">{{groupStat2.rate}}</div>
				<div class="statistics-text">{{groupStat2.title}}</div>
			</div>
			<div class="group-statistics-clo" v-if="groupStat3.rate &&groupStat3.title">
				<div class="statistics statistics3">{{groupStat3.rate}}</div>
				<div class="statistics-text">{{groupStat3.title}}</div>
			</div>
			<div class="group-statistics-clo" v-if="groupStat4.rate &&groupStat4.title">
				<div class="statistics statistics4">{{groupStat4.rate}}</div>
				<div class="statistics-text">{{groupStat4.title}}</div>
			</div>
		</div>
		<div class="group-members-wrap">
			<div class="group-members-title">群成员</div>
			<div class="group-members-list" v-for="(v,i) in list" v-if="list!=[]">
				<img :src="v.head_img==''?$store.state.errorGoodsImg:v.head_img" :onerror="$store.state.errorGoodsImg"/>
				<div class="list-name">{{v.nickname}}</div>
				<div class="list-cont">{{v.wx_no}}</div>
				<div class="list-region">{{v.city}}</div>
				<div class="list-group-owner" v-if="i==0">群主</div>
			</div>
			<div class="add" @click="loadMore">{{loadMoreCount}}</div>
		</div>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui'
export default {
  name: "tebNav",
  data() {
    return {
		list:[],
		groupStat1:{},
		groupStat2:{},
		groupStat3:{},
		groupStat4:{},
		info:{},
		nodata:false,
		group_id:'',
		page:1,
		loadMoreCount:"查看更多",
		userId:""
    }
  },
  created:function(){
  	this.group_id=localStorage.getItem('group_id');
	this.userId = window.localStorage.getItem("userMapId");
  	this.getGroupStat()
  	this.getGroupMembers()
  	this.getGroupInfo()
  },
 methods:{
 	getGroupStat:function(){
		let $v=this,
		params = {group_id:$v.group_id};
		$v.apiAxios.getGroupStat(params).then(res => {
			if(res.result.length==1){
				$v.groupStat1=res.result[0]
			}else if(res.result.length==2){
				$v.groupStat1=res.result[0]
				$v.groupStat2=res.result[1]
			}else if(res.result.length==3){
				$v.groupStat1=res.result[0]
				$v.groupStat2=res.result[1]
				$v.groupStat3=res.result[2]
			}else if(res.result.length==4){
				$v.groupStat1=res.result[0]
				$v.groupStat2=res.result[1]
				$v.groupStat3=res.result[2]
				$v.groupStat4=res.result[3]
			}
		}).catch(err => {
		  //Toast(err.msg)
		})
 	},
 	getGroupMembers:function(){
		let $v=this,
		params = {group_id:$v.group_id,page_id:$v.page,page_nums:30};
		$v.apiAxios.getGroupMembers(params).then(res => {
			$v.list=$v.list.concat(res.result)
		}).catch(err => {
		  //Toast(err.msg)
		  $v.loadMoreCount="已经到底了"
		})
 	},
 	getGroupInfo:function(){
		let $v=this,
		params = {group_id:$v.group_id,user_id:$v.userId};
		$v.apiAxios.getGroupInfo(params).then(res => {
			$v.info=res.result
		}).catch(err => {
		  //Toast(err.msg)
		  $v.nodata=true
		})
 	},
	loadMore(){
		if(this.loadMoreCount=="查看更多"){
			this.page++
			this.getGroupMembers()
		}
	},
	setBdCollection(i){
		let $v=this,
		params = {target_id:$v.info.id,user_id:$v.userId,type:'4',status:$v.status};
		$v.apiAxios.setBdCollection(params).then(res => {
			if($v.status==1){
				$v.info.is_collection=1
				Toast('收藏成功')
			}else{
				$v.info.is_collection=0
				Toast('取消成功')
			}
			$v.isMask=false
		}).catch(err => {
		 Toast(err.errmsg)
		}) 
	},
	fllow(i){
		this.status=i
		this.setBdCollection()
	}
 }
};
</script>

<style scoped="scoped">
	html{ font-size: 20px; background: #F6F6F6;}
	.header{overflow: hidden;width: 100%;  background: #fff; box-sizing: border-box; margin-top: 0.340425rem; color: #333; font-size: 0.680851rem; padding: 0 0.510638rem;  display: flex;}
	.header-lf{ width: 1.702127rem; height: 1.702127rem; margin-top: -0.063829rem; margin-right: 0.319148rem; box-sizing: border-box;}
	.header-lf img{ width: 100%; height: 100%; border-radius: 50%; }
	.group-statistics{ width: 100%; height: 3.404255rem; background: #FFFFFF; margin-top: 0.340425rem; box-sizing: border-box; display: flex;}
	.group-statistics-clo{ width: 25%; font-size: 0.680851rem; text-align: center; box-sizing: border-box; padding-top: 0.425531rem;}
	.statistics{ width: 1.702127rem; height: 1.702127rem; border-radius: 50%; background: #D5EAFF; text-align: center; line-height: 1.702127rem; color: #0099FF; margin: 0 auto; }
	.statistics2{ background: #D5FEFF; color: #23C3FF;}
	.statistics3{ background: #FFFFD5; color: #FFAE11;}
	.statistics4{ background: #FFF0D5; color: #FF5918;}
	.statistics-text{ color: #333; font-size: 0.595744rem; margin-top: 0.319148rem;}
	.group-members-wrap{ background: #fff; margin-top: 0.340425rem; }
	.group-members-title{ height: 1.276595rem; line-height: 1.276595rem; padding-left: 0.531914rem; color: #333; font-size: 0.595744rem; }
	.group-members-list{ height: 2.127659rem; line-height: 2.127659rem; font-size: 0.595744rem; color: #333; padding: 0 0.510638rem; display: flex; }
	.group-members-list img{ width: 1.276595rem; height: 1.276595rem; border-radius: 50%; margin-top: 0.425531rem; margin-right: 0.340425rem; }
	.list-name{ width: 2.765957rem; margin-right: 0.212765rem; overflow: hidden;}
	.list-cont{ width: 5.74468rem; margin-right: 0.212765rem;  overflow: hidden;}
	.list-region{ width: 2.489361rem; margin-right: 0.212765rem;  overflow: hidden;}
	.list-group-owner{ width: 1.702127rem; height: 0.851063rem; line-height: 0.851063rem; text-align: center; border: 1px solid #3699FF; border-radius: 0.212765rem; color: #3699FF; font-size: 0.510638rem; margin-top: 0.553191rem;}
	.add{ width: 100%; height: 1.276595rem; background: #fff; text-align: center; font-size: 0.510638rem; line-height: 1.276595rem; color: #999; }
	.p1{background: url(../../assets/collection.png) no-repeat;background-size: 100% 100%;}
	.p2{background: url(../../assets/collectionAc.png) no-repeat;background-size: 100% 100%;}
	p{width: 0.853333rem;height: 0.853333rem;margin: 0.25rem 0 0 0.3rem;}
</style>