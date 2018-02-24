//app.js
App({
  onLaunch: function () {
    var self = this;
    wx.getLocation({
      success: function(locRes) {
        self.globalData.longitude = locRes.longitude.toFixed(2);
        self.globalData.latitude = locRes.latitude.toFixed(2);

        wx.showLoading({
          title: '数据加载中'
        });
        
        var loc = self.globalData.latitude + ':' + self.globalData.longitude;
        wx.request({
          url: 'https://api.seniverse.com/v3/weather/now.json?key=j7zniufcdbshlv97&location=' + loc + '&language=zh-Hans&unit=c',
          success: function (res) {
            wx.hideLoading();
            if (res.errMsg === 'request:ok') {
              self.globalData.weatherData = res.data.results;
              console.log(self.globalData.weatherData);

              wx.request({
                url: 'https://api.seniverse.com/v3/weather/daily.json?key=j7zniufcdbshlv97&location=' + loc + '&language=zh-Hans&unit=c&start=0&days=5',
                success: function (forecastRes) {
                  if (res.errMsg === 'request:ok') {
                    self.globalData.forecastData = forecastRes.data.results;
                    wx.redirectTo({
                      url: 'index'
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                title: '获取数据失败',
              })
            }

          }
        })
      },
      fail: function(err) {
        wx.showModal({
          title: '获取位置失败',
        })
      }
    })
    
  },
  globalData: {
    weatherData: '',
    longitude: '',
    latitude: '',
    forecastData: ''
  }
})