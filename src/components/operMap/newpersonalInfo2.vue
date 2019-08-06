<template>
  <div class="newpersonalInfo2">
    <div class="head">
      <van-row>
        <van-col span="8">
          <img src="@/assets/fan.png" alt @click="fan" />
        </van-col>
        <van-col span="8">店主资料</van-col>
      </van-row>
      <div class="van-hairline--bottom"></div>
    </div>
    <div class="main">
      <div class="main_one">
        <div class="mainHead">
          <div class="newpersonalInfo_head">
            <div class="newpersonalInfo_head_one">
              <dl>
                <dt>
                  <img src="@/assets/add.png" alt />
                </dt>
                <dd>
                  <div class="left">
                    <p>姓名:</p>
                    <!-- <p>美家优享</p> -->
                    <p>人脉值</p>
                  </div>
                  <div class="rig">
                    <p>
                      <img src="@/assets/collection.png" alt />
                      <span>收藏</span>
                    </p>
                    <p>
                      <img src="@/assets/collection.png" alt />
                      <span>导航</span>
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
        </div>
        <div class="mainSection">
          <div class="mainInput">
            <van-cell-group>
              <van-field
                v-model="userName"
                label="店主姓名"
                type="text"
                placeholder="请输入店铺姓名"
                rows="1"
              />
            </van-cell-group>
          </div>
          <div class="mainInput">
            <van-cell-group>
              <van-field
                v-model="userPhone"
                label="联系方式"
                type="phone"
                placeholder="请输入联系方式"
                rows="1"
              />
            </van-cell-group>
          </div>
          <div class="mainInput">
            <van-cell-group>
              <van-field
                v-model="usetStore"
                label="店铺名称"
                type="text"
                placeholder="请输入店铺名称"
                rows="1"
              />
            </van-cell-group>
          </div>
          <div class="mainInput" @click="sheng">
            <van-row>
              <van-col span="8">省市区</van-col>
              <van-col span="8">{{this.province_name}}</van-col>
              <van-col span="8">{{this.city_name}}</van-col>
              <van-col span="8">{{this.area_name}}</van-col>
            </van-row>
          </div>
          <div class="mainInput">
            <van-cell-group>
              <van-field
                v-model="userAddress"
                label="详细地址"
                type="textarea"
                placeholder="请输入详细地址"
                rows="4"
                :border="true"
              />
            </van-cell-group>
          </div>
          <div class="mainInput">
            <van-row>
              <van-col span="8">信息有效性</van-col>
              <van-col span="8">
                <van-radio v-model="message" name="valid">有效</van-radio>
              </van-col>
              <van-col span="8">
                <van-radio v-model="message" name="novalid">无效</van-radio>
              </van-col>
            </van-row>
          </div>
          <div class="mainInput">
            <van-cell-group>
              <van-field
                v-model="userArea"
                label="店铺面积"
                type="text"
                placeholder="请输入店铺面积"
                rows="1"
              />
            </van-cell-group>
          </div>
          <div class="mainInput">
            <van-cell-group>
              <van-field
                v-model="userAayAccounts"
                label="店铺日流水"
                type="text"
                placeholder="请输入店铺日流水"
                rows="1"
              />
            </van-cell-group>
          </div>
          <div class="mainInput">
            <van-cell-group>
              <van-field v-model="userAge" label="店主年龄" type="text" placeholder="请输入店主年龄" rows="1" />
            </van-cell-group>
          </div>
          <div class="mainInput">
            <van-row class="vatRow">
              <van-col span="8">开店状况</van-col>
              <van-col span="8">
                <van-radio v-model="radio" name="noopen">未开启</van-radio>
              </van-col>
              <van-col span="8">
                <van-radio v-model="radio" name="open">已开店</van-radio>
              </van-col>
            </van-row>
            <van-row class="vatRowOne">
              <van-col>
                <van-radio v-model="radio" name="have">有意向沟通中</van-radio>
              </van-col>
              <van-col>
                <van-radio v-model="radio" name="nohove">无意向</van-radio>
              </van-col>
            </van-row>
          </div>
          <div class="mainInput puID" @click="dID">
            <van-row>
              <van-col span="8">店铺ID</van-col>
              <van-col span="8">{{this.userSupplierid}}</van-col>
              <van-col span="8">{{this.dianPuName}}</van-col>
              <van-col span="8"></van-col>
            </van-row>
          </div>
          <div class="mainInput">
            <div class="door_photo">
              <div class="door_photo_test">门头照</div>
              <div class="door_photo_img" @click="uploadDoorPhone()">
                <img src="@/assets/add.png"/>
              </div>
              <div class="door_photo_img" v-if="logo_one.length > 0">
                <div v-for="(item,index) in logo_one" :key="index">
                    <img :src="item"/>
                </div>
              </div>
              <div class="door_photo_img" v-else>
                <div v-for="(item,index) in logo_one2" :key="index">
                    <img :src="item"/>
                </div>
              </div>
            </div>
          </div>
          <div class="mainInput">
            <div class="mainInput">
            <div class="door_photo">
              <div class="door_photo_test">收银照</div>
              <div class="door_photo_img" @click="uploadDoorPhone2()">
                <img src="@/assets/add.png"/>
              </div>
              <div class="door_photo_img" v-if="logo_two.length > 0">
                <div v-for="(item,index) in logo_two" :key="index">
                    <img :src="item"/>
                </div>
              </div>
              <div class="door_photo_img" v-else>
                <div v-for="(item,index) in logo_two2" :key="index">
                    <img :src="item"/>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="mainInput">
            <div class="mainInput">
            <div class="door_photo">
              <div class="door_photo_test">整体照</div>
              <div class="door_photo_img" @click="uploadDoorPhone3()">
                <img src="@/assets/add.png"/>
              </div>
              <div class="door_photo_img" v-if="logo_tree.length > 0">
                <div v-for="(item,index) in logo_tree" :key="index">
                    <img :src="item"/>
                </div>
              </div>
              <div class="door_photo_img" v-else>
                <div v-for="(item,index) in logo_tree2" :key="index">
                    <img :src="item"/>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="mainInput">
            <van-button type="info" class="btn" @click="submit">提交</van-button>
          </div>
        </div>
      </div>
    </div>
    <div class="sheng">
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-area :area-list="areaList" v-model="value" @confirm="confirm" @cancel="cancel" />
      </van-popup>
    </div>
    <div class="sheng">
      <van-popup v-model="show2" position="bottom" :style="{ height: '40%' }">
          <div class="dpId" v-for="(item,index) in dianPuId" :key="index" @click="xuanID(item)">
              <span>ID:{{item.id}}</span>
              <span>名称:{{item.name}}</span>
          </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import AreaList from "../../../static/json/data";
