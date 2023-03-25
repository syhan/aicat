// pages/chat/chat.js
const { request } = require("../../http/request.js");
Page({
  /**
   * Page initial data
   */
  data: {
    messages: [],
    scroolTop: 10000,
  },
  createMessage: (e) => {
    const content = e.detail.value.content;
    const that = this;
    request({
      url: "/api/v1/chats/messages",
      method: "POST",
      data: { content: content },
      that,
    }).then((res) => {
      that.setData({
        messages: res["data"]["messages"],
        scrollIntoView: `chat-${res["data"]["messages"].length - 1}`
      });
    });
    console.log(content);
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    request({
      url: "/api/v1/chats/messages",
      that: this,
      hideLoading: true,
    }).then((res) => {
      if (res["data"]["messages"].length == this.data.messages.length) {
        return;
      }
      this.setData({
        messages: res["data"]["messages"],
        scrollIntoView: `chat-${res["data"]["messages"].length - 1}`
      });
    });

    this.setData({
      sh: setInterval(() => {
        request({
          url: "/api/v1/chats/messages",
          that: this,
          hideLoading: true,
        }).then((res) => {
          if (res["data"]["messages"].length == this.data.messages.length) {
            return;
          }
          this.setData({
            messages: res["data"]["messages"],
            scrollIntoView: `chat-${res["data"]["messages"].length - 1}`
          });
        });
      }, 5000),
    });
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
    clearInterval(this.data.sh);
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {
    clearInterval(this.data.sh);
  },

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

  onScroll(e) {
    // 滚动时将 scroll-into-view 绑定的变量设置为空字符串，避免多次触发
    this.setData({
      scrollIntoView: ''
    });
  }
});
