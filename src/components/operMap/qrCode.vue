<template>
	<div>
		<div class="imgDiv"><img :src="imgurl" ></div>
		<div class="tips">扫码关注云店互联公众号</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: "mine",
  data() {
    return {
		timer:'',
		id:'',
		imgurl:"",
		userid:"",
		erp_user_id:""
    }
  },
  created(){
	this.id=this.$route.query.id;
	this.userid = window.localStorage.getItem("userMapId");
	this.erp_user_id = window.localStorage.getItem("erp_user_id");
	this.getImg()
  },
  mounted(){
	let $v=this;
	$v.timer=setInterval($v.getCommanderInfo,3000)  
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods:{
  	getImg(){
		let $v=this,
		params = {id:$v.id,};
		$v.apiAxios.getCommanderCode(params).then(res => {
			$v.imgurl='https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+res.result.ticket
		}).catch(err => {
		 
		})
	},
	getCommanderInfo(){
		let $v=this,
		params = {id:$v.id,user_id:$v.userid,erp_user_id:$v.erp_user_id};
		$v.apiAxios.getCommanderInfo(params).then(res => {
			if(res.result.open_id.length>0){
				clearInterval($v.timer)
				// window.location.href="addInfo.html"
				this.$router.go(-1)
			}
		}).catch(err => {
		 
		})
	}
  }
};
</script>

<style scoped="scoped">
	.imgDiv{text-align: center;}
	.imgDiv img{width: 13.866666rem;height: 13.866666rem;}
	.tips{text-align: center;margin-top: 1rem;font-size: 0.597333rem;}
</style>
