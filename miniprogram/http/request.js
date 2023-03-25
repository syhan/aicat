const baseUrl = "https://cat.isekai.me";
module.exports = {
  request: function (options) {
    const { url, data, method, that, hideLoading } = options;
    // 此处baseUrl需要从定义的env.js文件中import
    let fullUrl = `${baseUrl}${url}`;
    if(!hideLoading) {
      wx.showLoading({
        title: "加载中",
      });
    }
    // 使用Promise封装一层
    return new Promise((resolve, reject) => {
      wx.request({
        url: fullUrl,
        method,
        data,
        header: {
          "Content-type": "application/json",
          "X-App-Auth": wx.getStorageSync("token"),
        },
        // 成功的回调函数
        success(res) {
          if (res.statusCode === 200) {
            // 将response的数据resolve出去
            resolve(res.data);
            wx.hideLoading();
          } else if (res.statusCode === 401) {
            // 未授权
            wx.login({
              success(res) {
                wx.request({
                  url: `${baseUrl}/api/v1/sessions`,
                  method: "POST",
                  data: {
                    code: res.code,
                  },
                  success(res) {
                    wx.setStorageSync("token",res.data['data']['token']);
                  }
                })
              }
            })
            that.onLoad();
            // reject(res)
            // resolve(this.request(url, data, method));
          } else {
            wx.showToast({
              title: "请求失败",
              icon: "error",
            });
            reject(res);
          }},
        fail(error) {
          wx.showToast({
            title: "请求失败",
            icon: "error",
          });
          reject(error);
        },
      });
    });
  },
};
