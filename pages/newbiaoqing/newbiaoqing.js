Page({

  /**
   * 页面的初始数据
   */
  data: {

    rmlist: [],
    dylist: [],
    zzlist: [],
    zzpage: 0,
    searchValue: '',  
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
    this.getRequerrm();
    this.getRequerdy();
    this.getRequerzz(this.data.zzpage)
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
    this.data.dylist = [];
    this.data.rmlist = [];
    this.data.zzlist = [];
    this.data.zzpage = 0;
    this.getRequerrm();
    this.getRequerdy();
    this.getRequerzz(this.data.zzpage)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getRequerzz(this.data.zzpage)
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
      url: 'https://bi2.duowan.com/doutu/apiDoutu.php?os=Android&funcName=GetHotTuJi&version=3.9.8',
      data: param,
      method: "get",
      success: function (res) {
        console.log(res)
        var lists = res.data.data;
        that.data.rmlist = lists;
        console.log(that.data.rmlist)
        that.setData({
          rmlist: that.data.rmlist
        })
      },
      fail: function () {
      }
    })
  },

  getRequerdy: function () {
    var that = this;
    var param = {};
    wx.request({
      url: 'https://bi2.duowan.com/doutu/apiEmoticon.php?os=Android&num=200&uId=-1&page=0&funcName=GetRecommendEmoticon&version=3.9.8',
      data: param,
      method: "get",
      success: function (res) {
        var lists = res.data.data.list
        // that.data.dylist = lists;
        that.data.dylist.push(lists[0]);
        that.data.dylist.push(lists[1]);
        that.data.dylist.push(lists[2]);

        that.setData({
          dylist: that.data.dylist,
          // hasRefesh: lists.length > 0 ? true : false,
        })
      },
      fail: function () {
      }
    })

  },
  getRequerzz: function (index) {
    var that = this;
    var param = {};
    wx.request({
      url: 'https://bi2.duowan.com/doutu/apiDoutu.php?os=Android&page=' + index + '&funcName=GetHotBiaoQing&version=3.9.8',
      data: param,
      method: "get",
      success: function (res) {
        var lists = res.data.data.list
        that.data.zzpage = that.data.zzpage + 1;
        if (that.data.zzlist != null) {
          that.data.zzlist = that.data.zzlist.concat(lists);
        } else {
          that.data.zzlist = lists;
        }

        that.setData({
          zzlist: that.data.zzlist,
          hasRefesh: lists.length > 0 ? true : false,
          hidden: true
        })
      },
      fail: function () {
      }
    })

  }

  ,


  dyckqb: function (event) {
    wx.navigateTo({
      url: '../biaoqingdetails/duanyoubiaoqing/duanyoubiaoqing',
    })
  }
  ,
  rmckqb: function (event) {
    wx.navigateTo({
      url: '../biaoqingdetails/remenbiaoqingbao/remenbiaoqingbao',
    })
  },

  rmimonclick: function (event) {
    var item = (event.currentTarget.dataset.id);
    console.log(item);
    var url = item.url;
    console.log(url);
    var index = url.indexOf("emoticonId=");
    var obj = url.substring(index + 11, url.length);
    console.log(obj);
    wx.navigateTo({ url: '../biaoqingdetails/duanyoudetails/duanyoudetails?emoticonid=' + obj });
  },
  dyimonclick: function (event) {
    var item = (event.currentTarget.dataset.id);

    var emoticonId = item.emoticonId;

    wx.navigateTo({ url: '../biaoqingdetails/duanyoudetails/duanyoudetails?emoticonid=' + emoticonId });
  },

  imageOnclick: function (event) {
    var item = (event.currentTarget.dataset.id);

    wx.previewImage({
      current: item, // 当前显示图片的http链接  
      urls: [item] // 需要预览的图片http链接列表  
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
    // if (!value && this.data.productData.length == 0) {
    //   this.setData({
    //     centent_Show: false,
    //   });
    // }
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
