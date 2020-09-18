// pages/loading/loading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading1Show:true,
    loadingBtn:true,
    loadingChoose:false,
    animationData:{},

    // -----
    region: ['黑龙江省', '哈尔滨市', '香坊区'], 
    select:true,
    list1:['东北林业大学'],
    list2:['当前仅支持东北林业大学'],
    modalHidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var timer = setTimeout(function(){
        var animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'linear',
        })
     
        this.animation = animation
     
        animation.opacity(1).step()
     
        that.setData({
          animationData: animation.export()
        })
         clearTimeout(timer)  
       },3000)

       
  },
  //立即体验
  enter() {
    console.log("enter")
    this.setData({
      loading1Show: false,
      loadingChoose: true,
      loadingBtn: false
    })

   
  },
  
  chooseSchool(){

    if(this.data.select===true){
      wx.setStorage({
        key: 'loadOpen',
        data: 'ok'
      }),
      wx.switchTab({
        url: '../homePage/homePage',
      })
    }else {
      this.setData({
        modalHidden: false
      })
    }
  },

  PickerChange: function(e) {
 
    this.setData({
      index:e.detail.value
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
  // -----------
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
    var zone =e.detail.value[2];
if(zone === "香坊区"){
  this.setData({
    select : true
  })

}else{
  this.setData({
    select : false
  })
}
},



 modalChange: function(e) {
  this.setData({
    modalHidden: true
  })
},

})