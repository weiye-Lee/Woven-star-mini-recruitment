// miniprogram/pages/homePage/homePage.js
const db = wx.cloud.database() //启动云数据库
var time = require('../../utils/util.js'); //调用时间戳转化函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_openid:"",//获取openid

    currentIndex: 0,
    schoolList: [],
    showModal: false, // 模态框
    orgName: '',
    password: '',
    createTimeList: [], //用于放置动态创建时间的数组
  },


  // 模态框
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },



  // 跳转到建立组织
  WriteBuildPassword() {
    wx.navigateTo({
      url: '../buildPasswordWrite/buildPasswordWrite'
    })
  },
  //输入组织名称
  inputOrgNameChange(event) {
    console.log(event.detail.value)
    this.setData({
      orgName: event.detail.value
    })
  },
  //输入组织密令
  inputPwdChange(event) {
    console.log(event.detail.value)
    this.setData({
      password: event.detail.value
    })
  },

  //提交组织密令
  verify() {
    console.log(this.data.schoolList)
    // console.log("出发了")
    console.log(this.data.orgName)
    console.log(this.data.password)
    var that = this
    db.collection('info_org').where({
        orgName: that.data.orgName,
        orgPassword: that.data.password,
      })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          if (res.data.length != 0) {
            wx.navigateTo({
              url: '../recruitWrite/recruitWrite?orgId=' + res.data[0]._id,
            })
          } else {
            wx.showToast({
              title: '组织名称或密令错误',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: err => {
          // handle error
          console.error(err)
        }
      })


  },

  gotoRecruitWrite(event) { //参数event为事件对象
    //跳转到招新信息填写界面
    console.log(this.data.schoolList)
    // console.log(event)
    wx.navigateTo({
      url: '../recruitWrite/recruitWrite'
    })
  },
  gotoResumeWrite(event) {
    console.log(this.data.schoolList)
    wx.navigateTo({
      url: '../resumeWrite/resumeWrite?openid=' + this.data.user_openid
    })
  },

  gotoRecruitShow(event) {
    var recruitid = event.currentTarget.dataset.recruitid
    console.log(recruitid)
    wx.navigateTo({
      url: '../recruitShow/recruitShow?recruitId=' + recruitid + "&openid=" + this.data.user_openid,
    })
  },
  gotoRank(event){
    wx.navigateTo({
      url: '../hotRank/hotRank'
    })
  },

  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    this.queryData(id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('recruit').orderBy('createTime', 'desc')
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          that.setData({
            schoolList: res.data
          })
          //------------------------------      
          //此处将时间戳转化成为了“2020-04-08”格式；
          //函数：time.formatTime在../../utils/utils.js
          for (var i = 0; i < res.data.length; i++) {
            var index = "createTimeList[" + i + "]";
            console.log("dsads");
            that.setData({
              [index]: time.formatTime(res.data[i].createTime, 'Y-M-D')
            })
          }
          //------------------------
    

        }
      })

       // 获取openid
       wx.cloud.callFunction({
        name:'login',
        data:{
        },
        success:res=>{
          console.log(res.result.openid);
          this.setData({
            user_openid: res.result.openid,   
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