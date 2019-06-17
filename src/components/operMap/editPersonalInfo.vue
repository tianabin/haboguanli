<template>
	<div class="app" :style="'height:'+sHeight+'px'">
		<div class="wrap">
			<div class="herder">
				<div class="header_lf">
					<img :src="data.header_url"/>
				    <div>{{data.wx_name}}</div>
				</div>
			</div>
			<div class="info_div"><div>联系人</div><div><input type="text" placeholder="请输入联系人" v-model="data.user_name" /></div></div>
			<div class="info_div"><div>联系方式</div><div><input type="text" placeholder="请输入联系方式"  v-model="data.telphone" /></div></div>
			<div class="info_div"><div>小区</div><div><input type="text" placeholder="请输入小区" v-model="data.cummunity_name" /></div></div>
			<div class="info_div" @click="showPicker" style="margin-bottom: 0.340425rem;"><div>身份</div><div>
				<input type="text" disabled="disabled"  placeholder="请输入小区" v-model="identity" />
				<mt-popup v-model="popupVisible"  closeOnClickModal='true' position="bottom" class="mint-popup">
				   <mt-picker  :slots="slots" @change="onValuesChange"></mt-picker>
				</mt-popup>
			</div></div>
			
			<div class="info_div"><div>类型</div><div><input type="text" placeholder="请输入类型" v-model="data.type" /></div></div>
			<div class="info_div"><div>店名</div><div><input type="text" placeholder="请输入店名" v-model="data.store_name" /></div></div>
			<div class="info_div" style="margin-bottom: 0.340425rem;"><div>详细地址</div><div><input type="text" placeholder="请输入详细地址" v-model="data.address" /></div></div>
			<div class="door_photo">
				<div class="door_photo_test">门头照</div>
				<div class="door_photo_img" @click="uploadDoorPhone()">
					<img :src="logo"/>
				</div>
			</div>
			
			<div class="submit_btn" @click="submitInfo()">
				提交
			</div>
			
		</div>
	</div>
</template>

<script>
	import { Toast,Picker,Popup } from 'mint-ui'
	import Tabnav from "../tabNav/tebNav"
//	import wx from 'weixin-js-sdk'
	export default{
		data(){
			return{
				id:"",
				user_id:window.localStorage.getItem('userMapId'),
				erp_user_id:window.localStorage.getItem('erp_user_id'),
				data:{},
				logo:'',
				identity:'',
				popupVisible:false,
//				slots:[{value:'团长'},{value:'店铺'},{value:'经销商'},{value:'品牌方'}],
				slots:[{values:['团长','店铺','经销商','品牌方']}]
			}
		},
		created(){
			this.id=this.$route.query.id;
			this.sHeight=document.documentElement.clientHeight;
			document.title = '团长信息';
			this.getConfig()
			this.getCommanderInfo()
		},
		  mounted(){
			mui.back = function() {
				window.history.go(-1);
			}
		},
		methods:{
			showPicker(){
				this.popupVisible=true
			},
			onValuesChange(picker, values) {
				let _this=this;
			    // console.log(values[0])
			      this.identity=values[0]
			      if(values[0]=='团长'){
			      	_this.data.identity=0
			      }else if(values[0]=='店铺'){
			      	_this.data.identity=1
			      }else if(values[0]=='经销商'){
			      	_this.data.identity=2
			      }else if(values[0]=='品牌方'){
			      	_this.data.identity=3
			      }
			      // console.log(_this.data)
			      _this.popupVisible=false
//			    this.popupVisible=false  
		    },
			uploadDoorPhone(){
				let _this=this;
				wx.chooseImage({  //选择图片
		          count:1, // 默认9
		          sizeType:['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
		          sourceType:['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
		          success: function (res) {
		              //返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		              //上传图片接口
		              // console.log(res)
		              var localIds = res.localIds[0];
		              wx.uploadImage({
						    localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
						    isShowProgressTips: 1, // 默认为1，显示进度提示
						    success: function (res) {
								// console.log(res)
						        var serverId = res.serverId; // 返回图片的服务器端ID
						        // console.log(serverId)
						        let params = {server_id:serverId};
									_this.apiAxios.uploadCommanderMedia(params).then(res => {
										// console.log(res)
										if(res.errcode==0){
										 _this.data.logo=res.result.save_url
										 _this.logo=res.result.show_url
										}
									}).catch(err => {
										// Toast(err.errmsg)
									})
						       }
						});
		          },
		          fail: function (res) {
		              Toast('选择图片失败')
		          }
		        });
			},
			getConfig(){
				let $v=this;
			  	let params = {url:window.location.href.split('#')[0]};
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
					// console.log(err)
			  	  // Toast(err.msg)
			  	})
			},
			submitInfo(){
				let _this=this;
				let params = _this.data;
				console.log(params)
					_this.apiAxios.updateCommanderInfo(params).then(res => {
						console.log(res)
						if(res.errcode==0){
							Toast('修改成功')
						}
					}).catch(err => {
						Toast(err.errmsg)
					})
			},
			getCommanderInfo(){
				let _this=this;
				let params = {user_id:_this.user_id,erp_user_id:_this.erp_user_id,id:_this.id};
					_this.apiAxios.getCommanderInfo(params).then(res => {
//						console.log(res)
						if(res.errcode==0){
							res.result.user_id=_this.user_id
							res.result.erp_user_id=_this.erp_user_id
							if(!res.result.logo){
								 _this.logo='https://btj.yundian168.com/biz/baseImg/add.png'
							}else{
								 _this.logo='https://btjapi.yundian168.com'+res.result.logo
							}
							if(res.result.identity==0){
						      	_this.identity='团长'
						      }else if(res.result.identity==1){
						      	_this.identity='店铺'
						      }else if(res.result.identity==2){
						      	_this.identity='经销商'
						      }else if(res.result.identity==3){
						      	_this.identity='品牌方'
						      }
							_this.data=res.result
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
	input, button, select, textarea {
		outline: none;
		-webkit-appearance: none;
		border-radius: 0;
		border: none;
		}
	.app{background: #F9F9F9;}
	.herder{ height: 2.425531rem; background: #fff; padding: 0 0.510638rem; margin-bottom: 0.340425rem; display: flex;}
	.herder img{ width: 1.702127rem; height: 1.702127rem; border-radius: 50%; margin-top: 0.340425rem; margin-right: 0.340425rem;}
	.header_lf{ width: 55%; display: flex; font-size: 0.680851rem; color: #333; font-weight: 600; line-height: 2.425531rem; overflow: hidden;}
	.info_div{ height: 1.489361rem; line-height: 1.489361rem; background: #fff; color: #333; font-size: 0.595744rem; padding: 0 0.510638rem; display: flex; justify-content: space-between;}
	.info_div input{ height: 1.489361rem; background: #fff; text-align: right; color: #333;}
	.info_div img{ width: 0.319148rem; height: 0.680851rem; }
	.door_photo{ padding:0.510638rem; background: #fff;}
	.door_photo_test{ font-size: 0.595744rem; color: #333;}
	.door_photo_img{ margin-top: 0.510638rem;}
	.door_photo_img img{ width: 2.127659rem; height: 2.127659rem; border-radius: 0.212765rem; margin-right: 0.340425rem;}
	.submit_btn{ width: 5.531914rem; height: 1.489361rem; background: #3699FF; text-align: center; line-height: 1.489361rem; color: #fff; font-size: 0.680851rem; margin: 0 auto; border-radius: 0.74468rem; margin-top: 4.255319rem;}
	.mint-popup{ width: 100%; color: #333;}
</style>