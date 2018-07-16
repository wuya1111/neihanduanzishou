Page({

  /**
   * 页面的初始数据
   */
  data: {
    dylist: [],
    dypage: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getRequerdy(this.data.dypage);
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
    this.data.dypage = 0;

    this.data.dylist=[];
    this.getRequerdy(this.data.dypage)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getRequerdy(this.data.dypage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
  ,
  getRequerdy: function (index) {
    console.log(index)
    var that = this;
    var param = {};
    wx.request({
      url: 'https://bi2.duowan.com/doutu/apiEmoticon.php?os=Android&num=200&uId=-1&page=' + index+'&funcName=GetRecommendEmoticon&version=3.9.8',
      data: param,
      method: "get",
      success: function (res) {
        var lists = res.data.data.list
        console.log(res)
     
        that.data.dypage = that.data.dypage + 1;
        if (that.data.dylist != null) {
          that.data.dylist = that.data.dylist.concat(lists);
        } else {
          that.data.dylist = lists;
        }
        that.setData({
          dylist: that.data.dylist,
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
    var emoticonId = item.emoticonId;
    console.log(emoticonId);
    wx.navigateTo({ url: '../duanyoudetails/duanyoudetails?emoticonid=' + emoticonId });
  },

  dashaOnclick: function (event) {
    console.log('222222222222222222222222222')
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
  homeOnclick: function (event) {
    var current = event.target.dataset.src;
    wx.switchTab({
      url: '../../index/index'
    })
  },

})