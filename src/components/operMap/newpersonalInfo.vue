<template>
	<div class="newpersonalInfo">
		<div class="head">
			<p><img src="@/assets/fan.png" alt="" @click="fan"></p>
			<p>店铺资料</p>
		</div>
		<div class="main">
			<div class="newpersonalInfo_head">
			<div class="newpersonalInfo_head_one">
				<dl>
					<dt><img src="@/assets/add.png" alt=""></dt>
					<dd>
						<div class="left">
							<p>姓名:{{this.user.user_name}}</p>
							<p>美家优享</p>
							<p>人脉值</p>
						</div>
						<div class="rig">
							<p>
								<img src="@/assets/collection.png" alt=""> <span>收藏</span>
							</p>
							<p>
								<img src="@/assets/collection.png" alt=""> <span>导航</span>
							</p>
						</div>
					</dd>
				</dl>
				</div>
			</div>
			<div class="newpersonalInfo_head_er">
				<ul>
					<li v-for="(item,index) in headList" :key="index" @click="signin(item)">{{item.name}}</li>
				</ul>
			</div>
			<div class="newpersonalInfo_main">
			<el-form label-width="90px">
				<el-form-item label="店主姓名">
					<el-input v-model="userName"></el-input>
				</el-form-item>
				<el-form-item label="联系方式">
					<el-input v-model="userTelphone"></el-input>
				</el-form-item>
				<el-form-item label="店铺名称">
					<el-input v-model="userStoreName"></el-input>
				</el-form-item>
				<el-form-item label="省市区">
					<div class="xuanze">
						<div class="sheng" @click="shenghui">
							{{this.sheng == null ?'请选择省':this.sheng}}
						</div>
						<ul :class="disply?'xianshi':'yincang'">
								<li v-for="(item,index) in areaList" :key="index" @click="xuangze(item)">{{item.areaName}}</li>
						</ul>
						<div class="sheng2" @click="shenghui2">
							{{this.sheng2== null?'请选择市':this.sheng2}}
						</div>
						<ul :class="disply2?'xianshi2':'yincang2'">
								<li v-for="(item,index) in areaList2" :key="index" @click="xuangze2(item)">{{item.areaName}}</li>
						</ul>

						 <div class="sheng3" @click="shenghui3">
							{{this.sheng3== null?'请选择区':this.sheng3}}
						</div>
						<ul :class="disply3?'xianshi3':'yincang3'">
								<li v-for="(item,index) in areaList3" :key="index" @click="xuangze3(item)">{{item.areaName}}</li>
						</ul>
					</div>
				</el-form-item>
				<el-form-item label="详细地址">
					<el-input
					type="textarea"
					:rows="2"
					placeholder="请输入内容"
					v-model="address">
					</el-input>
				</el-form-item>
				<el-form-item label="信息有效性">
					<!-- 标记一下 -->
						<el-radio  v-model="message" label = "valid">有效</el-radio>		
						<el-radio  v-model="message" label = "novalid">无效</el-radio>
					</el-form-item>
				<el-form-item label="店铺面积">
					<el-input v-model="userArea"></el-input>
				</el-form-item>
				<el-form-item label="店铺日流水">
					<el-input v-model="dayAccounts"></el-input>
				</el-form-item>
				<el-form-item label="店铺年龄">
					<el-input v-model="userAge"></el-input>
				</el-form-item>
					<el-form-item label="开店状态">
						<el-radio v-model="radio" label="noopen">未开启</el-radio>
						<el-radio v-model="radio" label="open">已开启</el-radio>
						<el-radio v-model="radio" label="have">有意向沟通中</el-radio>
						<el-radio v-model="radio" label="nohove">无意向</el-radio>
					</el-form-item>
				<el-form-item label="店铺ID">
					<el-input v-model="supplierId"></el-input>
					<!-- <el-select v-model="region" placeholder="请选择ID">
						<el-option v-model="value" ></el-option>
						<el-option v-model="value"></el-option>
					</el-select> -->
				</el-form-item>

			</el-form>
			<div class="shang">
				<div>
					<div class="door_photo">
						<div class="door_photo_test">门头照</div>
						<div class="door_photo_img" @click="uploadDoorPhone()">
							<img :src="imageUrl"/>
						</div>
					</div>
				</div>
				<div>
					<div class="door_photo">
						<div class="door_photo_test">收银照片</div>
						<div class="door_photo_img" @click="uploadDoorPhone()">
							<img :src="imageUrl"/>
						</div>
					</div>
				</div>
				<div>
					<div class="door_photo">
						<div class="door_photo_test">整体照</div>
						<div class="door_photo_img" @click="uploadDoorPhone()">
							<img :src="imageUrl"/>
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
		<div class="footer" @click="add">
			提交
		</div>
	</div>
