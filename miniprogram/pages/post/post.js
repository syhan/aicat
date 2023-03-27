// pages/post/post.js
Page({

  /**
   * Page initial data
   */
  data: {
    photos: [],
    name: '',
    intro: '',
    sex: 'female',
    location: '添加地点'
  },

  selectImages() {
    var that = this;

    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        that.setData({
          photos: that.data.photos.concat(res.tempFilePaths)
        })
      }
    })
  },

  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('as if it works')
        }, 1000)
    })
},

  previewImage: function(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
},

  customSubmit(e) {
    const infos = e.detail.value
    console.log({...infos, attachments: this.data.attachments})
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '晒宠物',
    })

    this.setData({
      selectImages: this.selectImages.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
  })
  },

  chooseFemale() {
    this.setData({
      sex: 'female'
    })
  },
  
  chooseMale() {
    this.setData({
      sex: 'male'
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