// pages/myOrganization/myOrganization.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    orgName:"",
    userList:[],
    classifyList1:[],
    classifyList2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var name = options.orgName
    this.setData({
      orgName: name
    }),
    this.getData();
  },
  getData() {
    
    db.collection('resume').where({
      orgName: this.data.orgName
    }).get().then((res) => {
      console.log(res.data)
      this.setData({
        userList: res.data
      })
    })
  },
  // 控制简历记录的展示/隐藏
  showList() {
    this.setData({
      show: !this.data.show
    })
  },
  // 跳转向每一条简历
  toResume(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    var resumeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../resumeShow/resumeShow?resumeId=' + resumeId,
    })
  },
  updateBtn(){
    wx.navigateTo({
      url: '../organizationUpdate/organizationUpdate?orgName=' + this.data.orgName,
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