let url = 'https://btjapi.yundian168.com/'

const apilist = {
	//店铺信息
	"TUWEN": url + "connection/get_supplier_info",
	//省市区
	"Province":url+"saller/get_area",
	//上传店铺信息
	"Message":url+"connection/set_supplier_info",
	//图片
	"uploadCommanderMedia":url+"tools/upload_commander_media",
	//获取微信权限
	"getWxConfig":url+"tools/getsignpackage",
	//店铺列表
	"List":url+"connection/get_supplier_list",
	//签到记录
	"Signin":url+"connection/get_sign",
	//提交签到记录
	"Signin2":url+"connection/set_sign",
	//添加种子用户
	"seedUser":url+"connection/set_custmer",
	//我的评价
	"Evaluata":url+"connection/get_review"
}

export default apilist