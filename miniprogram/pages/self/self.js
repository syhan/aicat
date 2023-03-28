// pages/self/self.js
const { request } = require('../../http/request.js');
Page({

  /**
   * Page initial data
   */
  data: {
    self: {
      nickname: "铲屎官小美",
      avatar: "../../images/avatar.png",
      pets: [
        "../../images/cat1_avatar.png",
        "../../images/cat2_avatar.png",
        "../../images/cat3_avatar.png",
      ],
      daysSinceRegistration: 285,
      totalLiked: 0,
      totalFavorited: 0
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const that = this;
    // request({url: '/api/v1/my', that}).then(res => {
    //   this.setData({
    //     self: res['data']['user']
    //   })
    // })
    // coming soon
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    console.log(123)
    wx.showToast({
      title: '施工中',
      icon: 'error',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, 2000)
        this.onLoad()
      },
      complete: (e) => {
        console.log(e)
      },
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})