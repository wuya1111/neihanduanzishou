Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailslist: [],
    listurl: [],
    emoticon: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.emoticon = options.emoticonid
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getRequerrm()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getRequerrm()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getRequerrm: function () {
    var that = this;
    var param = {};
    wx.request({
      url: 'https://bi2.duowan.com/doutu/apiEmoticon.php?os=Android&uId=-1&emoticonId=' + that.data.emoticon + '&funcName=GetEmoticonDetailData&version=3.9.8',
      data: param,
      method: "get",
      success: function (res) {
        
        var lists = res.data.data.emoticonList

        that.data.detailslist = lists;
        console.log(that.data.detailslist)
        that.setData({
          detailslist: that.data.detailslist,
          hasRefesh: lists.length > 0 ? true : false,
          hidden: true
        })
      },
      fail: function () {
      }
    })

  },
  imageOnclick: function (event) {
    var that=  this;
    var item = (event.currentTarget.dataset.id);
    console.log(item);
    that.data.listurl=[];
    for (var i = 0; i < that.data.detailslist.length; i++) {
      that.data.listurl.push(that.data.detailslist[i].imgUrl);
    }
    wx.previewImage({
      current: item, // 当前显示图片的http链接  
      urls: that.data.listurl // 需要预览的图片http链接列表  
    })
  },
  dashaOnclick: function (event) {
    var current = event.target.dataset.src;
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path: 'pages/apps/largess/detail?id=OcNrSWjTxb4%3D',
      extraData: {
        foo: 'bar'
      },

      success(res) {
        // 打开成功
      }
    })
  }
  ,
  dashaOnclick: function (event) {
    var current = event.target.dataset.src;
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path: 'pages/apps/largess/detail?id=OcNrSWjTxb4%3D',
      extraData: {
        foo: 'bar'
      },

      success(res) {
        // 打开成功
      }
    })
  }
  , homeOnclick: function (event) {
    var current = event.target.dataset.src;
    wx.switchTab({
      url: '../../index/index'
    })
  },
})