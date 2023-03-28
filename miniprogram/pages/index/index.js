// pages/index/index.js
const {request} = require('../../http/request.js');
Page({

  /**
   * Page initial data
   */
  data: {
    cats: [
    ],
    animation: {}
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
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
     })
    this.animation = animation
    var next = true;
    //连续动画关键步骤
    setInterval(function () {
     //2: 调用动画实例方法来描述动画
     if (next) {
      animation.translateX(4).step();
      animation.rotate(19).step()
      next = !next;
     } else {
      animation.translateX(-4).step();
      animation.rotate(-19).step()
      next = !next;
     }
     //3: 将动画export导出，把动画数据传递组件animation的属性 
     this.setData({
      animation: animation.export()
     })
    }.bind(this), 600)
    
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