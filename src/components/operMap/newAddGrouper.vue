<template>
	<div class="addGrouper">
        <div class="mainInput">
            <van-cell-group :border=false>
                <van-field  v-model="userName"  label="联系人：" type="text" placeholder="请输入联系人" rows="1" />
            </van-cell-group>
        </div>
        <div class="mainInput">
            <van-cell-group :border=false>
                <van-field    label="小区名称：" type="text" placeholder="请输入小区名称" rows="1" v-model="xiaoqu"/>
            </van-cell-group>
        </div>
        <div class="mainInput">
            <van-cell-group :border=false>
                <van-field  v-model="phone"  label="手机号:" type="text" placeholder="请输入手机号" rows="1" />
            </van-cell-group>
        </div>
        <div class="mainInput" @click="sheng">
            <van-row>
                <van-col span="8">省市区</van-col>
                <van-col span="8" >{{this.province_name}}</van-col>
                <van-col span="8">{{this.city_name}}</van-col>
                <van-col span="8">{{this.area_name}}</van-col>
            </van-row>
        </div>
        <div class="mainInput">
            <van-cell-group :border=false>
                <van-field  v-model="address"  label="详细地址" type="text" placeholder="请输入详细地址" rows="1" />
            </van-cell-group>
        </div>
        <div class="mainInput">
             <van-button type="default" @click="submit" class="btn">提交</van-button>
        </div>
        <div class="sheng">
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                <van-area :area-list="areaList" v-model="value"  @confirm="confirm" @cancel="cancel" />
            </van-popup>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import AreaList from '../../../static/json/data'
import axiosHttp from '@/utils/http'
	import apilist from '@/utils/apilist'
	export default {
		data() {
			return {
                userName:'',
                province_name:'请选择',
                city_name:'请选择',
                area_name:'请选择',
                province_id:'',
                city_id:'',
                area_id:'',
                areaList:AreaList,
                show:false,
                value:'110000',
                address:'',
                user_id:'',
                erp_user_id:'',
                phone:'',
                xiaoqu:''
			}
        },
        created() {
            this.user_id = window.localStorage.getItem('userMapId')
            this.erp_user_id = window.localStorage.getItem('erp_user_id')
        },
        methods: {
            //提交
            submit(){
                let _this=this;
		if(this.userName== ""){
			Toast('请输入联系人')
		}else if(this.address == ""){
			Toast('请输入详细地址')
		}else if(!this.user_id || !this.erp_user_id){
			this.$router.push({path:'/'});
		}else{
		   let params = {
			   				user_name:this.userName,
							telphone:this.phone,
							address:this.address,
							province_id:this.province_id,
							city_id:this.city_id,
							area_id:this.area_id,
							uid:this.user_id,
						};
						console.log(params)
				axiosHttp('post',apilist.seedUser,params).then(res =>{
					console.log(res)
					if(res.data.errcode == 0){
						Toast('创建成功')
						this.$router.push({path:'/personalinfo',query:{id:res.data.result}});
					}else if(res.data.errcode == 1){
						Toast(res.data.errmsg)
					}
				})
		}
            },
            //点击显示弹框
            sheng(){
                this.show = true
            },
            //确定
            confirm(picker){
                this.show = false
                // var val = picker.getValues()
                this.province_id = picker[0].code
                this.city_id = picker[1].code
                this.area_id = picker[2].code
                this.province_name = picker[0].name
                this.city_name = picker[1].name
                this.area_name = picker[2].name
                console.log(picker)
            },
            //取消
            cancel(){
                this.show = false
            }
        },
	};
</script>

<style>
.addGrouper{
    width: 100%;
    height: 100%;
}
.van-row{
    height: 100%;
    display: flex;
    align-items: center;
}
.mainInput{
    margin-top: .43rem;
}
.mainInput .van-row .van-col{
    font-size: 14px;
    color: #323233;
    text-align: center;
}
.btn{
    width: 90%;
    margin: auto;
}
</style>
