// pages/index/index.js
const {request} = require('../../http/request.js');
Page({

  /**
   * Page initial data
   */
  data: {
    cats: [
    ]
  },

  likeClick(e) {
    const id = e.detail.value.id
    const index = e.detail.value.index
    const that = this
    request({
      url: `/api/v1/attachments/${id}/like`,
      method: 'POST',
      that
    }).then(res => {
      let data = {}
      data[`cats[${index}].liked`] = true
      this.setData(data)
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const page = this.data.page || 1
    const data = {
      page,
      per_page: 10
    }
    const that = this;
    request({
      url: '/api/v1/attachments', 
      data,
      that
    }).then(res => {
      this.setData({
        cats: res['data']['attachments'],
        page: res['data']['page'],
        total: res['data']['total']
      })
    })
    // wx.request({
    //   url: 'https://cat.isekai.me/api/v1/attachments',
    //   success: (res) => {
    //     this.setData({
    //       cats: res.data['data']['attachments'],
    //       page: res.data['data']['page'],
    //       total: res.data['data']['total']
    //     })
    //   }
    // })
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
    // console.log(this.data)
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