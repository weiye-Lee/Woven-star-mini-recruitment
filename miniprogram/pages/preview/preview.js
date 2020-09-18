// pages/preview/preview.js
const db = wx.cloud.database()//启动云数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgName:null,
    title:null,
    // place:null,
    // time:null,
    addition:null,
    image:null,
    video:null,
    flag:true,
    lists:[{department:''}],//用于增减input的数组
    timePlaceList:[{
      place:'',
      time:'',
    }],//用于增减招新时间地点input的数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.lists)//JSON格式的
    console.log(options.timePlaceList)
    var lists2 = JSON.parse(options.lists)//转成数组
    var lists3 = JSON.parse(options.timePlaceList)
    this.setData({
      orgName: options.orgName,
      title:options.title,
      // place:options.place,
      // time:options.time,
      timePlaceList:lists3,
      lists:lists2,
      addition:options.addition,
      image:options.image,
      video:options.video,
    })
    console.log(this.data.lists)
    var that = this;
    db.collection('open1').get({
      success: function (res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        that.setData({
          flag: res.data[0].flag
        });        
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