import axiosHttp from "@/utils/http";
import apilist from "@/utils/apilist";
import { Toast} from 'mint-ui'
export default {
  data() {
    return {
      headList: [
        {
          name: "签到",
          url: "signin",
          col:2
        },
        {
          name: "人脉分析",
          col:1
        },
        {
          name: "附近小区",
          col:1
        },
        {
          name: "电话拜访信息",
          col:1
        }
      ],
      logo: "",
      id: "", //用户的id
      uid: "", //业务员id
      message: "valid",
      radio: "nohove", //有效无效
      show: false, //弹框
      show2:false,
      areaList: AreaList, //地区选择
      value: "110101", //static defaultProps = {}
      province_name: "暂无", //省
      city_name: "暂无", //市
      area_name: "暂无", //区
      province_id: "", //省code
      city_id: "", //市code
      area_id: "", //区code
      userName: "", //店主名字
      userPhone: "", //店主手机号
      usetStore: "", //店铺名字
      userAddress: "", //详细地址
      userArea: "", //店铺面积
      userAayAccounts: "", //日流水
      userAge: "", //年龄
      userSupplierid: "请选择", //关联店铺id
      fileList: [{ url: "https://img.yzcdn.cn/vant/cat.jpeg" }], //图片
      params: "1",
      logo_one: [], //门头正面照
      logo_two: [], //收银台
      logo_tree: [], //正常陈列架
      logo_one2: [], //门头正面照
      logo_two2: [], //收银台
      logo_tree2: [], //正常陈列架
      dianPuId:{},
      dianPuName:""
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.uid = localStorage.getItem("userMapId");
    this.getUser();

    this.getWxConfig();
  },
  methods: {
      dID(){
          this.show2 = true
          var _this = this
          axiosHttp('get',apilist.List).then(res =>{
              console.log(res.data.result)
              if(res.data.errcode == 0){
                  _this.dianPuId = res.data.result
              }
          })
      },
      xuanID(item){
          var _this = this
          this.show2 = false
          _this.userSupplierid = item.id
          _this.dianPuName = item.name
      },
    getWxConfig() {
      let params = { url: window.location.href.split("#")[0] };
    //   this.params = params;
      console.log(params);
      axiosHttp("post", apilist.getWxConfig, params).then(res => {
        console.log(res.data.data);
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名，见附录1
          jsApiList: ["ready", "chooseImage", "uploadImage"], // 必填，需要使用的JS接口列表，所有JS接口列表见微信公众平台附录
          success: function(res) {
            console.log("成功", res);
          },
          fail: function(err) {
            console.log("失败", err);
          }
        });
      });
    },
    //上传
    uploadDoorPhone() {
      var _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.uploadImage({
            localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              var serverId = res.serverId; // 返回图片的服务器端ID
              // console.log(serverId)
              let params = { server_id: serverId };
              axiosHttp('post',apilist.uploadCommanderMedia,params).then(res =>{
                        _this.params = res.data.result.show_url
                        if(_this.logo_one.length >2){
                            Toast("只能上传三张")
                        }else{
                            _this.logo_one.push(res.data.result.show_url)
                        }
                //   if(res.dat.errcode==0){
                //         _this.params = res.data.result.show_url
                //         _this.logo_one.push(res.data.result.show_url)3
                // }
              })
            }
          });
        }
      });
    },
    uploadDoorPhone2() {
      var _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.uploadImage({
            localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              var serverId = res.serverId; // 返回图片的服务器端ID
              // console.log(serverId)
              let params = { server_id: serverId };
              axiosHttp('post',apilist.uploadCommanderMedia,params).then(res =>{
                        if(_this.logo_two.length >2){
                            Toast("只能上传三张")
                        }else{
                            _this.logo_two.push(res.data.result.show_url)
                        }
                //   if(res.dat.errcode==0){
                //         _this.params = res.data.result.show_url
                //         _this.logo_one.push(res.data.result.show_url)3
                // }
              })
            }
          });
        }
      });
    },
    uploadDoorPhone3() {
      var _this = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.uploadImage({
            localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              var serverId = res.serverId; // 返回图片的服务器端ID
              // console.log(serverId)
              let params = { server_id: serverId };
              axiosHttp('post',apilist.uploadCommanderMedia,params).then(res =>{
                        _this.params = res.data.result.show_url
                        if(_this.logo_tree.length >2){
                            Toast("只能上传三张")
                        }else{
                            _this.logo_tree.push(res.data.result.show_url)
                        }
                //   if(res.dat.errcode==0){
                //         _this.params = res.data.result.show_url
                //         _this.logo_one.push(res.data.result.show_url)3
                // }
              })
            }
          });
        }
      });
    },
    // afterRead() {
    //     wx.chooseImage({
    //         count: 1, // 默认9
    //         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //         success: function (res) {
    //             var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    //             console.log('sss',res)
    //         }
    //     });
    // },
    //签到
    signin(item) {
      //种子用户id
      this.$router.push({ path: item.url, query: { id: this.id } });
      //业务员id
      this.uid = localStorage.getItem("userMapId");
      if(item.col == 1){
          Toast("暂未开放")
      }
    },
    //提交
    submit() {
      if (this.message == "valid") {
        this.message = "1";
      } else if (this.message == "novalid") {
        this.message = "0";
      }
      if (this.radio == "nohove") {
        this.radio = "0";
      } else if (this.radio == "noopen") {
        this.radio = "1";
      } else if (this.radio == "hove") {
        this.radio = "2";
      } else if (this.radio == "open") {
        this.radio = "3";
      }
      let params = {
        user_name: this.userName, //店主姓名
        telphone: this.userPhone, //手机号
        store_name: this.usetStore, //店铺名称
        address: this.userAddress, //详细地址
        is_validity: this.message, //是否有效1有效0无效
        area: this.userArea, //面积
        day_accounts: this.userAayAccounts, //日流水
        age: this.userAge, //店主年龄
        status: this.radio, //开店状态
        supplier_id: this.userSupplierid, //关联店铺id
        logo_one: this.logo_one || this.logo_one2, //门头正面照
        logo_two: this.logo_two  || this.logo_two2, //收银台
        logo_tree: this.logo_tree || this.logo_tree2, //正常陈列架
        id: this.id, //种子用户id
        province_id: this.province_id, //省份code
        city_id: this.city_id, //城市code
        area_id: this.area_id, //区县code
        uid: this.uid //业务员id
      };
      console.log(params);
      axiosHttp("post", apilist.Message, params).then(res => {
        console.log(res);
        Toast("提交成功")
        this.getUser();
      });
    },
    //返回
    fan() {
      this.$router.go(-1);
    },
    //显示弹框
    sheng() {
      console.log("111");
      this.show = true;
    },
    //弹框确定
    confirm(picker) {
      this.show = false;
      // var val = picker.getValues()
      this.province_id = picker[0].code;
      this.city_id = picker[1].code;
      this.area_id = picker[2].code;
      this.province_name = picker[0].name;
      this.city_name = picker[1].name;
      this.area_name = picker[2].name;
      console.log(picker);
    },
    //弹框取消
    cancel() {
      this.show = false;
    },
    getUser() {
      let params = {
        id: this.id
      };
      console.log(params);
      axiosHttp("get", apilist.TUWEN, params).then(res => {
        console.log(res);
        this.userName = res.data.result.user_name; //店主姓名
        this.userPhone = res.data.result.telphone; //店主电话
        this.usetStore = res.data.result.store_name; //店铺名称
        this.province_name = res.data.result.province_name; //店铺地址省
        this.city_name = res.data.result.city_name; //店铺地址市
        this.area_name = res.data.result.area_name; //店铺地址区
        this.province_id = res.data.result.province_id; //店铺地址省code
        this.city_id = res.data.result.city_id; //店铺地址市code
        this.area_id = res.data.result.area_id; //店铺地址区code
        this.userAddress = res.data.result.address; //详细地址
        this.userArea = res.data.result.area; //店铺面积
        this.userAayAccounts = res.data.result.day_accounts; //日流水
        this.userAge = res.data.result.age; //店主年龄
        this.userSupplierid = res.data.result.supplier_id; //关联地铺ID
        this.logo_one2 = res.data.result.logo_one;//门头照
        this.logo_two2 = res.data.result.logo_two;//收银照
        this.logo_tree2 = res.data.result.logo_tree;//整体照
        if (res.data.result.is_validity == "1") {
          this.message = "valid";
        } else if (res.data.result.is_validity == "0") {
          this.message = "novalid";
        }
        if (res.data.result.status == "0") {
          this.radio = "nohove";
        } else if (res.data.result.status == "1") {
          this.radio = "noopen";
        } else if (res.data.result.status == "2") {
          this.radio = "hove";
        } else if (res.data.result.status == "3") {
          this.radio = "open";
        }
      });
    }
  }
};
</script>

