// pages/buildPasswordWrite/buildPasswordWrite.js
const db = wx.cloud.database()//启动云数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buildPassword:'',
  },
  onPwdChange(event){
    console.log(event.detail)
    this.setData({
      buildPassword: event.detail
    })
  },
  next(){
    var that = this
    console.log(that.data.buildPassword)
    db.collection('build_org_pwd').where({
      _id: that.data.buildPassword
    }).get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        if(res.data[0]==null){
          wx.showToast({
            title: '获取权限失败',
            icon: 'none',
            duration: 2000
          })
        }
        else{
          wx.navigateTo({
            url: '../organizationWrite/organizationWrite',
          })
        }    
      } 
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