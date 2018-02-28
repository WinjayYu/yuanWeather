
const api = require('../../utils/api.js');
const app = getApp();

Page({
  data: {
    weatherData: '', // 当天数据
    weatherIcon: 0,
    forecastData: '', // 预测
    dailyText: ['今天',  '明天', '后天'],
    lon: '',
    lat: '',
    suggestionData: '', // 建议
    suggNameArr: {
      car_washing: '洗车',
      dressing: '穿衣',
      flu: '感冒',
      sport: '运动',
      travel: '旅游',
      uv: '紫外线'
    },
    suggNameKeys:[],
  },
  
  onShareAppMessage: function() {
    return {
      title: '向朋友分享圆圆天气',
      path:'index',
      success: function(res) {
        wx.showModal({
          title: '转发成功',
          content: '',
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '转发失败',
          content: '',
        })
      }
    }
  },

  onLoad: function(option) { 
    if(option.loc) {
      this.queryData(option.loc)
    } else {
      var location = app.globalData.latitude + ':' + app.globalData.longitude;
      this.queryData(location, 1)
    }
  },
  queryData: function(location, type) {
    api.getCurrentDay(location)
      .then(res => {
        if (res) {
          app.globalData.weatherData = res;
          if(type) {
            app.globalData.locationCity = res[0].location.name;
          }
          this.setData({
            weatherData: res
          });
          api.getForecastDay(location)
            .then(forRes => {
              if (forRes) {
                this.setData({
                  forecastData: forRes
                });
                api.getSuggestion(location)
                .then(suggRes => {
                  if (suggRes) {
                    this.setData({
                      suggestionData: suggRes[0].suggestion,
                      suggNameKeys: Object.keys(suggRes[0].suggestion)
                    })
                  }
                })
              } else {
                wx.showModal({
                  title: '暂无此城市数据',
                  showCancel: false,
                  complete: function () {
                    wx.redirectTo({
                      url: 'citys',
                    })
                  }
                })
              }
            })
        } else {
          wx.showModal({
            title: '暂无此城市数据',
            showCancel: false,
            complete: function() {
              wx.redirectTo({
                url: 'citys',
              })
            }
          })
          return;
        }
    })
  },
  goToCitys: function(e) {
    wx.navigateTo({
      url: 'citys'
    })
  }
})
