
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
   console.log(i);
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
    this.getRequer(this.pageInix);
    wx.stopPullDownRefresh();
  },

  // getRequer: function (indx) {
  //   var timestamp = util.formatTime(new Date);
  //   var that = this;
  //   console.log(timestamp)
  //   var param = {};
  //   param.showapi_appid = '65900'
  //   param.showapi_sign = '8aebdd532e2c4c5fb868cce039a906f2'
  //   param.showapi_timestamp = timestamp

  //   param.showapi_res_gzip = 1
  //   param.page = indx
  //   param.maxResult = 20

  //   wx.request({
  //     url: 'https://route.showapi.com/341-1',
  //     data: param,
  //     method: "get",
  //     success: function (res) {
  //       console.log(res)
  //       that.pageInix = that.pageInix + 1;
  //       var lists = res.data.showapi_res_body.contentlist;
       
  //       if (that.list != null) {
  //         var list = that.list.concat(lists);
  //       } else {
  //         var list = lists;
  //       }

  //       that.list = list;

  //       that.setData({
  //         list: that.list,
  //         hasRefesh: lists.length > 0 ? true : false,
  //         hidden: true
  //       })
  //     },
  //     fail: function () {

  //     }
  //   })
  // }


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
    param.type = 29

    wx.request({
      url: 'https://route.showapi.com/255-1',
      data: param,
      method: "get",
      success: function (res) {
        console.log(res)
        that.pageInix = that.pageInix + 1;
        var lists = res.data.showapi_res_body.pagebean.contentlist;
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
     wx.navigateTo({ url: '../indexdetails/indexdetails?jsonStr=' + strb });
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