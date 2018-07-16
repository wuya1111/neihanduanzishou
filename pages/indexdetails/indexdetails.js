Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // that.data.item= options.item;

    wx.getStorage({
      key: 'indexdetails',
      success: function (res) {
        console.log("222222222222")
        that.data.item = res.data;
        console.log(res.data)
        that.setData({
          item: that.data.item
        })
      }
    })


    // console.log(options.jsonStr)
    // let object = JSON.parse(options.jsonStr);
    // // var objects=(options.jsonStr);  
    // console.log(object)

    // that.data.item = object;
    console.log(that.data.item)

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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


  imageOnclick: function (event){
    var that= this;
    var imageuil;
    imageuil = event.currentTarget.dataset.src

    // if (that.data.item.cdn_img!=null){
    //   imageuil= that.data.item.cdn_img
    // }else{
    //   imageuil = that.data.item.image0
    // }
    wx.previewImage({
      current: imageuil, // 当前显示图片的http链接  
      urls: [imageuil] // 需要预览的图片http链接列表  
    }) 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("--3333-");
    var that= this;
    let str = JSON.stringify(that.data.item);  
    return {
      path: '/pages/indexdetails/indexdetails?jsonStr=' + str
    }
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
  ,
  homeOnclick: function (event) {
    var current = event.target.dataset.src;
    wx.switchTab({
      url: '../index/index'
    })
  },

})