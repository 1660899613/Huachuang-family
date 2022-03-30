import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		imgUrl: '',
		userInfo: uni.getStorageSync("userInfo"),
		hasLogin: uni.getStorageSync("hasLogin")||false,
		sessionKey: uni.getStorageSync("sessionKey"),
		messegeNum:0,
		user_fd:""  ,//用户websocket设备id
		searchVal: '', //tabbar服务搜索参数
	},
	mutations: {
		login(state, userInfo) {	
			state.hasLogin = uni.getStorageSync("hasLogin");
			state.userInfo = uni.getStorageSync("userInfo");
		},
		logout(state) {
			uni.setStorageSync("hasLogin",false);
			uni.setStorageSync("userInfo",null);
			uni.setStorageSync("token",null);
			state.hasLogin = false;
			state.userInfo = null;
			
		},
		searchChange(state,val){
			state.searchVal = val
			console.log(val,'全局存参')
		}
	}
})

export default store
