// pages/index/citys.js
const app = getApp();
const cityArr = JSON.parse(require('../../resources/citys.js').cityJson);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCitys: ['北京','上海','广州','深圳','武汉','南京','杭州','厦门'],
    currentCity: '',
    timer: null,
    searchArr: [],
    searching: false,
    noData: false,
    locationCity: ''
  },

  goToHome: function(e) {
    wx.redirectTo({
      url: 'index?loc=' + e.target.dataset.city,
    })
  },

  getkeyword: function(e) {
    var self = this;
    if (e.detail.value.trim() !== '') {
      self.setData({
        searching: true
      });
      if (self.timer) {
        clearTimeout(self.timer)
      }

      self.timer = setTimeout(function () {
        let temp = cityArr.filter(item => {
          return item.name.indexOf(e.detail.value) != -1 || item.pinyin.indexOf(e.detail.value) != -1;
        });
        self.timer = null;
        self.setData({
          searchArr: temp
        });
        if (temp.length === 0) {
          self.setData({
            noData: true
          });
        } else {
          self.setData({
            noData: false
          });
        }
      }, 300);
    } else {
      self.setData({
        searching: false
      })
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        currentCity: app.globalData.weatherData[0].location.name,
        locationCity: app.globalData.locationCity
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})