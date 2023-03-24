// pages/pet/pet.js
Page({

  /**
   * Page initial data
   */
  data: {
    pet: {
      name: "叨乐",
      sex: "male",
      images: ["../../images/cat1.png","../../images/cat1.png","../../images/cat1.png","../../images/cat1.png","../../images/cat1.png"],
      description: "跟着主人走南闯北，乘坐快艇追逐大雁，在峡谷漂流中当落汤鸡，跟着铲屎官出海钓鱼，看过清晨的黄河、踩过傍晚的海滩，还去过上海的外滩，因为一只胳膊上有花纹，所以江湖人称“花臂大佬”，而这只花臂大佬更是经常把摄像头架在脖子上，要么在乡间小路遛弯，要么就直接上树，用猫的视角看世界，带你沉浸式做猫。跟着主人走南闯北，乘坐快艇追逐大雁，在峡谷漂流中当落汤鸡，跟着铲屎官出海钓鱼，看过清晨的黄河、踩过傍晚的海滩，还去过上海的外滩，因为一只胳膊上有花纹，所以江湖人称“花1234臂大佬”，而这只花臂大佬更是经常把摄像头架在脖子上，要么在乡间小路遛弯，要么就直接上树，用猫的视角看世界，带你沉浸式做猫。",
      liked: true,
      favorited: true,
      totalLiked: 233,
      totalFavorited: 417,
      totalComments: 111,
      totalShared: "3k",
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: this.data.pet.name,
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