// pages/myOrganization/myOrganization.js
const db = wx.cloud.database()
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_openid:"",
    resumeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.user_openid);
   
    this.setData({
      user_openid: options.user_openid
    }),
      this.getData();
  },
  getData() {

    db.collection('resume').where({
      _openid: this.data.user_openid
    }).get().then((res) => {
      this.setData({
        resumeList: res.data,
      })
      
    })
  },

  // 跳转向每一条简历
  toResume(e) {
    console.log(e.currentTarget.dataset.name)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../resumeShow/resumeShow?resumeId=' + id,
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