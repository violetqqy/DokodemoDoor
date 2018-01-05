//app.js
const AV = require('./sources/libs/av-weapp-min.js')

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // LeanCloud 应用的 ID 和 Key
    AV.init({
      appId: 't4Rr4pjF7Ed71IvaTH1KbEsB-9Nh9j0Va',
      appKey: 'd8LFl7xk4u1ImRDNoDaI38AM',
    });
    AV.User.loginWithWeapp()
      .then(user => {
        console.log(user.toJSON());
        // this.globalData.user = user.toJSON();
      })
      .catch(console.error);
  },
  getUserInfo: function (cb) {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
              this.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(this.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})

