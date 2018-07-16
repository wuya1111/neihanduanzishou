
var util = require('../../utils/util.js')
var math = require('../../utils/math.js')
var imageUtil = require('../../utils/imageUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    items: [
      { name: '1', value: '藏头', checked: 'true' },
      { name: '2', value: ' 藏尾' },
      { name: '3', value: '藏中' },
      { name: '4', value: '递增' },
      { name: '5', value: '递减' },

    ],
    yitems: [
      { name: '1', value: '双句一压', checked: 'true' },
      { name: '2', value: ' 双句押韵' },
      { name: '3', value: ' 一三四押' },
    ]
    // imagewidth: 0,//缩放后的宽  
    // imageheight: 0,//缩放后的高  

    ,
    userName: '',
    locations: "1",
    yanyu: "1",
    taokouling:""


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

    this.getRequer(this.pageInix);
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    this.list = null;
    this.imgheightswidth = [];
    var i = math.jsmaths(5);
    console.log(i)
    this.pageInix = i;
    this.getRequer(this.pageInix);
    wx.stopPullDownRefresh();
  },

  getRequer: function (types, yayuntype, key) {
    var timestamp = util.formatTime(new Date);
    var that = this;
    console.log(timestamp)
    var param = {};
    param.showapi_appid = '65900'
    param.showapi_sign = '8aebdd532e2c4c5fb868cce039a906f2'
    param.showapi_timestamp = timestamp

    param.showapi_res_gzip = 1
    param.num = 4
    param.type = types
    param.yayuntype = types
    param.key = key

    var that = this;
    wx.request({
      url: 'https://route.showapi.com/950-1',
      data: param,
      method: "get",
      success: function (res) {
        console.log(res)
        that.list = res. data.showapi_res_body.list
       
        // that.taokouling = res.data.showapi_res_body.list;
        console.log("2222222222222"+that.list)
        if (that.list!=null){
          for (var i = 0; i < that.list.length;i++){
            that.taokouling = that.taokouling + that.list[i];
          }
          that.setData({
            list: that.taokouling,
           
            
          })
        }
        
      },
      fail: function () {

      }
    })
  }
  , radioChange: function (e) {
    this.data.locations = e.detail.value;
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
  , radioChange2: function (e) {
    this.data.yanyu = e.detail.value;
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
  ,
  buttons: function (e) {
    this.list=[];
    this.taokouling="";
    this.getRequer(this.data.locations, this.data.yanyu, this.data.userName)
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  copyTBL:function(e){
    var that = this; 
 

  
    wx.setClipboardData({  

      data: that.taokouling,  
      success: function (res) {  
        wx.showModal({ 
          title: '提示',
          content: '复制成功', 
          success: function (res) {  
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }  
          }

         })


      }
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

})