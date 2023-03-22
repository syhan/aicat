// pages/index/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    cats: [
      {"name": "叨乐", "sex": "male", "description": "跟着主人走南闯北，乘坐快艇追逐大雁，在峡谷漂流中当落汤鸡，跟着铲屎官出海钓鱼，看过清晨......", "liked": true, "img": "../../images/cat1.png", "master": ""}, 
      {"name": "土豆", "sex": "male", "description": "土豆喜欢吃土豆", "liked": false, "img":"../../images/cat2.png"},
      {"name": "仔仔", "sex": "male", "description": "籍贯美国，上海户口，旅居江苏", "liked": true, "img": "../../images/cat3.jpg"}, 
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    
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