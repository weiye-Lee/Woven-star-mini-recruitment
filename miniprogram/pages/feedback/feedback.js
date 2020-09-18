// pages/feedback/feedback.js
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    feedback_info: null
  },

  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      feedback_info: e.detail.value
    })
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


  },

  getData: function () {
    if (this.data.feedback_info != null) {
      db.collection("feedback").add({
        data: {
          feedback_info: this.data.feedback_info
        }
      }).then(res => {
        console.log(res)
      }).catch(res => {
        console.log("失败", res)
      })
      wx.showToast({
        title: '反馈成功',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '别着急~您还没有填写意见',
        icon: 'none',
        duration: 2000,
      })
    }
  },


})