</template>

<script>
	import { Toast,Picker,Popup } from 'mint-ui'
	import Tabnav from "../tabNav/tebNav"
	import qs from 'qs'
	import axiosHttp from '@/utils/http'
	import apilist from '@/utils/apilist'
	import { Area } from 'vant';
	// import wx from 'weixin-js-sdk'
	export default{
		data(){
			return{
				headList:[
					{
						name:'签到',
						url:'signin'
					},
					{
						name:'人脉分析'
					},
					{
						name:'附近小区'
					},
					{
						name:'电话拜访信息'
					}
				],
				region:{},//省
				message:'novalid',
				imageUrl:"https://btj.yundian168.com/biz/baseImg/add.png",
				radio:'nohove',
				value:'',
				data:{},
				id:'',
				user:{},
				show: false,
				address: '',
				areaList:{},
				sheng:'',
				sheng2:"",
				sheng3:'',
				disply:false,
				disply2:false,
				disply3:false,
				areaList2:{},
				areaList3:{},
				userName:'',
				userTelphone:'',
				userArea:'',
				dayAccounts:'',
				userAge:'',
				address:'',
				userStoreName:'',
				supplierId:'',
				province_id:'',
				city_id:'',
				area_id:'',
				uid:''
			}
		},
		components:{
			Tabnav:Tabnav
		},
		created() {
			this.id = this.$route.query.id
			this.details()
		},
		methods: {
			signin(item){
				//种子用户id
				this.$router.push({path:item.url,query:{id:this.id}});
				//业务员id
				this.uid = localStorage.getItem('userMapId')
			},
			fan(){
				this.$router.go(-1)
			},
			//门头照
			uploadDoorPhone(){
				// wx.chooseImage({
				// 	count: 1,
				// 	sizeType: ['original', 'compressed'],
				// 	sourceType: ['album', 'camera'],
				// 	success (res) {
				// 		alert(res)
				// 		console.log(res)
				// 		// tempFilePath可以作为img标签的src属性显示图片
				// 		// const tempFilePaths = res.tempFilePaths
				// 	}
				// })
				// let _this=this;
				// wx.chooseImage({  //选择图片
		        //   count:1, // 默认9
		        //   sizeType:['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
		        //   sourceType:['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
		        //   success: function (res) {
		        //       //返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        //       //上传图片接口
		        //       // console.log(res)
		        //       var localIds = res.localIds[0];
		        //       wx.uploadImage({
				// 		    localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
				// 		    isShowProgressTips: 1, // 默认为1，显示进度提示
				// 		    success: function (res) {
				// 				// console.log(res)
				// 		        var serverId = res.serverId; // 返回图片的服务器端ID
				// 		        // console.log(serverId)
				// 				let params = {server_id:serverId};
				// 					axiosHttp('post',apilist.uploadCommanderMedia,params).then(res =>{
				// 						console.log(res)
				// 					})
				// 					// _this.apiAxios.uploadCommanderMedia(params).then(res => {
				// 					// 	// console.log(res)
				// 					// 	if(res.errcode==0){
				// 					// 	 _this.data.logo=res.result.show_url
				// 					// 	 _this.logo=res.result.show_url
				// 					// 	}
				// 					// }).catch(err => {
				// 					// 	// Toast(err.errmsg)
				// 					// })
				// 		       }
				// 		});
		        //   },
		        //   fail: function (res) {
		        //       Toast('选择图片失败')
		        //   }
		        // });
			},
			//提交
			add(){
				var _this = this
				if(_this.message == 'valid'){
						_this.message = '1'
					}else if(_this.message == 'novalid'){
						_this.message = '0'
					}
					if(_this.radio == 'nohove'){
						_this.radio = '0'
					}else if(_this.radio == 'noopen'){
						_this.radio = '1'
					}else if(_this.radio == 'hove'){
						_this.radio = '2'
					}else if(_this.radio == 'open'){
						_this.radio = '3'
					}
				let params = {
					user_name:_this.userName,	//店主姓名
					telphone:_this.userTelphone,	//手机号
					store_name:_this.userStoreName,	//店铺名称
					address:_this.address,		//详细地址
					is_validity:_this.message,	//是否有效1有效0无效
					area:_this.userArea,		//面积
					day_accounts:_this.dayAccounts,//日流水
					age:_this.userAge,			//店主年龄
					status:_this.radio,		//开店状态
					supplier_id:_this.supplierId,	//关联店铺id
					logo_one:_this.imageUrl,	//门头正面照
					logo_two:_this.imageUrl,	//收银台
					logo_tree:_this.imageUrl,	//正常陈列架
					id:_this.id,			//种子用户id
					province_id:_this.province_id,	//省份code
					city_id:_this.city_id,		//城市code
					area_id:_this.area_id,		//区县code
					uid:_this.uid				//业务员id		
				}
				console.log(params)
				axiosHttp('post',apilist.Message,params).then(res =>{
					console.log(res)
					this.details()
				})
			},
			//省
			shenghui(){
				if(this.disply){
					this.disply = false
				}else{
					this.disply = true
				}
				let params = {
					pid:0
				}
				axiosHttp('post',apilist.Province,params).then(res =>{
					this.areaList = res.data
					console.log(this.areaList)
				})
			},

			xuangze(item){
				this.sheng = item.areaName
				this.province_id = item.areacode
				this.disply = false
				// console.log(item)
				let params = {
					pid:item.areacode
				}
				axiosHttp('post',apilist.Province,params).then(res =>{
					this.areaList2 = res.data
					// console.log(this.areaList2)
				})
			},
			//市
			shenghui2(){
				if(this.disply2){
					this.disply2 = false
				}else{
					this.disply2 = true
				}
			},
			xuangze2(item){
				this.disply2 = false
				this.sheng2 = item.areaName
				this.city_id = item.areacode
				let params = {
					pid:item.areacode
				}
				axiosHttp('post',apilist.Province,params).then(res =>{
					this.areaList3 = res.data
					// console.log(this.areaList3)
				})
			},
			//区
			shenghui3(){
				if(this.disply3){
					this.disply3 = false
				}else{
					this.disply3 = true
				}
			},
			xuangze3(item){
				this.disply3 = false
				this.sheng3 = item.areaName
				this.area_id = item.areacode
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				// console.log(res)
			},
			//店铺的信息
			details(){
				var _this = this
				var params = {
					id:_this.id
				}
				axiosHttp('get',apilist.TUWEN,params).then(res=>{
					_this.user = res.data.result
					_this.userName = _this.user.user_name
					_this.userTelphone = _this.user.telphone
					_this.userArea = _this.user.area
					_this.userStoreName = _this.user.store_name
					_this.dayAccounts = _this.user.day_accounts
					_this.userAge = _this.user.age
					_this.sheng = _this.user.province_name
					_this.sheng2 = _this.user.city_name
					_this.sheng3 = _this.user.area_name
					_this.address = _this.user.address
					_this.supplierId = _this.user.supplier_id
					if(_this.user.is_validity == '1'){
						_this.message = 'valid'
					}else if(_this.user.is_validity == '0'){
						_this.message = 'novalid'
					}
					if(_this.user.status == '0'){
						_this.radio = 'nohove'
					}else if(_this.user.status == '1'){
						_this.radio = 'noopen'
					}else if(_this.user.status == '2'){
						_this.radio = 'hove'
					}else if(_this.user.status == '3'){
						_this.radio = 'open'
					}
					console.log(_this.user)
				})
			},
		},
	}
