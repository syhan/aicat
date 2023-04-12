// pages/post/post.js
const { request } = require("../../http/request.js");
var COS = require("../../sdk/cos-wx-sdk-v5.js");

Page({
  /**
   * Page initial data
   */
  data: {
    photos: [],
    name: "",
    intro: "",
    sex: "female",
    location: "添加地点(Coming soon)",
    attachment_ids: [],
  },

  selectImages() {
    var that = this;

    wx.chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        that.setData({
          photos: that.data.photos.concat(res.tempFilePaths),
        });
      },
    });
  },

  uplaodFile(files) {
    var cos = new COS({
      SimpleUploadMethod: "putObject", // 强烈建议，高级上传、批量上传内部对小文件做简单上传时使用 putObject,SDK 版本至少需要v1.3.0
      // 必选参数
      getAuthorization: function (options, callback) {
        // 服务端 JS 和 PHP 示例：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
        // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
        // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
        wx.request({
          method: 'POST',
          url: "https://cat.isekai.me/api/v1/attachments/sts",
          header: {
            "Content-type": "application/json",
            "X-App-Auth": wx.getStorageSync("token"),
          },
          data: {
          },
          success: function (result) {
            var data = result.data.data;
            var credentials = data && data.sts.Credentials;
            console.log({
              TmpSecretId: credentials.TmpSecretId,
              TmpSecretKey: credentials.TmpSecretKey,
              // v1.2.0之前版本的 SDK 使用 XCosSecurityToken 而不是 SecurityToken
              SecurityToken: credentials.Token,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: Math.floor(Date.now() / 1000),  //now // 时间戳，单位秒，如：1580000000
              ExpiredTime: data.sts.ExpiredTime, // 时间戳，单位秒，如：1580000900
            })
            if (!data || !credentials)
              return console.error("credentials invalid");
              callback({
                TmpSecretId: credentials.TmpSecretId,
                TmpSecretKey: credentials.TmpSecretKey,
                // v1.2.0之前版本的 SDK 使用 XCosSecurityToken 而不是 SecurityToken
                SecurityToken: credentials.Token,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                StartTime: Math.floor(Date.now() / 1000),  //now // 时间戳，单位秒，如：1580000000
                ExpiredTime: data.sts.ExpiredTime, // 时间戳，单位秒，如：1580000900
              });
          },
        });
      },
    });
    return new Promise((resolve, reject) => {
      let resources = [];
      let count = 0;
      let that = this;
      files.tempFilePaths.forEach((path) => {
        cos.uploadFile({
          Bucket: "roitau-1311552888",
          Region: "ap-hongkong",
          Key: 'uploads/' + path.split('/')[path.split('/').length - 1],
          FilePath: path,
        },  function(err, data) {
          if (err) {
            console.log('上传出错', err);
          } else {
            console.log(data)
            request({
              url: "/api/v1/attachments",
              method: "POST",
              data: {
                url: '/uploads/' + path.split('/')[path.split('/').length - 1]
              }
            }).then((res) => {
              that.setData({
                attachment_ids: that.data.attachment_ids.concat(
                  res.data.attachment_id
                ),
              });
              resources.push(path);
              count++;
              if (count === files.tempFilePaths.length) {
                resolve({ urls: resources });
              }
            })

          }
        })
        // wx.uploadFile({
        //   url: "https://cat.isekai.me/api/v1/attachments",
        //   filePath: path,
        //   filename: "file",
        //   header: {
        //     "X-App-Auth": wx.getStorageSync("token"),
        //   },
        //   success: (res) => {
        //     this.setData({
        //       attachment_ids: this.data.attachment_ids.concat(
        //         JSON.parse(res.data).data.attachment_id
        //       ),
        //     });
        //     resources.push(path);
        //     count++;
        //     if (count === files.tempFilePaths.length) {
        //       resolve({ urls: resources });
        //     }
        //   },
        // });
      });
    });
  },

  uploadError(e) {
    console.log(e);
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files, // 需要预览的图片http链接列表
    });
  },

  customSubmit(e) {
    const infos = e.detail.value;
    console.log(infos);
    request({
      url: "/api/v1/attachments/submit",
      method: "POST",
      data: {
        ...infos,
        attachment_ids: this.data.attachment_ids,
        sex: this.data.sex,
      },
    }).then((res) => {
      wx.showToast({
        title: "发布成功",
        icon: "success",
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: "/pages/index/index",
            });
            this.setData({
              photos: [],
              name: "",
              intro: "",
              sex: "female",
              location: "添加地点",
              attachment_ids: [],
            });
          }, 2000);
        },
      });
    });
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: "晒宠物",
    });

    this.setData({
      selectImages: this.selectImages.bind(this),
      uplaodFile: this.uplaodFile.bind(this),
    });
  },

  chooseFemale() {
    this.setData({
      sex: "female",
    });
  },

  chooseMale() {
    this.setData({
      sex: "male",
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
