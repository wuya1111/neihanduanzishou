var util = require('../../utils/util.js');
var math = require('../../utils/math.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
     pageInix: 1
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
    var i = math.jsmaths(5);
    this.pageInix = i;
    this.getRequer(this.pageInix);
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
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

    this.getRequer(this.pageInix);
  }, onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    this.list = null;
    var i = math.jsmaths(5);
    console.log(i)
    this.pageInix = i;
    this.getRequer(this.pageInix);
    wx.stopPullDownRefresh();
  },

  getRequer: function (indx) {
    var timestamp = util.formatTime(new Date);
    var that = this;
    console.log(timestamp)
    var param = {};
    param.showapi_appid = '65900'
    param.showapi_sign = '8aebdd532e2c4c5fb868cce039a906f2'
    param.showapi_timestamp = timestamp

    param.showapi_res_gzip = 1
    param.page = indx
    param.maxResult = 20

    wx.request({
      url: 'https://route.showapi.com/341-3',
      data: param,
      method: "get",
      success: function (res) {
        console.log(res)
        that.pageInix = that.pageInix+1;
        var lists = res.data.showapi_res_body.contentlist;
        for (var i = 0; i < lists.length; i++) {
          var imgsd = lists[i].img;
          imgsd = imgsd.replace("http:", "https:")
          lists[i].img = imgsd;
        }
        if (that.list != null) {
          var list = that.list.concat(lists);
        } else {
          var list = lists;
        }

        that.list = list;

        that.setData({
          list: that.list,
          hasRefesh: lists.length > 0 ? true : false,
          hidden: true
        })
      },
      fail: function () {

      }
    })
  }
  ,
  itemOnclick: function (event) {
    // var item = event.currentTarget.dataset.id;
    var str = (event.currentTarget.dataset.id);
    let strb = JSON.stringify(str);
    console.log("---" + str.name);
    wx.navigateTo({ url: '../animationdetails/animationdetails?jsonStr=' + strb });
  }
})