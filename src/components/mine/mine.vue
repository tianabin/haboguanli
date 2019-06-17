<template>
	<div class="app" :style="'height:'+sHeight+'px'">
		<div class="header clear-fix">
			<div class="fl">
				<div class="name clear-fix">
					<div>{{info.name}}</div>
					<div class="tebl" v-if="info.company_name">{{info.company_name}}</div>
				</div>
				<div class="phone">{{info.user_name}}</div>
			</div>
			<div class="fr headImg"><img src="" alt=""></div>
		</div>
		<div class="tebIcon">
			<div>我的关键词配置</div>
			<ul class="clear-fix">
				<li v-for="v in tageList">{{v.tag_words}}</li><li @click="mask" style="padding: 0.26rem 0.704rem;">+</li>
			</ul>
		</div>
		<!-- <div class="bindWx clear-fix" @click="toClnList()">
			<div>我的收藏</div>
			<div style="float: right;"></div>
		</div> -->
		<Tabnav></Tabnav>
		<div class="maskBg" v-if="maskShow"> <div @click.stop="maskNo" class="clickMask"></div> <div class="masks"><input type="text" class="labe" v-model="labeText" placeholder="请输入标签名"><div class="btnSub g-pointer" @click.stop="btnSubs">提交</div></div></div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
import Tabnav from "../tabNav/tebNav"
export default {
  name: "mine",
  data() {
    return {
		sHeight:"",
		userid:"",
		info:{},
		tageList:[],
		maskShow:false,
		labeText:""
    }
  },
  components:{
        Tabnav:Tabnav
  },
  created(){
	this.sHeight=document.documentElement.clientHeight
	this.userid = window.localStorage.getItem("userMapId");
	this.getUserInfo()
	this.getTags()
  },
  methods:{
  	getUserInfo(){
		let $v=this,
		params = {user_id:$v.userid,};
		$v.apiAxios.getUserInfo(params).then(res => {
			$v.info=res.result[0]
		}).catch(err => {
		 
		})
	},
	mask:function(){
		this.maskShow=true
	},
	maskNo:function(){
		this.maskShow=false
	},
	btnSubs:function(){
		let $v=this,
		params = {tag_words:$v.labeText,user_id:$v.userid};
		$v.apiAxios.addTag(params).then(res => {
			Toast('添加成功')
			$v.maskShow=false
			$v.tageList=[]
			$v.getTags()
		}).catch(err => {
		  Toast(err.msg)
		})
	},
	//获取顶部标签
	getTags:function(){
		let $v=this,
		params = {
		  user_id:$v.userid
		};
		$v.apiAxios.getTags(params).then(res => {
		  $v.tageList=$v.tageList.concat(res.result)
		}).catch(err => {
		  //Toast(err.msg)
		})
	},
	toClnList(){
		this.$router.push({path:'./mycollection'});
	}
  }
};
</script>

<style scoped="scoped">
	.app{background: #f8f8f8;height: 100%;overflow: hidden;}
	.header{padding: 0.512rem;width: 13.952rem;margin: 0 auto;margin-top: 0.341333rem;margin-bottom: 0.341333rem;background: #fff;border-radius: 0.426666rem;}
	.name{margin-top: 0.512rem;}
	.name div{float: left;}
	.name div:nth-child(1){font-size:0.853333rem;margin-right: 0.512rem ;}
	.tebl{text-align: center;padding: 0.170666rem 0.277333rem;font-size: 0.512rem;color: #fff;background:linear-gradient(-10deg,rgba(54,153,255,1) 0%,rgba(33,216,255,1) 100%);
border-radius:0.426666rem;margin-top: 0.14rem;}
	.phone{font-size: 0.597333rem;color: #333;text-align: left;margin-top: 0.426666rem;}
	.headImg{width: 2.133333rem;height: 2.133333rem;margin-top: 0.426666rem;border-radius: 50%;}
	.headImg img{width: 100%;height: 100%;border-radius: 50%;}
	.tebIcon{padding: 0.256rem;width: 14.506666rem;margin: 0 auto;border-radius: 0.426666rem;background: #fff;}
	.tebIcon div{font-size: 0.682666rem;color: #333;margin-left: 0.256rem;}
	.tebIcon ul li{padding: 0.234666rem 0.704rem;border: 1px solid rgba(54,153,255,1);margin: 0.341333rem 0.256rem;float: left;font-size: 0.597333rem;color: #3699FF;border-radius: 0.64rem}
	.bindWx{background: #fff;margin: 0 auto;margin-top: 0.341333rem;width: 13.952rem;height: 1.706666rem;line-height: 1.706666rem;padding: 0 0.512rem;font-size: 0.597333rem;}
	.bindWx div{float: left;}
	.bindWx div:nth-child(2){width: 0.426666rem;height: 0.682666rem;background: url(../../assets/jiao.png) no-repeat;background-size: 100% 100%;margin-top: 0.512rem;border-radius: 0.426666rem;}
	.masks{text-align: center;background: #fff;padding-bottom: 2rem;position: absolute;bottom: 0;width: 100%;}
	.labe{margin-top: 1.5rem;width:11.093333rem;height:1.493333rem;background:rgba(246,246,246,1);border-radius:0.746666rem;outline: none;border: none;padding: 0 0.512rem;color: #333;}
	.btnSub{margin: 0 auto;margin-top: 1rem;width:11.093333rem;height:1.493333rem;text-align: center;line-height: 1.493333rem;font-size: 0.682666rem;background: #3699FF;border-radius: 0.213333rem;padding: 0 0.512rem;color: #fff;}
	.maskBg{position: fixed;width: 100%;height: 100%;top: 0;background: rgba(0,0,0,0.5);}
	.clickMask{width: 100%;height: 21rem;}
</style>
