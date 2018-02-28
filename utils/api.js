const getCurrentDay = (location) => {
  return new Promise(function (resolve, reject){
    wx.request({
      url: 'https://api.seniverse.com/v3/weather/now.json?key=j7zniufcdbshlv97&location=' + location + '&language=zh-Hans&unit=c',
      success: function (res) {
        if (res.errMsg === 'request:ok') {
          resolve(res.data.results);
        } else {
          reject(null);
        }
      },
      fail: function() {
        reject(null);
      }
    })
  })
}

const getForecastDay = (location) => {
  return new Promise(function (resolve, reject) {
  wx.request({
    url: 'https://api.seniverse.com/v3/weather/daily.json?key=j7zniufcdbshlv97&location=' + location + '&language=zh-Hans&unit=c&start=0&days=5',
    success: function(res) {
      if (res.errMsg === 'request:ok') {
        resolve(res.data.results);
      } else {
        reject(null);
      }
    },
    fail: function () {
      reject(null);
    }
  })
  }
)}

const getSuggestion = (location) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://api.seniverse.com/v3/life/suggestion.json?key=j7zniufcdbshlv97&location=' + location + '&language=zh-Hans',
      success: function(res) {
        if (res.errMsg === 'request:ok') {
          resolve(res.data.results);
        } else {
          reject(null);
        }
      },
      fail: function () {
        reject(null);
      }
    })
  })
}

module.exports = {
  getCurrentDay,
  getForecastDay,
  getSuggestion
}
