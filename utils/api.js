 let agent = ''
  //#ifdef H5
	agent = '/prefix'
  //#endif
const install = (Vue, vm) => {
	let indexList = (params = {}) => vm.$H.post(agent+'/index/info/index', params);//列表测试
	//登录 首页信息
	let wxGetPhone = (params = {}) => vm.$H.post(agent+'/home/wxGetPhone', params);//获取手机号码
	let wxlogin = (params = {}) => vm.$H.post(agent+'/home/wxlogin', params);//微信登录
	let logout = (params = {}) => vm.$H.post(agent+'/home/logout', params);//退出登录
	let indexInfo = (params = {}) => vm.$H.post(agent+'/home/indexInfo', params);//首页
	let getArticle = (params = {}) => vm.$H.post(agent+'/home/getArticle', params);//咨询列表
	let getArticleInfo = (params = {}) => vm.$H.post(agent+'/home/getArticleInfo', params);//详情
	let getTutorList = (params = {}) => vm.$H.post(agent+'/home/getTutorList', params);//专家导师
	let signCode = (params = {}) => vm.$H.post(agent+'/home/signCode', params);//签名
	let signCodeForSign = (params = {}) => vm.$H.post(agent+'/home/signCodeForSign', params);//签名
	let singleinfo = (params = {}) => vm.$H.post(agent+'/home/singleinfo', params);//单页信息获取
	let confInfo = (params = {}) => vm.$H.post(agent+'/home/confInfo', params);//选项设置获取
	let refundOrder = (params = {}) => vm.$H.post(agent+'/buy/refundOrder', params);//退款申请
	let getRefundInfoByOrderId = (params = {}) => vm.$H.post(agent+'/buy/getRefundInfoByOrderId', params);//退款申请前
	let getCourseInfoByOrderId = (params = {}) => vm.$H.post(agent+'/buy/getCourseInfoByOrderId', params);//退款信息查询
	let fileupload = (params = {}) => vm.$H.post(agent+'/home/fileupload', params);//图片上传
	let getVerifiCode = (params = {}) => vm.$H.post(agent+'/home/getVerifiCode', params);//获取验证码
	
	//课程
	
	let getCourseInfo = (params = {}) => vm.$H.post(agent+'/course/getCourseInfo', params);//获取课程详情
	let getCourseClass = (params = {}) => vm.$H.post(agent+'/course/getCourseClass', params);//获取班级排期
	let getCourseHaveList = (params = {}) => vm.$H.post(agent+'/course/getCourseHaveList', params);//获取课程排期
	let getCourseList = (params = {}) => vm.$H.post(agent+'/course/getCourseList', params);//获取课程排期
	let getCourseShare = (params = {}) => vm.$H.post(agent+'/course/getCourseShare', params);//分享课程
	let getCourseShow = (params = {}) => vm.$H.post(agent+'/course/getCourseShow', params);//获取课程精彩集锦
	let orderCreate = (params = {}) => vm.$H.post(agent+'/buy/orderCreate', params);//创建订单
	let questionnaireApply = (params = {}) => vm.$H.post(agent+'/buy/questionnaireApply', params);//创建订单
	let questionnaireSave = (params = {}) => vm.$H.post(agent+'/buy/questionnaireSave', params);//创建订单
	
	//用户
	let saveLearnInfo = (params = {}) => vm.$H.post(agent+'/user/saveLearnInfo', params);//保存学员信息
	let getUserInfo = (params = {}) => vm.$H.post(agent+'/user/getUserInfo', params);//获取用户信息
	let modifyData = (params = {}) => vm.$H.post(agent+'/user/modifyData', params);//获取用户信息
	let courseCollection = (params = {}) => vm.$H.post(agent+'/user/courseCollection', params);//收藏课程
	let getUserCollection = (params = {}) => vm.$H.post(agent+'/user/getUserCollection', params);//获取收藏课程
	let getUserOrder = (params = {}) => vm.$H.post(agent+'/user/getUserOrder', params);//专享方案
	let fddSave = (params = {}) => vm.$H.post(agent+'/user/fddSave', params);//保存 认证交易信息
	let getNoteList = (params = {}) => vm.$H.post(agent+'/user/getNoteList', params);//消息列表
	let readNote = (params = {}) => vm.$H.post(agent+'/user/readNote', params);//消息详情
	let signInfo = (params = {}) => vm.$H.post(agent+'/user/teacher/signInfo', params);//学员签到信息
	let sign = (params = {}) => vm.$H.post(agent+'/user/teacher/sign', params);//签到
	let getContractList = (params = {}) => vm.$H.post(agent+'/user/getContractList', params);//我的合同
	
	//课程服务
	let cancelOrder = (params = {}) => vm.$H.post(agent+'/buy/cancelOrder', params);//取消订单 id--> order_id 套餐输入套餐的订单id
	let choseCourseClass = (params = {}) => vm.$H.post(agent+'/buy/choseCourseClass', params);//选择上课时间
	let getLearnQR = (params = {}) => vm.$H.post(agent+'/buy/getLearnQR', params);//学习签到
	let userAgreementSave = (params = {}) => vm.$H.post(agent+'/buy/userAgreementSave', params);//协议保存
	let orderSelect = (params = {}) => vm.$H.post(agent+'/buy/orderSelect', params);//协议保存
	let getClassRetrainInfo = (params = {}) => vm.$H.post(agent+'/buy/getClassRetrainInfo', params);//学员信息查询
	
	//学习
	let getCourseChooseInfo = (params = {}) => vm.$H.post(agent+'/buy/getCourseChooseInfo', params);//获取选课内容
	let getPackageLearn = (params = {}) => vm.$H.post(agent+'/buy/getPackageLearn', params);//获取学习--套餐产品
	let getLearnCourse = (params = {}) => vm.$H.post(agent+'/buy/getLearnCourse', params);//学习列表
	let getLearnCourseName = (params = {}) => vm.$H.post(agent+'/buy/getLearnCourseName', params);//学习课程列表
	//支付模块
	
	let onlinepayment = (params = {}) => vm.$H.post(agent+'/pay/onlinepayment', params);//在线调起支付
	let whchat = (params = {}) => vm.$H.post(agent+'/pay/whchat', params);//微信异步返回处理
	//合作模块
	let cooperationApply = (params = {}) => vm.$H.post(agent+'/extension/cooperationApply', params);//合作申请
	let extensionIndex = (params = {}) => vm.$H.post(agent+'/extension/extensionIndex', params);//合作主页
	let signCooperation = (params = {}) => vm.$H.post(agent+'/extension/signCooperation', params);//个人申请合同签署
	let getBankInfo = (params = {}) => vm.$H.post(agent+'/extension/getBankInfo', params);//获取绑定的银行卡
	let getGainRecordList = (params = {}) => vm.$H.post(agent+'/extension/getGainRecordList', params);//收益记录
	let bindBankInfo = (params = {}) => vm.$H.post(agent+'/extension/bindBankInfo', params);//绑定银行卡
	let getWithdrawInfo = (params = {}) => vm.$H.post(agent+'/extension/getWithdrawInfo', params);//可提现金额
	let getBalanceInfo = (params = {}) => vm.$H.post(agent+'/extension/getBalanceInfo', params);//获取余额明细
	let withdraw = (params = {}) => vm.$H.post(agent+'/extension/withdraw', params);//申请提现
	let getTeamMember = (params = {}) => vm.$H.post(agent+'/extension/getTeamMember', params);//团队成员/好友列表
	let getInviteCode = (params = {}) => vm.$H.post(agent+'/extension/getInviteCode', params);//获取邀请信息
	let getServerPhone = (params = {}) => vm.$H.post(agent+'/user/getServerPhone ', params);//咨询电话
	
	
	
	

	
	

	
	

	
	

	
	
	
	
	
	
	vm.$u.api = {
		getBalanceInfo,withdraw,getTeamMember,getInviteCode,getVerifiCode,questionnaireApply,questionnaireSave,
		cooperationApply,extensionIndex,signCooperation,getBankInfo,getGainRecordList,bindBankInfo,getWithdrawInfo,
		indexList,wxlogin,logout,getArticle,getArticleInfo,wxGetPhone,getTutorList,indexInfo,signCode,singleinfo,
		getUserInfo,courseCollection,getUserCollection,getUserOrder,getNoteList,readNote,modifyData,
		getCourseInfo,getCourseClass,getCourseHaveList,getCourseList,getCourseShare,getCourseShow,cancelOrder,
		choseCourseClass,getLearnQR,userAgreementSave,orderSelect,getLearnCourse,getLearnCourseName,
		onlinepayment,whchat,fddSave,signCodeForSign,orderCreate,getCourseChooseInfo,saveLearnInfo,getPackageLearn,signInfo,sign,
		getClassRetrainInfo,confInfo,refundOrder,getCourseInfoByOrderId,fileupload,getContractList
	}
}
export default {
	install
}