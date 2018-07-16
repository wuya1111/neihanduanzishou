Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    list: [],
    listurl: [],
    pageInix: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var search= options.search;
    this.data.searchValue = search;
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
    var param = {};
    param.page = indx
     var that = this;
     wx.request({
       url: 'https://www.doutula.com/api/search?keyword=' + that.data.searchValue,
       data: param,
       method: "get",
       success: function (res) {
         console.log(res)
         var lists = res.data.data.list;

         if (that.data.list != null) {
           var list = that.data.list.concat(lists);
         } else {
           var list = lists;
         }
         that.data.list = list;

         that.data.pageInix = that.data.pageInix + 1;
       
         that.setData({
           list: that.data.list,
           hasRefesh: lists.length > 0 ? true : false,
           hidden: true
         })
       },
       fail: function () {
       }
     })
  },

  buttonClick: function (event) {
    var that = this;
    var str = (event.currentTarget.dataset.id);
    console.log(that.data.list)
    for (var i = 0; i < that.data.list.length; i++) {
      that.data.listurl.push(that.data.list[i].image_url);
    }
    console.log(that.data.listurl)
    wx.previewImage({
      current: str.image_url, // 当前显示图片的http链接  
      urls: that.data.listurl// 需要预览的图片http链接列表  
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
  },
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
 
  }, 
suosou: function (event) {
  this.data.pageInix=1;

  this.data.list=[];
  this.getRequer(this.data.pageInix);
  }  
})