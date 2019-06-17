/*
 * 使用
 * @1.GET 无参数： const test1 = () 		=> {return axios({ method: 'get', url: '/api/test1' })};
 * @2.GET 有参数： const test2 = param => {return axios({ method: 'get', url: urlParams('/api/test2',param) })};
 *
 * @3.POST		   ： const test3 = param => {return axios({ method: 'post', url: '/api/test3', data : qs.stringify(param) })};
 * */
import axios from './api.method'
import urlParams from './api.url.change'
import qs from 'qs';
// 登录
const login = param => {return axios({ method: 'post', url: '/saller/login2', data : qs.stringify(param) })};
//获取标签
const getTags = param => {return axios({ method: 'get', url: urlParams('connection/get_tags',param) })};
//获取团长列表
const getGroupers = param => {return axios({ method: 'get', url: urlParams('connection/get_groupers',param) })};
//获取团长群列表1
const getGroups = param => {return axios({ method: 'get', url: urlParams('connection/get_groups',param) })};
// 添加标签
const addTag = param => {return axios({ method: 'post', url: 'connection/add_tag', data : qs.stringify(param) })};
//获取团长群列表2
const getGroupList = param => {return axios({ method: 'get', url: urlParams('connection/get_my_groups',param) })};
// 开关群显示
const openMyGroup = param => {return axios({ method: 'post', url: 'connection/open_my_group', data : qs.stringify(param) })};
//获取群分析
const getGroupStat = param => {return axios({ method: 'get', url: urlParams('connection/get_group_stat',param) })};
//获取群详细信息
const getGroupInfo = param => {return axios({ method: 'get', url: urlParams('connection/get_group_info',param) })};
//获取群详细信息
const getGroupMembers = param => {return axios({ method: 'get', url: urlParams('connection/get_group_members',param) })};
// 获取团长信息
const getCustomerInfo = param => {return axios({ method: 'post', url: 'connection/get_customer_info', data : qs.stringify(param) })};
// 获取团长标签
const getCustomerTags = param => {return axios({ method: 'post', url: 'connection/get_customer_tags', data : qs.stringify(param) })};
// 获取团长标签
const getCustomerGroup = param => {return axios({ method: 'post', url: 'connection/get_customer_group', data : qs.stringify(param) })};
//个人中心
const getUserInfo = param => {return axios({ method: 'get', url: urlParams('connection/get_user_data',param) })};
//首次登录团长列表
const getPreGrou = param => {return axios({ method: 'get', url: urlParams('connection/get_first_login_groupers',param) })};
//团长分析报告
const getGrouperParse = param => {return axios({ method: 'get', url: urlParams('connection/get_groupers_parse',param) })};
//团长的群
const getPreGorList = param => {return axios({ method: 'get', url: urlParams('connection/get_grouper_groups',param) })};
//删除标签
const delFn = param => {return axios({ method: 'get', url: urlParams('connection/del_tag',param) })};
//创建团长
const createCommander = param => {return axios({ method: 'post', url: urlParams('saller/create_commander',param) })};
//地图五公里数据
const getMapData = param => {return axios({ method: 'get', url: urlParams('connection/get_range_data',param) })};
// 完成排线
const setLinePlan = param => {return axios({ method: 'post', url: 'connection/set_line_plan', data : qs.stringify(param) })};
//获取工作计划
const getLinePlanList = param => {return axios({ method: 'get', url: urlParams('connection/get_line_plan',param) })};
// 获取微信权限
const getWxConfig = param => {return axios({ method: 'post', url:'tools/getsignpackage', data : qs.stringify(param) })};
//地图页获取团长信息
const getMapCustomer = param => {return axios({ method: 'get', url: urlParams('connection/get_map_customer',param) })};
//获取小区信息
const getMapVillage = param => {return axios({ method: 'get', url: urlParams('connection/get_map_village',param) })};
// 获取拜访记录
const getCommanderSignlist = param => {return axios({ method: 'post', url:'saller/get_commander_signlist', data : qs.stringify(param) })};
// 获取已安装记录
const getInstalledList = param => {return axios({ method: 'post', url:'saller/get_installed_list', data : qs.stringify(param) })};
// 获取团长列表
const getCommanderList = param => {return axios({ method: 'post', url:'saller/get_commander_list', data : qs.stringify(param) })};
// 获取团长基本信息
const getCommanderInfo = param => {return axios({ method: 'post', url:'saller/get_commander_info', data : qs.stringify(param) })};
// 修改团长信息
const updateCommanderInfo = param => {return axios({ method: 'post', url:'saller/update_commander_info', data : qs.stringify(param) })};
//获取小区周边团长信息
const getVilGrouper = param => {return axios({ method: 'get', url: urlParams('connection/get_village_grouper',param) })};
// 商圈筛选
const setVillageGrouper = param => {return axios({ method: 'post', url:'connection/set_village_grouper', data : qs.stringify(param) })};
// 上传图片
const uploadCommanderMedia = param => {return axios({ method: 'post', url:'tools/upload_commander_media', data : qs.stringify(param) })};
// 签到接口
const commanderSignIn = param => {return axios({ method: 'post', url:'saller/commander_sign_in', data : qs.stringify(param)})};
// 获取二维码
const getCommanderCode = param => {return axios({ method: 'post', url:'tools/get_commander_code', data : qs.stringify(param)})};
// 绑定
const getCommanderBind = param => {return axios({ method: 'post', url:'tools/get_commander_bind', data : qs.stringify(param)})}
// hub用户列表
const whbUserList = param => {return axios({ method: 'post', url:'saller/whb_user_list', data : qs.stringify(param)})}
//图表信息
const chartUrl = param => {return axios({ method: 'get', url: urlParams('connection/mini_program_product_stat',param) })};
// BD拜访小区
const setBdVillage = param => {return axios({ method: 'post', url:'connection/set_bd_village', data : qs.stringify(param)})};
// 收藏
const setBdCollection = param => {return axios({ method: 'post', url:'connection/set_bd_collection', data : qs.stringify(param)})};
//收藏夹
const getCollection = param => {return axios({ method: 'get', url: urlParams('connection/get_collection',param) })};
//获取城市列表
const getCitys = param => {return axios({ method: 'get', url: urlParams('connection/get_citys',param) })};
//获取推荐团长列表
const getRecommendGroupers = param => {return axios({ method: 'get', url: urlParams('connection/get_recommend_groupers',param) })};
// 取消小区团长绑定关系
const cancelVillageGrouper = param => {return axios({ method: 'post', url:'connection/cancel_village_grouper', data : qs.stringify(param)})};
//获取群信息(名称及消息数)
const getGroupInfolxl = param => {return axios({method: 'post', url:'zone/p_get_group_info', data : qs.stringify(param)})};
//获取主营品类列表
const getCategorylxl = param => {return axios({method: 'post', url:'vendor/get_category', data : qs.stringify(param)})};
//获取供应商列表
const getVendorlistlxl = param => {return axios({method: 'post', url:'zone/p_get_vendor_list', data : qs.stringify(param)})};
//获取群消息列表
const getMessagelistlxl = param => {return axios({method: 'post', url:'zone/p_get_message_list', data : qs.stringify(param)})};
export default {
	login,getTags,getGroupers,getGroups,addTag,getGroupList,openMyGroup,getGroupStat,getGroupInfo,getGroupMembers,getCustomerInfo,getCustomerTags,getCustomerGroup,getUserInfo,getPreGrou,getGrouperParse,getPreGorList,delFn,createCommander,getMapData,setLinePlan,getLinePlanList,getWxConfig,getCommanderSignlist,getInstalledList,getCommanderList,getMapCustomer,getMapVillage,getCommanderInfo,updateCommanderInfo,getVilGrouper,setVillageGrouper,uploadCommanderMedia,commanderSignIn,getCommanderCode,getCommanderBind,whbUserList,chartUrl,setBdVillage,setBdCollection,getCollection,getCitys,getRecommendGroupers,cancelVillageGrouper,getGroupInfolxl,getCategorylxl,getVendorlistlxl,
	getMessagelistlxl
};

