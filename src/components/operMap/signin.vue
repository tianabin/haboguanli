<template>
	<div class="signin">
        <div class="head">
			<p><img src="@/assets/fan.png" alt="" @click="fan"></p>
			<p>签到</p>
		</div>
        <div class="main">
            <div class="main_one">
                <div class="main_head">
                    <el-form label-width="90px">
                        <el-form-item label="当前位置">
                            <el-input v-model="xiang"></el-input>
                        </el-form-item>
                            <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入签到内容"
                            v-model="address">
                            </el-input>
                    </el-form>
                    <el-button class="btn" @click="btn">签到</el-button>
                </div>
            </div>
            <div class="main_er">
                <div class="main_qian">
                    <p>签到记录:</p>
                    <p v-if="this.errcodes == 1">{{this.qianDao}}</p>
                    <div class="yonghu" v-for="(item,index) in result" :key="index">
                        <p>{{item.admin_name}}     {{item.create_time}}</p>
                        <p>{{item.address}}</p>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axiosHttp from '@/utils/http'
    import apilist from '@/utils/apilist'
	export default {
		data() {
			return {
                mapKey: '74c5bb25d70b21242db8c1b4810df723', //高德地图的key
                id:'',
                uid:'',
                location:'',
                address:'',
                qianDao:"",
                lat:'',
                lng:'',
                xiang:'',
                result:{},
                errcodes:1
			}
		},
		mounted() {
            loadMapApi(()=>{
		    this.orLocation()

		})
        },
        created() {
            this.id = this.$route.query.id
            this.uid = localStorage.getItem('userMapId')
            this.signin()
        },
		methods: {
            orLocation(){
                var $this = this
                var mapObj = new AMap.Map('iCenter');
                mapObj.plugin('AMap.Geolocation', function () {
                var  geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,        //显示定位按钮，默认：true
                        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    mapObj.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', function(data){

                        $this.lat = data.position.lat
                        $this.lng = data.position.lng
                        $this.xiang = data.formattedAddress
                    });//返回定位信息
                    AMap.event.addListener(geolocation, 'error',  function(err){
                        console.log('err',err)
                    });      //返回定位出错信息
                });
            },
            btn(){
                var params = {
                    customer_id:this.id,
                    uid:this.uid,
                    address:this.xiang,
                    content:this.address,
                    lat:'39.80822',
                    lng:'116.35401'
                }
                console.log(params)
                axiosHttp('post',apilist.Signin2,params).then(res =>{
                    console.log(res)
                    this.signin()
                })
            },
            fan(){
                this.$router.go(-1)
            },
            signin(){
                var params = {
                    id:this.id
                }
                axiosHttp('get',apilist.Signin,params).then(res =>{
                    // this.result = res.data.result
                    if(res.data.errcode == 1){
                        this.qianDao = res.data.errmsg
                    }else if(res.data.errcode == 0){
                        this.errcodes = 0
                        this.result = res.data.result
                    }
                    // this.result = res.data.result
                    console.log(this.result)
                })
            }
		}
    };
    function loadMapApi(cb){
		var url = 'https://webapi.amap.com/maps?v=1.4.13&key=74c5bb25d70b21242db8c1b4810df723&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Driving';
		var jsapi = document.createElement('script');
		jsapi.type = 'text/javascript';
		jsapi.charset = 'utf-8';
		jsapi.src = url;
		document.head.appendChild(jsapi);
		jsapi.onload = cb
	}
</script>

<style>
.signin{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.head{
		width: 100%;
		height: 2.17rem;
		display: flex;
		align-items: center;
        border-bottom:1px solid #cccccc; 
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
    .main{
        flex: 1;
    }
    .main_one{
        width: 100%;
        height: 9.74rem;
        margin-top: .13rem;
        border-bottom: 1px solid #cccccc;
    }
    .main_head{
        width: 90%;
        height: 100%;
        margin: auto;
    }
    .main_er{
        font-size: .65rem;
    }
    .main_qian{
        width: 90%;
        height: auto;
        margin: auto;
    }
    .main_qian p{
        margin-top: .43rem;
    }
    .btn{
        float: right;
        margin-top: .65rem;
    }
    .yonghu{

    }
</style>
