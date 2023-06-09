// pages/index/index.js
const {request} = require('../../http/request.js');
Page({

  /**
   * Page initial data
   */
  data: {
    cats: [],
  },

  likeClick(e) {
    const id = e.currentTarget.dataset.pet
    const index = this.data.cats.findIndex(cat => cat.id === id)

    console.log(index)
    const that = this
    request({
      url: `/api/v1/attachments/${id}/like`,
      method: 'POST',
      that
    }).then(res => {
      let data = {}
      this.setData({
        [`cats[${index}].liked`]: true
      })
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
    const page = Number(this.data.page) + 1
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
      let cats = this.data.cats
      cats = cats.concat(res['data']['attachments'])
      this.setData({
        cats,
        page: res['data']['page'],
        total: res['data']['total']
      })
    })
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})