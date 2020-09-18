// miniprogram/pages/hotRank/hotRank.js
const db = wx.cloud.database() //启动云数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList: null
  },
  gotoRecruitShow(event) {
    var recruitid = event.currentTarget.dataset.recruitid
    console.log(recruitid)
    wx.navigateTo({
      url: '../recruitShow/recruitShow?recruitId=' + recruitid + "&openid=" + this.data.user_openid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var myres = null
    db.collection('recruit').orderBy('hot', 'desc')
    .get({
      success: function (res) {
        // res.data 是包含以上定义的两条记录的数组

        myres = res.data

        var t = 0;
        for (var i = 0; i < myres.length; i++) {
          console.log("come in")
          db.collection('info_org').where({
            orgName:myres[i].orgName
          }).get({
            success:function(res2){
              var index = "rankList[" + t+ "].logoFileIds";
              t++;
              that.setData({
                [index]: res2.data[0].logoFileIds
              })
            }
          })
        }
        that.setData({
          rankList: res.data
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

  }
})