</script>

<style scoped="scoped">
.el-radio{
	text-align: center;
}
.door_photo{ padding:0.510638rem; background: #fff;}
.door_photo_test{ font-size: 0.595744rem; color: #333;}
.door_photo_img{ margin-top: 0.510638rem;}
.door_photo_img img{ width: 2.127659rem; height: 2.127659rem; border-radius: 0.212765rem; margin-right: 0.340425rem;}
.sheng{
	height: 3.91rem;
	position: relative;
	margin-bottom: .43rem;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang{
	position:absolute;
	top:1.35rem;
	left: 0px;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 2.17rem;
	  display: none;
}
.yincang li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang::-webkit-scrollbar{
	display: none;
}
.xianshi{
	display: block;
	position:absolute;
	top:1.35rem;
	left: 0px;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 2.17rem;
}
.xianshi li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.xianshi::-webkit-scrollbar{
	display: none;
}
.sheng2{
	height: 3.91rem;
	margin-bottom: .43rem;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang2{
	position:absolute;
	top:1.35rem;
	left: 3.5rem;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 2.17rem;
	  display: none;
}
.yincang2 li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang2::-webkit-scrollbar{
	display: none;
}
.xianshi2{
	position:absolute;
	top:1.35rem;
	left: 3.5rem;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 2.17rem;
	  display: block
}
.xianshi2 li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.xianshi2::-webkit-scrollbar{
	display: none;
}
.sheng3{
	height: 3.91rem;
	margin-bottom: .43rem;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang3{
	display: none;
	position: absolute;
	top:1.35rem;
	right:1.09rem;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 2.17rem;

}
.yincang3 li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang3::-webkit-scrollbar{
	display: none;
}
.xianshi3{
	position: absolute;
	top:1.35rem;
	right:1.09rem;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 2.17rem;
	display: block;
}
.xianshi3 li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.xianshi3::-webkit-scrollbar{
	display: none;
}
.xuanze{
	display: flex;
}
.xuanze div{
	flex: 1;
}
.el-select{
	margin-top: .22rem;
}
.shang{
	margin-top:1.09rem; 
	margin-bottom: .43rem;
	display: flex;
	font-size: .48rem;
}
.shang div{
	margin-left: .22rem;
}
.shang p{
	width: 90px;
	text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
	border: 1px dashed #cccccc;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
	.el-radio-group{
		margin-left: .65rem;
	}
	.el-radio{
		margin-bottom: .43rem;
	}
	.el-form-item{
		margin-top: .43rem;
	}
	.el-radio__input{
		width: 1.09rem;
		height: 1.09rem;
	}
	.van-radio{
		margin-left: .43rem;
	}
	.head{
		width: 100%;
		height: 2.17rem;
		display: flex;
		align-items: center;
	}
	.head p:nth-of-type(1){
		flex: 1;
	}
	.head p img{
		width: 1.09rem;
		height: 1.09rem;
		margin: auto;
	}
	.head p:nth-of-type(2){
		flex: 9;
		text-align: center;
		font-size: 16px;
	}
	.newpersonalInfo{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.main{
		flex: 1;
		overflow: scroll;
	}
	.newpersonalInfo_head{
		width: 100%;
		height:auto;
	}
	.newpersonalInfo_head_one{
		width: 100%;
		height: 4.35rem;
	}
	.newpersonalInfo_head_one dl{
		width: 100%;
		height:100%;
		display: flex;
	}
	.newpersonalInfo_head_one dl dt{
		flex: 2;
		display: flex;
		align-items: center;
	}
	.newpersonalInfo_head_one dl dd{
		flex: 8;
		display: flex;
	}
	.newpersonalInfo_head_one dl dt img{
		width: 2.17rem;
		height: 2.17rem;
		margin: auto;
	}
	.left{
		flex: 7;
	}
	.left p{
		font-size: 12px;
		margin-top: .65rem;
		    color: #606266;
	}
	.left p:nth-of-type(2){
		width: 2.52rem;
		height: .9rem;
		border: 1px solid #606266;
		text-align: center;
		line-height: .9rem;
		border-radius: .22rem;
	}
	.rig{
		flex: 3;
		display: flex;
		flex-direction: column;
	}
	.rig p{
		flex: 1;
		display: flex;
		align-items: center;
		text-align: center;
		color: #606266;
	}
	.rig p img{
		width: .65rem;
		height: .65rem;
	}
	.rig p span{
		font-size: 12px;
		margin-left: .43rem;
	    color: #606266; 
		margin-right: .22rem;
	}
	.newpersonalInfo_head_er ul{
		display: flex;
		flex-wrap: wrap;
	}
	.newpersonalInfo_head_er ul li{
		width: 29%;
		font-size: 12px;
		height: 1.22rem;
		line-height: 1.22rem;
		color: #606266;
		border-radius:.22rem;
		border: 1px solid #606266; 
		text-align: center;
		margin-left: .22rem;
		margin-right: .22rem;
		margin-top: .33rem;
	}
	.newpersonalInfo_main{
		width: 90%;
		height: auto;
		margin: auto;
	}
	.footer{
		width: 100%;
		height: 1.3rem;
		text-align: center;
		line-height: 1.3rem;
		font-size: 14px;
		background: skyblue;
		color: #ffffff;
	}
</style>
