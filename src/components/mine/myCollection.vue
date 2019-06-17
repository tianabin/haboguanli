<template>
	<div class="app" :style="'height:'+sHeight+'px'">
		<div class="nav-wrap">
		   <div class="nav" :class="navIndex==index?'navActive':''" @click="navClcik(index)" v-for="(item,index) in navData">
		      <div>{{item.name}}<div :class="navIndex==index?'navStyle':''"></div></div>
		   </div>
		</div>
		<div style="height:2.2rem"></div>
		<div class="box">
			<ul class="wrap1"
			v-if="type==3"
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="10">
				<li class="clear-fix" v-for="(v,i) in list3" @click="todetal(i)">
					<!-- <div class="fl headImg"><img src="../../assets/autoLoginNo.png"></div> -->
					<div style="width: 11.7rem;">
						<div>{{v.user_name}}</div>
						<div class="gray">地址：{{v.address}}</div>
					</div>
				</li>
			</ul>
			<ul class="wrap2"
			v-if="type==1"
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="10">
				<li v-for="(v,i) in list1" @click="todetal(i)">
					<div class="clear-fix">
						<div class="fl headImg"><img :src="v.head_img==''?$store.state.errorGoodsImg:v.head_img" :onerror="$store.state.errorGoodsImg"></div>
						<div class="fl" style="width: 11.7rem;">
							<div>{{v.nickname}}</div>
							<div class="clear-fix icon"><div></div><div>{{v.user_rank}}</div><div></div><div></div></div>
						</div>
					</div>
					<div class="timer">
						<div>{{v.address}}</div>
						<div>安装时间  2019-03-01  19:00</div>
					</div>
					<div class="clear-fix">
						<div class="label" v-for="(s,i) in v.tags">{{s.tag_words}}({{s.count}})</div>
					</div>
				</li>
			</ul>
			<ul class="wrap1" v-if="type==4"
			 v-infinite-scroll="loadMore"
			 infinite-scroll-disabled="loading"
			 infinite-scroll-distance="10">
				<li class="clear-fix" v-for="(v,i) in list4" @click="todetal(i)">
					<div class="fl headImg"><img :src="v.head_img==''?$store.state.errorGoodsImg:v.head_img" :onerror="$store.state.errorGoodsImg"></div>
					<div class="fl" style="width: 11.7rem;line-height: 1.493333rem;">
						<div>{{v.name}}</div>
					</div>
				</li>
			</ul>
			<ul class="wrap2"
			v-if="type==2"
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="10">
				<li v-for="(v,i) in list2" @click="todetal(i)">
					<div class="timer" style="margin-top: 0;">
						<div>{{v.name}}</div>
						<div>地址：{{v.address}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { Toast,InfiniteScroll,Indicator } from 'mint-ui'
export default {
  name: "mine",
  data() {
    return {
		navData:[{name:'团长'},{name:'小区'},{name:'种子客户'},{name:'微信群'}],
		navIndex:0,
		sHeight:"",
		page:1,
		type:"1",//1团长2小区3种子用户4微信群
		userid:"",
		list1:[],
		list2:[],
		list3:[],
		list4:[],
		loading:false,
		totals:0,
		total:0
    }
  },
  created(){
	this.sHeight=document.documentElement.clientHeight
	this.userid = window.localStorage.getItem("userMapId");
	this.getCollection()
  },
  methods:{
  	navClcik(index){   //一级导航
  	  this.navIndex=index;
	  this.type=index+1
	  this.page=1
	  this.totals=0
	  this.list1=[],
	  this.list2=[],
	  this.list3=[],
	  this.list4=[],
	  this.getCollection()
  	},
	getCollection(){
		Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		});
		//1团长2小区3种子用户4微信群
		let $v=this,
		params = {user_id:$v.userid,type:$v.type,page_id:$v.page,page_nums:'30'};
		$v.apiAxios.getCollection(params).then(res => {
			Indicator.close();
			$v.total=res.result.total;
			if($v.type==1){
				$v.list1=$v.list1.concat(res.result.data)
				$v.totals=$v.list1.length
			}else if($v.type==2){
				$v.list2=$v.list2.concat(res.result.data)
				$v.totals=$v.list2.length
			}else if($v.type==3){
				$v.list3=$v.list3.concat(res.result.data)
				$v.totals=$v.list3.length
			}else if($v.type==4){
				$v.list4=$v.list4.concat(res.result.data)
				$v.totals=$v.list4.length
			}
		}).catch(err => {
		  //Toast(err.msg)
		  
		})
	},
	todetal(i){
		if(this.type==1){
			let s=this.list1[i].user_rank
			this.$router.push({path:'./contion',query:{rank:s}});
			localStorage.setItem('connectid',this.list1[i].wxid)
		}else if(this.type==2){
			this.$router.push({path:'./districtdetails',query:{id:this.list2[i].target_id,address:this.list2[i].address}});
		}else if(this.type==3){
			this.$router.push({path:'./personalinfo',query:{id:this.list3[i].target_id}});
		}else if(this.type==4){
			this.$router.push({path:'./buscen'});
			localStorage.setItem('group_id',this.list4[i].group_id)
		}
	},
	loadMore() {
		let _this=this;
		if(_this.totals<_this.total){
			_this.loading = true;
			_this.page=_this.page+1;
			_this.getCollection()
		}
	    _this.loading = false;
	}
  }
};
</script>

