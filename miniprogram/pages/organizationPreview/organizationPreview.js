// pages/organizationShow/organizationShow.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    logoSrc: [],
    imgList: [],
    depList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var imageLogo = JSON.parse(options.logoSrc)//传过来的logoSrc和orgSrc无法直接使用，因为是JSON格式的，所以要重新转化为对象，depList同理
    var imgList = JSON.parse(options.imgList)
    var depList = JSON.parse(options.depList)
    this.setData({
      dataList: options,
      logoSrc: imageLogo,
      imgList: imgList,
      depList: depList
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