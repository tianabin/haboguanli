<template>
	<div>
		<div class="title">请选择需要开通服务的微信</div>
		<div class="wechat-list">
			<div :class="cateIndex==i?'active':''" v-for="(v,i) in list" @click="clickNick(v.id,i,v.wxid)"><img :src="v.head_img"/><div>{{v.nickname}}</div></div>
		</div>
		<div style="height: 3rem;"></div>
		<div class="binding-btn" @click="getCommanderBind">
			绑定
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: "mine",
  data() {
    return {
		id:'',
		userid:"",
		erp_user_id:"",
		appid:"wx92b4976631553b5d",
		openid:"",
		unionid:"",
		nickname:"",
		ids:'',
		list:[],
		cateIndex:"z"
    }
  },
  created(){
	this.id=this.$route.query.id;
	this.openid=this.$route.query.open_id;
	this.unionid=this.$route.query.union_id;
	this.nickname=this.$route.query.wx_name;
	this.userid = window.localStorage.getItem("userMapId");
	this.erp_user_id = window.localStorage.getItem("erp_user_id");
	this.whbUserList()
  },
    mounted(){
  	mui.back = function() {
  		window.history.go(-1);
  	}
  },
  methods:{
  	getCommanderBind(){
		let $v=this,
		params = {id:$v.ids,openid:$v.openid,unionid:$v.unionid,erp_user_id:$v.erp_user_id,user_id:$v.userid};
		$v.apiAxios.getCommanderBind(params).then(res => {
			Toast(res.errmsg)
			setTimeout(function(){
				this.$router.go(-1)
			},500)
		}).catch(err => {
			Toast(err.errmsg)
		})
	},
	clickNick(i,s,z){
		this.cateIndex=s;
		this.ids=i;
		this.wxid=z
	},
	whbUserList(){
		let $v=this,
		params = {nickname:$v.nickname};
		$v.apiAxios.whbUserList(params).then(res => {
			$v.list=res.result
		}).catch(err => {
			
		})
	}
  }
};
</script>

<style scoped="scoped">
	.title{ text-align: center; margin-top: 1rem;}
	.wechat-list{display: flex; margin-top: 1rem; flex-flow: wrap; }
	.wechat-list>div{ width: 20%;  text-align: center; box-sizing: border-box; margin-bottom: 0.5rem;}
	.wechat-list>div>img{width: 2.6rem; height: 2.6rem; border-radius: 50%; border: 0.1rem solid #fff; }
	.wechat-list>div>div{ font-size: 0.4rem;}
	.binding-btn{ width: 100%; height: 2.2rem; background: #FDAE03; color: #fff; text-align: center;line-height: 2.2rem; position: fixed; bottom: 0; }
	.active{background: #f5f5f5!important;}
</style>
