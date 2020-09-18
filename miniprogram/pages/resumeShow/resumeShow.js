// pages/resumeShow/resemeShow.js
const db = wx.cloud.database() //启动云数据库
Page({


  /**
   * 页面的初始数据
   */
  data: {
    array: ['男', '女'],
    fileList: [],
    orgName:'',
    username:'',
    resume:'',
    resumeId:'',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // orgName:options.orgName,
      // username:options.username,
      resumeId:options.resumeId,
    })
    var that =this
    db.collection('resume').where({
      // orgName: that.data.orgName,
      // usename:that.data.username,
      _id:that.data.resumeId,
    }).get({
      success: function (res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        that.setData({
          resume: res.data[0]//注意！！！！要取出数组中的第一个
        })
      }
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

  },

  //form表单提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  //form表单重置
  formReset: function () {
    console.log('form发生了reset事件')
    this.setData({
      inputValue: ""
    })
  },
  /*
  性别选择
   */
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  }

})