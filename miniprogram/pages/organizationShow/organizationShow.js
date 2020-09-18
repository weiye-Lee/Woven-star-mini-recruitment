// pages/organization/organization.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    logoSrc:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orgName: options.orgName
    })
    this.getData();

  },
  getData() {
    wx.showLoading({ //在请求等待的过程中对用户提示
      title: '加载中...',
    })
    db.collection('info_org').where({
      orgName: this.data.orgName
    }).get().then((res) => {
      // console.log(res)
      this.setData({
        dataList: res.data[0]
      })
      wx.hideLoading() //加载完之后别忘了隐藏提示
    })
  },
  toRecruit(){
    wx.navigateTo({
      url: '../recruitShow/recruitShow',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})