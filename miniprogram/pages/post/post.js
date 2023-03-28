// pages/post/post.js
const { request } = require("../../http/request.js");
Page({

  /**
   * Page initial data
   */
  data: {
    photos: [],
    name: '',
    intro: '',
    sex: 'female',
    location: '添加地点(Coming soon)',
    attachment_ids: []
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
    return new Promise((resolve, reject) => {
      let resources = []
      let count = 0
      files.tempFilePaths.forEach((path) => {
        wx.uploadFile({
          url: 'https://cat.isekai.me/api/v1/attachments',
          filePath: path,
          name: 'file',
          header: {
            "X-App-Auth": wx.getStorageSync("token"),
          },
          success: (res) => {
            this.setData({
              attachment_ids: this.data.attachment_ids.concat(JSON.parse(res.data).data.attachment_id)
            })
            resources.push(path)
          },
          complete: () => {
            count++
            if (count === files.tempFilePaths.length) {
              resolve({urls: resources})
            }
          }
        })
      })
    })
    
  },

  uploadError(e) {
    console.log(e)
  },

  previewImage: function(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
},

  customSubmit(e) {
    const infos = e.detail.value
    console.log(infos)
    request({
      url: '/api/v1/attachments/submit',
      method: 'POST',
      data: {
        ...infos,
        attachment_ids: this.data.attachment_ids,
        sex: this.data.sex
      }
    }).then(res => {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index',
            })
            this.setData({
              photos: [],
              name: '',
              intro: '',
              sex: 'female',
              location: '添加地点',
              attachment_ids: []
            })
          }, 2000)
        }
      })
    })
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
      uplaodFile: this.uplaodFile.bind(this),
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