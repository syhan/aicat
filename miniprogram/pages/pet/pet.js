// pages/pet/pet.js
const { request } = require("../../http/request.js");
Page({
  /**
   * Page initial data
   */
  data: {
    pet: {},
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: this.data.pet.name,
    });
    const that = this;
    request({
      url: `/api/v1/attachments/${options.id}`,
      that,
    }).then((res) => {
      this.setData({
        pet: res["data"]["attachment"],
      });
    })
    console.log(this.data)
  },

  like(){
    this.data.pet.liked = !!!this.data.pet.liked;

    let id = this.data.pet.id;
    const that = this
    request({
      url: `/api/v1/attachments/${id}/like`,
      method: 'POST',
      that
    }).then(res => {
      that.setData({
        pet: that.data.pet
      });
    })
  },

  favorite() {
    this.data.pet.favorited = !!!this.data.pet.favorited;
    this.setData({
      pet: this.data.pet
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {},

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {},

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {},

  /**
   * Called when page reach bottom
   */
  onReachBottom() {},

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {},
});
