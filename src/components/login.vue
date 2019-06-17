<template>
	<div class="boxBg" :style="'height:'+sHeight+'px'">
		<div class="login">
			<div class="titleBg"></div>
			<div class="userName" style="-webkit-user-select:text !important;">
				<div class="icon"></div>
				<input type="text" class="user" placeholder="请输入账号" v-model="useuName"  style="-webkit-user-select:text !important;">
			</div>
			<div class="userName" style="-webkit-user-select:text !important;">
				<div class="icon1"></div>
				<input type="password" class="pass" placeholder="请输入密码" v-model="passWord"  style="-webkit-user-select:text !important;">
			</div>
			<div class="btnsLoginz" @click="addSubmit">登录</div>
			<div class="remember" @click="isautoLogin"> <div class="autoLoginIcon1" v-if="checked==false"></div><div class="autoLoginIcon2" v-else></div><div class="div">记住密码</div></div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	export default {
	  name: "login",
	  data() {
	    return {
	  	  sHeight:"",
		  useuName:"",
		  passWord:"",
		  checked:false
	    }
	  },
	  created(){
		this.sHeight=document.documentElement.clientHeight;
		let users=window.localStorage.getItem("user");
		let passs=window.localStorage.getItem("pass");
		if(users){
			this.useuName=users
			this.checked=true
		}
		if(passs){
			this.passWord=passs
		}
		this.getWxConfig()
	  },
	  methods:{
		  addSubmit(){
			if(this.checked){
				let storage=window.localStorage
				//写入c字段
				storage.setItem("user",this.useuName);
				storage.setItem("pass",this.passWord);
			}
			if(this.useuName==""){
				  Toast('用户名不能为空')
				  return
			}else if(this.passWord==""){
				Toast('密码能为空')
				  return
			}else{
				let login = {
				  username:this.useuName,
				  password:this.passWord
				},
				$v=this;
				$v.apiAxios.login(login).then(res => {
				  localStorage.setItem('erp_user_id',res.result.erp_user_id)
				  localStorage.setItem('userMapId',res.result.user_id)
				  localStorage.setItem('unionidUser',res.result.unionid)
				  this.$router.push({path:'./neteng'});
				}).catch(err => {
				  Toast(err.errmsg)
				})
			}
		  },
		  getWxConfig(){
		  	let $v=this,
		  	params = {url:location.href.split('#')[0]};
		  	$v.apiAxios.getWxConfig(params).then(res => {
		  		wx.config({
		  			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		  			appId: res.data.appId, // 必填，公众号的唯一标识
		  			timestamp: res.data.timestamp, // 必填，生成签名的时间戳
		  			nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
		  			signature: res.data.signature,// 必填，签名
		  			jsApiList: ['openLocation','chooseImage','uploadImage'] // 必填，需要使用的JS接口列表
		  		});
		  	}).catch(err => {
		  	  //Toast(err.msg)
		  	})
		  },
		  isautoLogin(){
			this.checked=!this.checked
		  }
	  }
	};
</script>

<style scoped="scoped">
	body{background: #fff;}
	.zhuce{margin-right: 0.512rem;margin-top: 0.512rem;color: #0074D9;margin-bottom: 0.512rem;}
	.boxBg{background: url(../assets/bgH5.png) no-repeat;background-size: 100% 100%;width: 100%;height: 100%;overflow: hidden;}
	.login{width:12.8rem;height:12.418666rem;background:rgba(45,59,122,0.8);border-radius:0.853333rem;overflow: hidden;margin: 0 auto;margin-top: 45%;}
	.userName{width: 10.666666rem;margin: 0 auto;margin-bottom: 0.426666rem;position: relative;}
	input{width:8.96rem;height: 1.706666rem;border-radius: 0.213333rem;border: none;outline: none;padding-left: 1.706666rem;}
	.btnsLoginz{width: 10.666666rem;height: 1.706666rem;line-height: 1.706666rem;text-align: center;background: #3699FF;color: #fff;font-size: 0.682666rem;margin: 0 auto;border-radius: 0.213333rem; }
	.rememberPassword{width: 0.8rem;height: 0.8rem;float: left;}
	.remember{padding-left: 0.9rem;font-size: 0.597333rem;line-height: 0.853333rem;height: 1.066666rem;margin-top: 0.426666rem;margin-right: 0.6rem;}
	.remember .div{height: 0.853333rem;float: left;line-height: 1.1rem;color: #fff;margin-top: 0.1rem;}
	.titleBg{width: 9.792rem;height: 1.258666rem;margin: 0 auto;margin-top: 1.28rem;margin-bottom: 1.045333rem;background: url(../assets/bgTitle.png) no-repeat;background-size: 100% 100%;}
	.icon{width: 0.853333rem;height: 0.853333rem;position: absolute;background: url(../assets/user.png) no-repeat;background-size: 100% 100%;top: 0.426666rem;left: 0.426666rem;}
	.icon1{width: 0.853333rem;height: 0.853333rem;position: absolute;background: url(../assets/pssword.png) no-repeat;background-size: 100% 100%;top: 0.426666rem;left: 0.426666rem;}
	.autoLoginIcon1{float: left;margin-top: 0.35rem;margin-right: 0.2rem;width: 0.64rem;height: 0.64rem;background: url(../assets/autoLoginNo.png) no-repeat;background-size: 100% 100%;}
	.autoLoginIcon2{float: left;margin-top: 0.35rem;margin-right: 0.2rem;width: 0.64rem;height: 0.64rem;background: url(../assets/autoLoginYes.png) no-repeat;background-size: 100% 100%;}
</style>
