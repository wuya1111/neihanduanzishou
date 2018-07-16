
var util = require('../../utils/util.js')
var math = require('../../utils/math.js')
var imageUtil = require('../../utils/imageUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageInix: 1,
    imgheightswidth: [],
    // imagewidth: 0,//缩放后的宽  
    // imageheight: 0,//缩放后的高  
    pagenumber: 400,
    imgalist: ['../images/dashantup.jpg'],
    np:0

    
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

    // var i = math.jsmaths(this.pagenumber);
    // console.log(i);
    // this.data.pageInix = i;
    this.getRequer(this.data.pageInix);
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
  imageLoad: function (e) {
    var that = this;
    var imageSize = imageUtil.imageUtil(e)
    this.imgheightswidth.push(imageSize)
    console.log('缩放后的宽: ' + this.imgheightswidth)

    // this.setData({
    //   // imagewidth: imageSize.imageWidth,
    //   // imageheight: imageSize.imageHeight
    //   imagewidth: that.imgheightswidth[0].imageWidth,
    //   imageheight: that.imgheightswidth[0].imageHeight
    // })
  }
  ,
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数


    var i = math.jsmaths(this.data.pagenumber);
    console.log(i)
    this.data.pageInix = i;
    this.getRequer(this.data.pageInix);
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    this.list = null;
    this.imgheightswidth = [];
    var i = math.jsmaths(this.data.pagenumber);
    console.log(i)
    this.data.pageInix = i;

    this.data.np=0;
    this.getRequer(this.data.pageInix);
    wx.stopPullDownRefresh();
  },
  startPlay: function (e) {
    var curVideoId = e.currentTarget.id;

    if (this.data.prevVideoId) {
      var prevV = wx.createVideoContext(this.data.prevVideoId);
      prevV.pause()

    }

    var videoContext = wx.createVideoContext(curVideoId);

    videoContext.play();
    this.setData({
      prevVideoId: curVideoId
    });

  },
  getRequer: function (indx) {
    console.log("------下标-----+" + indx)
    var timestamp = util.formatTime(new Date);
    var that = this;
    that.data.pageInix = that.data.pageInix + 1;
    console.log(timestamp)
    var param = {};
    // param.showapi_appid = '65900'
    // param.showapi_sign = '8aebdd532e2c4c5fb868cce039a906f2'
    // param.showapi_timestamp = timestamp

    // param.showapi_res_gzip = 1
    // param.page = indx
    // param.maxResult = 20

    var urls = 'https://s.budejie.com/topic/list/jingxuan/10/budejie-android-7.0.2/' + this.data.np+'-20.json?market=tencentyingyongbao&udid=352203061660506&appname=baisibudejie&os=4.3&client=android&visiting=&mac=24%3ADB%3AED%3AC0%3A18%3AE3&ver=7.0.2';
    // url: 'https://route.showapi.com/255-1',
    wx.request({
      url: urls,
      data: param,
      method: "get",
      success: function (res) {
        console.log(res)
      var rdata=  res.data;
        if (rdata.info.np!=null){
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
    console.log( str);

    wx.setStorage({
      key: "indexdetails",
      data: str
    })
    wx.navigateTo({ url: '../indexdetails/indexdetails' });
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

    // wx.previewImage({
    //   current: current, // 当前显示图片的http链接  
    //   urls: ['http://bmob-cdn-19520.b0.upaiyun.com/2018/06/14/4a4d02014087da83808da67ed7a486c3.jpg'] // 需要预览的图片http链接列表  
    // })  
  }



})