
var util = require('../../utils/util.js')
var math = require('../../utils/math.js')
var imageUtil = require('../../utils/imageUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pageInix:0,
    searchValue: '',  
    pagenumber: 10,
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
    this.imgheightswidth = [];
    var i = math.jsmaths(this.data.pagenumber);
    console.log(i)
    this.data.pageInix = i;
    this.data.list = null;
    this.data.pageInix = i;
    this.getRequer(this.data.pageInix);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getRequer(this.data.pageInix);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
  , 
  getRequer: function (indx) {
    var that = this;
    var param = {};
    param.page = indx
    wx.request({
      url: 'https://www.doutula.com/api/photo/list/?page=' + indx,
      data: param,
      method: "get",
      success: function (res) {
        console.log(res)
        that.data.pageInix = that.data.pageInix + 1;
        var lists = res.data;
        if (that.data.list != null) {
          var list = that.data.list.concat(lists);
        } else {
          var list = lists;
        }
        that.data.list = list;
        console.log(that.data.list["0"].image_url)
        that.setData({
          list: that.data.list,
          hasRefesh: lists.length > 0 ? true : false,
          hidden: true
        })
      },
      fail: function () {
      }
    })
  }
,
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    if (!value && this.data.productData.length == 0) {
      this.setData({
        centent_Show: false,
      });
    }
  },  
  buttonClick: function (event){
    var that = this;
    var str = (event.currentTarget.dataset.id);
    wx.previewImage({
      current: str.image_url, // 当前显示图片的http链接  
      urls: [str.image_url] // 需要预览的图片http链接列表  
    })
  },
  
  suosou: function (event) {
  
    var id = event.currentTarget.dataset.id

    var that = this;
   
    wx.navigateTo({ url: '../searchbiaoqing/searchbiaoqing?search=' + that.data.searchValue });
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

})