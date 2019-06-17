<template>
	<div class="app" :style="'height:'+sHeight+'px'">
		<div class="clear-fix list">
			<div class="fl">是否有效用户</div>
			<div class="fr sp">
				<select name="public-choice" v-model="isEff">                                        
					<option :value="v.id" v-for="v in eff" >{{v.name}}</option>                                    
				</select>
			</div>
		</div>
		<div class="clear-fix list">
			<div class="fl">是否加入平台</div>
			<div class="fr sp">
				<select name="public-choice" v-model="isEff1">                                        
					<option :value="v.id" v-for="v in eff1" >{{v.name}}</option>                                    
				</select>
			</div>
		</div>
		<div class="clear-fix list" style="margin-top: 0.426666rem;">
			<div class="fl">平台反馈</div>
			<div class="fr sp">bug问题</div>
		</div>
		<div class="textAre">
			<textarea value="" placeholder="请输入反馈信息" v-model="count"/>
		</div>
		<div class="clear-fix list" style="margin-top: 0.426666rem;">
			<div class="fl">拜访记录</div>
		</div>
		<div class="textAre">
			<textarea value="" placeholder="请输入拜访记录" />
		</div>
			<div class="submitBtn" @click="commanderSignIn">提交</div>
	</div>
</template>

<script>
import { Toast,Switch } from 'mint-ui'
export default {
  name: "mine",
  data() {
    return {
		sHeight:"",
		userid:"",
		isEff:"1",
		count:"",
		id:'',
		eff:[
			{
				id: '0',
				name: '否'
			},
			{
				id: '1',
				name: '是'
			}
		],
		isEff1:"0",
		eff1:[
			{
				id: '0',
				name: '否'
			},
			{
				id: '1',
				name: '是'
			}
		],
		erp_user_id:""
    }
  },
  watch:{
  	value:{
  		handler(newName, oldName) {
  		  console.log(this.value)
  		}
  	}
  },
  created(){
	this.sHeight=document.documentElement.clientHeight
	this.userid = window.localStorage.getItem("userMapId");
	this.erp_user_id = window.localStorage.getItem("erp_user_id");
	this.id=this.$route.query.id;
  },
  mounted(){
  	mui.back = function() {
  		window.history.go(-1);
  	}
  },
  methods:{
	commanderSignIn(){
		let $v=this,
		params = {
		  user_id:$v.userid,
		  erp_user_id:$v.erp_user_id,
		  customer_id:"",
		  is_join:$v.isEff,
		  is_validity:$v.isEff1,
		  content:$v.count,
		  lat:$v.$store.state.lat,
		  lng:$v.$store.state.lng
		};
		$v.apiAxios.commanderSignIn(params).then(res => {
		  Toast(res.errmsg)
		}).catch(err => {
		  //Toast(err.msg)
		})
	}
  }
};
</script>

<style scoped="scoped">
	.app{background: #f9f9f9;}
	.list{height: 1.493333rem;line-height: 1.493333rem;font-size: 0.597333rem;padding: 0 0.512rem;background: #fff;}
	select {color: #3699FF;/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/border: none;/*很关键：将默认的select选择框样式清除*/appearance:none;-moz-appearance:none;-webkit-appearance:none;/*在选择框的最右侧中间显示小箭头图片*/background: url(../../assets/jiao.png) no-repeat right 0.170666rem / 0.256rem auto; ;/*为下拉小箭头留出一点位置，避免被文字覆盖*/padding-right: 14px;outline: none;}
	/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
	select::-ms-expand { display: none; }
	.sp{color: #3699FF;}
	.textAre{width: 100%;background: #fff;text-align: center;}
	textarea{width:14.264rem;height:2.474666rem;background:rgba(249,249,249,1);border-radius:0.213333rem;border: none;outline: none;padding: 0.512rem;}
	.submitBtn{width:5.546666rem;height:1.493333rem;background:rgba(54,153,255,1);border-radius:0.746666rem;margin: 0 auto;margin-top: 2rem;text-align: center;line-height: 1.493333rem;color: #fff;font-size: 0.682666rem;margin-bottom: 2rem;}
</style>
