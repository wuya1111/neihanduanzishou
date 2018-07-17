
var util = require('../../utils/util.js')
var math = require('../../utils/math.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageInix: 1,
    pagenumberbbb:5,
    np: 0
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
    
    var i = math.jsmaths(6);

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
  }, 
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    this.list = null;
    console.log(this.pagenumberbbb);
    var i = math.jsmaths(5);
    console.log(i);
    this.pageInix = i;
    this.data.np = 0;
    this.getRequer(this.pageInix);
    wx.stopPullDownRefresh();
  },

  

   getRequer: function (indx) {
    var timestamp = util.formatTime(new Date);
    var that = this;
    console.log(timestamp)
    var param = {};
    var urls = 'https://s.budejie.com/topic/list/jingxuan/29/budejie-android-7.0.2/' + this.data.np + '-20.json?market=tencentyingyongbao&udid=352203061660506&appname=baisibudejie&os=4.3&client=android&visiting=&mac=24%3ADB%3AED%3AC0%3A18%3AE3&ver=7.0.2';
    //  url: 'https://route.showapi.com/255-1',
    wx.request({
      url: urls,
      data: param,
      method: "get",
      success: function (res) {
        console.log(res)
        var rdata = res.data;
        if (rdata.info.np != null) {
          that.data.np = rdata.info.np;
        }

        var lists = res.data.list;
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
     wx.setStorage({
       key: "indexdetails",
       data: str
     })
     wx.navigateTo({ url: '../indexdetails/indexdetails'});
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
})