<style>
.puID{
    height: 1.3rem;
    border-top: 1px solid #f6f6f6;
    border-bottom: 1px solid #f6f6f6;
    background: #fff;
}
.dpId{
    width: 80%;
    height: 1.3rem;
    line-height: 1.3rem;
    margin: auto;
    margin-top: .43rem;
    text-align: center;
}
.dpId span{
    margin-right: .22rem;
    font-size: .65rem;
}
.door_photo {
  padding: 0.510638rem;
  background: #fff;
}
.door_photo_test {
  font-size: 0.595744rem;
  color: #333;
}
.door_photo_img {
  margin-top: 0.510638rem;
  display: flex;
  margin-left: 0.510638rem;
}
.door_photo_img img {
  width: 2.127659rem;
  height: 2.127659rem;
  border-radius: 0.212765rem;
  margin-right: 0.340425rem;
}
.newpersonalInfo2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.head {
  width: 100%;
  height: 6%;
  font-size: 0.6rem;
}
.head img {
  width: 1.13rem;
  height: 1.1rem;
  margin-left: 0.43rem;
}
.van-row {
  height: 100%;
  display: flex;
  align-items: center;
}
.van-row div:nth-of-type(2) {
  text-align: center;
}
.main {
  flex: 1;
  overflow: scroll;
}
.main::-webkit-scrollbar {
  display: none;
}
.main_one {
  width: 90%;
  height: 100%;
  margin: auto;
}
.mainHead {
  width: 100%;
  height: auto;
}
.newpersonalInfo_head_one {
  width: 100%;
  height: 4.35rem;
}
.newpersonalInfo_head_one dl {
  width: 100%;
  height: 100%;
  display: flex;
}
.newpersonalInfo_head_one dl dt {
  flex: 2;
  display: flex;
  align-items: center;
}
.newpersonalInfo_head_one dl dd {
  flex: 8;
  display: flex;
}
.newpersonalInfo_head_one dl dt img {
  width: 2.17rem;
  height: 2.17rem;
  margin: auto;
}
.left {
  flex: 7;
}
.left p {
  font-size: 12px;
  margin-top: 0.65rem;
  color: #606266;
}
.left p:nth-of-type(2) {
  width: 2.52rem;
  height: 0.9rem;
  border: 1px solid #606266;
  text-align: center;
  line-height: 0.9rem;
  border-radius: 0.22rem;
}
.rig {
  flex: 3;
  display: flex;
  flex-direction: column;
}
.rig p {
  flex: 1;
  display: flex;
  align-items: center;
  text-align: center;
  color: #606266;
}
.rig p img {
  width: 0.65rem;
  height: 0.65rem;
}
.rig p span {
  font-size: 12px;
  margin-left: 0.43rem;
  color: #606266;
  margin-right: 0.22rem;
}
.newpersonalInfo_head_er ul {
  display: flex;
  flex-wrap: wrap;
}
.newpersonalInfo_head_er ul li {
  width: 29%;
  font-size: 12px;
  height: 1.22rem;
  line-height: 1.22rem;
  color: #606266;
  border-radius: 0.22rem;
  border: 1px solid #606266;
  text-align: center;
  margin-left: 0.22rem;
  margin-right: 0.22rem;
  margin-top: 0.33rem;
}
.mainSection {
  width: 100%;
  height: auto;
  overflow: scroll;
  overflow-x: hidden;
}
.mainSection::-webkit-scrollbar {
  display: none;
}
.mainInput {
  margin-top: 0.43rem;
}
.mainInput .van-row .van-col {
  font-size: 14px;
  color: #323233;
  text-align: center;
}
#van-cell-group {
  border: 0;
}
.vatRow {
  display: flex;
  flex-wrap: wrap;
}
.vatRow div:nth-of-type(1) {
  text-align: left;
}
.vatRowOne {
  width: 100%;
  display: flex;
  margin-left: 4.8rem;
  margin-top: 0.43rem;
}
.vatRowOne .van-radio {
  flex: 1;
  text-align: right;
}
.sheng {
  display: block;
}
.xianshi {
  display: none;
}
.mainInput p {
  font-size: 14px;
  color: #323233;
  margin-left: 0.5rem;
  margin-bottom: 0.43rem;
}
.btn {
  width: 100%;
}
</style>
