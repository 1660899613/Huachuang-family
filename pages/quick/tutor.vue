<template>
  <view class="page">
    <view class="list-box">
      <view class="list-item " v-for="(item,index) in list" :key="index">
        <view class="listLi flex-box">
			<view class="w_top"></view>
          <u-avatar :src="item.tutorHead" size="80"></u-avatar>
		  <view class="box-1 rightOne">
			  <view class="flex-box oText">
				  <view class="left name">{{item.tutorName}}</view>
				  <view class="right box-1">
					  <view v-for="it in item.tagList">{{it}}</view>
				  </view>
			  </view>
			  <view class="">
			    <u-read-more ref="uReadMore"
			     :shadowStyle="shadowStyle"
			  	:showHeight="50" 
			  	fontSize="24rpx" 
			  	color="#aaa"
			  	textIndent="0em"
			  	 :toggle="true">
			    		<rich-text :nodes="item.tutorInfo"></rich-text>
			    	</u-read-more>
			  </view>
		  </view>
        </view>
      
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
		 list: [],
		 page:1,
		 loadStatus: 'loading',
		 empet:'',
         loadingImg: "/loading-img1.jpg",
         dataList: [],
         content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
        				苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
        				无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
        shadowStyle: {
          backgroundImage: "none",
          paddingTop: "0",
          marginTop: "20rpx"
        }
      }
    },
    onLoad() {
      this.initData()
	  // this.getIndexList()
    },
    methods: {
      
      initData() {
        this.$u.api.getTutorList({
        	}).then(res=>{
        	console.log(res,'data')
        	this.list = res.data.tutorList
        })
      }
    }

  }
</script>

<style>
  page {
    height: 100%;
    background: #fff;
  }
</style>
<style scoped lang="scss">
  // @import url('@/common/css/comm.less');

  .page {
    padding:30rpx 25rpx;
    box-sizing: border-box;
	
	.listLi{
		justify-content: flex-start;
		align-items: flex-start;
		padding:30rpx;
		border-radius: 20rpx;
		box-shadow:0px 0px  10px 5px #eee;
		positon:relative;
		.w_top{
			position:absolute;
			width:50rpx;
			height:8rpx;
			border-radius: 2rpx;
			top:0;
			left:40rpx;
		}
		.rightOne{
			margin-left:30rpx;
			font-size:26rpx;
		}
		.oText{
			align-items: flex-start;
			.name{
				color:#333333;
				font-size:34rpx;
			}
			.right{
				color:#666;
				font-size:24rpx;
				margin-left:20rpx;
			}
		}
	
	}
	.list-item:nth-child(4n+1) .w_top{
		background-color: #106DF7;
	}
	.list-item:nth-child(4n+2) .w_top{
		background-color: #F14142;
	}
	.list-item:nth-child(4n+3) .w_top{
		background-color: #F1C545;
	}
	.list-item:nth-child(4n) .w_top{
		background-color: #56EE47;
	}
    .list-box {
      .list-item {
        position: relative;
        // .bor_rad();
        margin-bottom: 40rpx;

        .lf {
          width: 180rpx;
          height: 260rpx;
          flex-direction: column;
          justify-content: center;
          .p-name {
            padding: 0 10rpx;
            text-align: center;
            overflow: hidden;
          }

          .chang-line {
            word-break: keep-all; //英文换行
          }
        }

        .rt {
          padding: 10rpx;
          min-height: 200rpx;
          z-index: 100;
          .content {
            // .f_s(22rpx);
            .c-item {
              padding-left: 20rpx;
              position: relative;
              text-align: justify;
              text-indent: 0;
              &::before {
                content: '';
                width: 10rpx !important;
                height: 10rpx !important;
                border-radius: 50%;
                // .bg();
                position: absolute;
                left: 0;
                top: 15rpx;
              }
            }
          }
        }
      }
    }

  }
</style>
