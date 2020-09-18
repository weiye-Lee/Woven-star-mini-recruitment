// pages/recruitShow/recruitShow.js

const db = wx.cloud.database() //启动云数据库

Page({
  /**
   * 页面的初始数据
   */
  data: {
    recruitId:0,
    recruit:null,
    user_openid:"",
    flag:true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      recruitId: options.recruitId,
      user_openid: options.openid
    })
    wx.showLoading({ //在请求等待的过程中对用户提示
      title: '加载中...',
    })
    var that =this
    db.collection('recruit').where({
      _id: that.data.recruitId
    }).get({
      success: function (res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        that.setData({
          recruit: res.data
        })
        
      }
    })
    db.collection('open1').get({
      success: function (res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        that.setData({
          flag: res.data[0].flag
        });        
      }
    })
    wx.hideLoading() //加载完之后别忘了隐藏提示
  },

  //点我报名
  gotoResumeWrite(){
    wx.navigateTo({
      url: '../resumeWrite/resumeWrite?openid=' + this.data.user_openid + "&orgname=" + this.data.recruit[0].orgName,
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})