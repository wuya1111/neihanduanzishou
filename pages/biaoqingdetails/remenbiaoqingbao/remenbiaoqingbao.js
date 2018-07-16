Page({

  /**
   * 页面的初始数据
   */
  data: {
    rmlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.share_query) {
      console.log('分享进来的')
    } else {
      console.log('点击进来的')
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getRequerrm();
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
    this.data.rmlist=[];
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

  }
  ,
  getRequerrm: function () {
    var that = this;
    var param = {};
    wx.request({
      url: 'https://bi2.duowan.com/doutu/apiDoutu.php?os=Android&funcName=GetDouTuMaterial&version=3.9.8',
      data: param,
      method: "get",
      success: function (res) {

        var lists = res.data.data

        that.data.rmlist = lists;
        console.log(that.data.rmlist)
        that.setData({
          rmlist: that.data.rmlist,
          hasRefesh: lists.length > 0 ? true : false,
          hidden: true
        })
      },
      fail: function () {
      }
    })

  },

  imonclick: function (event) {
    var item = (event.currentTarget.dataset.id);
    console.log(item);
    var url = item.url;
    console.log(url);
    var index = url.indexOf("emoticonId=");
    var obj = url.substring(index + 11, url.length);
    console.log(obj);
    wx.navigateTo({ url: '../duanyoudetails/duanyoudetails?emoticonid=' + obj });
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