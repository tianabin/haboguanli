<template>
	<div>
		<div class="conn-top">
			<div class="conn-top-top">
				<img class="conn-top-top-img" :src="head_img"/>
				<div>{{nickname}}</div>
				<div class="conn-top-top-div">
					<img class="conn-top-top-img1" src="../../assets/hot.png"  :onerror="$store.state.errorGoodsImg"/>
					<label>{{rank}}</label>
				</div>
				<img class="help" src="../../assets/collection.png"  v-if="is_collection==0"  @click="fllow(1)" />
				<img class="help" src="../../assets/collectionAc.png" v-else  @click="fllow(2)" />
			</div>
			<div class="conn-top-bottom">
				<div>{{address}}</div>
				<div >
					<div class="label" v-for="item in tag_words">{{item.tag_words}}({{item.count}})</div>
				</div>
			</div>
		</div>
	
		<div class="conn-bottom">
			<div class="bottom-title">50人以上的群列表({{total}})个</div>
			<div class="bottom-items">
				<div class="bottom-item" v-for="(list,i) in list1"  @click="toGroup(list.room_wxid)">
					<div class="item-div"  style="width: 1.493333rem;height: 1.493333rem;border-radius: 50%;">
						<img :src="list.head_img==''?$store.state.errorGoodsImg:list.head_img" style="width: 1.493333rem;height: 1.493333rem;border-radius: 50%;" :onerror="$store.state.errorGoodsImg"/>
					</div>
					<div class="item-div-div" >{{list.name}}({{list.num}}人)</div>
				</div>
				<div class="bottom-seemore" @click="seemore" v-if="show">查看更多</div>
				<div class="bottom-seemore" @click="seemore" v-if="!show">到底了</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui'
export default {
  name: "contion",
  data() {
    return {
		nickname: '',
		head_img: '',
		address: '',
		tag_words:[],
		page:1,
		list1:[],
		total:'0',
		show:1,
		openid:"",
		rank:"",
		userId:"",
		is_collection:"",
		id:""
    }
  },
  created: function() {
	this.rank=this.$route.query.rank
  	this.openid=localStorage.getItem('connectid');
	this.userId = window.localStorage.getItem("userMapId");
  	this.get_customer_info();
  	this.get_customer_tags();
  	this.get_customer_group();
  },
  mounted(){
	mui.back = function() {
		window.history.go(-1);
	}
  },
  methods: {
  	get_customer_info: function() { //获取团长信息 openid和热度值上一页面传过来
		let $v=this,
		params = {wxid: $v.openid,user_id:$v.userId};
		$v.apiAxios.getCustomerInfo(params).then(res => {
			$v.nickname = res.result[0].nickname;
			$v.head_img = res.result[0].head_img;
			$v.address = res.result[0].address;
			$v.is_collection=res.result[0].is_collection
			$v.id=res.result[0].id
		}).catch(err => {
		  //Toast(err.msg)
		})
  
  	},
	 //获取团长标签
    get_customer_tags:function(){
		let $v=this,
		params = {wxid: $v.openid};
		$v.apiAxios.getCustomerTags(params).then(res => {
			$v.tag_words=res.result;
		}).catch(err => {
		  //Toast(err.msg)
		})
      },
	  //获取团长列表
    get_customer_group:function(){
		let $v=this,
		params = {wxid: $v.openid,pindex:$v.page,};
		$v.apiAxios.getCustomerGroup(params).then(res => {
			$v.list1=$v.list1.concat(res.result.data);
			$v.total=res.result.total;
		}).catch(err => {
		  //Toast(err.msg)
		})
      	
      },
    seemore:function(){
      	var $vm = this;
  	     if($vm.list1.length<$vm.total)
  	     {
  	     	$vm.page++;
  	     	$vm.get_customer_group();
  	     	
  	     }
  	     else{
  	     	$vm.show=0;
  	     }
    },
  	toGroup:function(i){
  		localStorage.setItem('group_id',i)
		this.$router.push({path:'./buscen'});
  	},
	setBdCollection(i){
		let $v=this,
		params = {target_id:$v.id,user_id:$v.userId,type:'1',status:$v.status};
		$v.apiAxios.setBdCollection(params).then(res => {
			if($v.status==1){
				$v.is_collection=1
				Toast('收藏成功')
			}else{
				$v.is_collection=0
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
	.conn-top {
		width: 100%;
		height: auto;
		max-height: 10rem;
		background: rgba(255, 255, 255, 1);
		box-sizing: border-box;
		padding: 0 0.5217391304347826rem;
	}
	
	.conn-top-top {
		height: 2.608695652173913rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.conn-top-top-img {
		width: 2.1739130434782608rem;
		height: 2.1739130434782608rem;
		border-radius: 50%;
	}
	
	.conn-top-top-img1 {
		margin-left: 3rem;
		width: 0.6956521739130435rem;
		height: 0.782608695652174rem;
	}
	
	.conn-top-top div:nth-child(2) {
		font-size: 0.6956521739130435rem;
		color: #333;
		font-weight: 600;
		margin-left: 0.3rem;
		max-width: 3.260869565217391rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.conn-top-top div:nth-child(3) label {
		font-size: 0.6086956521739131rem;
		margin-left: 0.2rem;
	}
	
	.conn-top-bottom {
		height: auto;
		font-size: 0.6086956521739131rem;
	}
	
	.conn-top-bottom div:nth-child(1) {
		margin-top: 0.32608695652173914rem;
	}
	
	.conn-top-bottom div:nth-child(2) {
		display: flex;
		flex-flow: wrap;
		margin-top: 0.34rem;
		align-items: center;
	}
	
	.conn-top-top-div {
		display: flex;
		align-items: center;
	}
	
	.label {
		border: 1px solid rgba(54, 153, 255, 1);
		border-radius: 0.6rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #3699FF;
		height: 1.0869565217391304rem;
		box-sizing: border-box;
		padding: 0.1rem 0.5rem;
		margin-left: 0.1rem;
		margin-top: 0.3rem;
	}
	
	.help {
		width: 0.8695652173913043rem;
		height: 0.8695652173913043rem;
		margin-left: 1rem;
	}
	
	.conn-bottom {
		width: 100%;
		height: auto;
		padding: 0 0.5217391304347826rem;
		box-sizing: border-box;
		margin-top: 0.34782608695652173rem;
		background: #fff;
	}
	
	.bottom-title {
		font-size: 0.6956521739130435rem;
		color: #333;
		font-weight: 600;
		height: 1.7391304347826086rem;
		display: flex;
		align-items: center;
	}
	
	.bottom-items {
		height: auto;
	}
	
	.bottom-item {
		height: 2.1739130434782608rem;
		display: flex;
		align-items: center;
	}
	
	.item-div {
		display: flex;
		flex-flow: wrap;
		width: 1.5217391304347827rem;
	}
	
	.item-div img {
		width: 0.7608695652173914rem;
		height: 0.7608695652173914rem;
		border-radius: 50%;
	}
	
	.item-div-div {
		margin-left: 0.5217391304347826rem;
		font-size: 0.6086956521739131rem;
		max-width: 11rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.bottom-seemore {
		width: 100%;
		height: 1.3043478260869565rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999;
		font-size: 0.6086956521739131rem;
		text-decoration: underline;
	}
</style>
