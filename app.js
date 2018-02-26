//app.js
App({
  onLaunch: function () {
    var self = this;
    wx.getLocation({
      success: function(locRes) {
        self.globalData.longitude = locRes.longitude.toFixed(2);
        self.globalData.latitude = locRes.latitude.toFixed(2);

        wx.redirectTo({
          url: 'index'
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