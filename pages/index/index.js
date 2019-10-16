let app = getApp();

//替换成开发者后台设置的安全域名
let url = "http://kingkong123.vaiwan.com";

var initialData = {
  corpId: '',
  authCode: '',
  timestamp: '',
  hideList: true,
  images: [],
  images_url: [],
};

Page({
  data: initialData,
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },

  formSubmit: function(e) {
    dd.showLoading({
      content: '提交中...',
    });
    let that = this;
    let form = e.detail.value;
    this.data.images_url = []; //每次提交都要清除上一次提交的图片
    this.data.timestamp = new Date().getTime();
    that.uploadImage(0);

  },


  uploadImage: function(i){
    let that = this;

    dd.uploadFile({
      url: url + '/kingkong/experience/submit/image.do',
      fileType: 'image',
      fileName: 'experienceImage', //服务端接收的文件名
      filePath: that.data.images[i],
      header: {
        "Content-Type": "multipart/form-data"
      },
      dataType: 'json',
      formData: {
        userId: '101354622627623123',
        deptId: '1',
        timestamp: that.data.timestamp + '-' + 1
      },
      success: (res) => {
        console.log('UploadImageSuccess-------');

      },
      fail: (res) => {
        console.log("上传图片失败---" + JSON.stringify(res))
      },
      complete: (res) => {
        console.log("UploadImagecomplete---")
        dd.hideLoading();
      }
    });

  },

  chooseImage(e) {
    let _this = this;
    console.log(e)
    dd.chooseImage({
      count: 9,
      success: (res) => {
        console.log('选择照片：', res.filePaths)
        const images = this.data.images.concat(res.filePaths)
        // 限制最多只能留下1张照片
        const images1 = images.length <= 1 ? images : images.slice(0, 1)
        this.setData({
          images: images1
        })
      },
    });
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  //移除图片
  removeImage(e) {
    let that = this;
    let images = that.data.images;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    images.splice(idx, 1)
    this.setData({
      images: images
    })
  },

  //预览图片
  handleImagePreview(e) {
    const idx = e.target.dataset.idx

    const images = this.data.images
    dd.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },


});
