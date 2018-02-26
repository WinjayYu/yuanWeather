// //index.js
// //获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
const api = require('../../utils/api.js');
const app = getApp();

Page({
  data: {
    weatherData: '',
    weatherIcon: 0,
    forecastData: '',
    dailyText: ['今天', '明天', '后天'],
    lon: '',
    lat: '',
  },
  onLoad: function(option) { 
    console.log('option',option);
    if(option.loc) {
      this.queryData(option.loc)
    } else {
      var location = app.globalData.latitude + ':' + app.globalData.longitude;
      this.queryData(location)
    }
  },
  queryData: function(location) {
    api.getCurrentDay(location)
      .then(res => {
        if (res) {
          this.setData({
            weatherData: res
          });
          api.getForecastDay(location)
            .then(forRes => {
              if (forRes) {
                this.setData({
                  forecastData: forRes
                })
              } else {
                wx.showModal({
                  title: '获取数据失败',
                })
              }
            })
        } else {
          wx.showModal({
            title: '获取数据失败',
          })
        }
      })
  },
  goToCitys: function(e) {
    wx.navigateTo({
      url: 'citys'
    })
  }
})