<style scoped="scoped">
	.app{background: #f9f9f9;}
	.nav-wrap{width: 92%;position: fixed;top: 0; height: 1.87234rem; background: #fff; font-size: 0.595744rem; color: #999; display: flex; justify-content: space-around; padding: 0 0.638297rem; margin-bottom: 0.341333rem;}
	.nav{ text-align: center; width: 50%; box-sizing: border-box; margin-top: 0.510638rem; position: relative;} 
	.navActive{ font-size: 0.680851rem; color: #3699FF; font-weight: 600; margin-top: 0.425531rem;}
	.navStyle{ width: 1.702127rem; height: 0.085333rem; position: absolute; bottom: 0.255319rem; left: 50%; margin-left: -0.851063rem; background: #3699FF; border-radius: 0.063829rem; }
	.wrap1 li{margin: 0 auto;font-size: 0.597333rem;color: #333;background: #fff;padding: 0.512rem;margin-bottom: 0.341333rem;width: 13.952rem;}
	.gray{color: #999!important;}
	.wrap1 li .headImg{width: 1.493333rem;height: 1.493333rem;border-radius: 50%;margin-right: 0.512rem;}
	.wrap1 li .headImg img{width: 100%;height: 100%;border-radius: 50%;}
	.wrap2 li{margin: 0 auto;font-size: 0.597333rem;color: #333;background: #fff;padding: 0.512rem;margin-bottom: 0.341333rem;width: 13.952rem;}
	.gray{color: #999!important;}
	.wrap2 li .headImg{width: 1.493333rem;height: 1.493333rem;border-radius: 50%;margin-right: 0.512rem;}
	.wrap2 li .headImg img{width: 100%;height: 100%;border-radius: 50%;}
	.wrap2 .icon div{width: 0.853333rem;height: 0.853333rem;float: left;}
	.wrap2 .icon div:nth-child(1){background: url(../../assets/heat.png) no-repeat;background-size: 100% 100%;}
	.wrap2 .icon div:nth-child(2){width: 3rem;margin-left: 0.3rem;}
	/* .wrap2 .icon div:nth-child(3){background: url(../../assets/you.png) no-repeat;background-size: 100% 100%;} */
	.wrap2 .icon div:nth-child(4){background: url(../../assets/tuan.png) no-repeat;background-size: 100% 100%;margin-left: 0.3rem;}
	.timer{margin-top: 0.362666rem;}
	.timer div{line-height: 1rem;}
	.wrap2 li .label{padding: 0.2rem 0.4333rem;border: 1px solid #3699FF;border-radius: 0.64rem;float: left;color: #3699FF;margin: 0.256rem;}
</style>
