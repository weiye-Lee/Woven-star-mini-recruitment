// pages/my/my.js
const db = wx.cloud.database() //启动云数据库
Page({

  /*跳转到招贤纳士页面*/
  jump_to_recruitWrite() {
    wx.navigateTo({
      url: '../recruitWrite/recruitWrite',
    })
  },

  /*跳转到毛遂自荐页面*/
  jump_to_sellYourself() {
    wx.navigateTo({
      url: '../resumeWrite/resumeWrite',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false, // 模态框
    orgName:'',
    password: '',
    user_openid: '',
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
  inputOrgNameChange(event){
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
    // console.log("出发了")
    console.log(this.data.orgName)
    console.log(this.data.password)
    var that =this
      db.collection('info_org').where({
         orgName:that.data.orgName,
         orgPassword:that.data.password,
        })
        .get({
          success: function (res) {
            // res.data 是包含以上定义的两条记录的数组
            console.log(res.data)
            if(res.data.length!=0){
              wx.navigateTo({
                url: '../myOrganization/myOrganization?orgName=' + res.data[0].orgName,
              })
            }
            else{
              wx.showToast({
                title: '组织名称或密令错误',
                icon:'none',
                duration: 2000
              })
            }
          },
          fail: err => {
            // handle error
            console.error(err)
          }
        })
    
    
    // if (this.data.password.length == 8) {
    //   db.collection('info_org').where({
    //       _id: db.RegExp({
    //         regexp: this.data.password + '[.]*',
    //         options: 'i',
    //       })
    //     })
    //     .get({
    //       success: function (res) {
    //         // res.data 是包含以上定义的两条记录的数组
    //         console.log(res.data)
    //         wx.navigateTo({
    //           url: '../myOrganization/myOrganization?orgName=' + res.data[0].orgName,
    //         })
    //       },
    //       fail: err => {
    //         // handle error
    //         console.error(err)
    //       }
    //     })
    // }
    // else{
    //   wx.showToast({
    //     title: '密令错误',
    //     icon:'none',
    //     duration: 2000
    //   })
    // }

  },

  // 模态框

  

  // 跳转到投递记录
  gotoDelivery() {
    wx.navigateTo({
      url: '../delivery/delivery?user_openid=' + this.data.user_openid,
    })

  },

  //跳转到联系我们
  gotoOurContact() {
    wx.navigateTo({
      url: '../ourContact/ourContact',
    })
  },

  //跳转到意见反馈
  gotoFeedback() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    return {
      title: '你也来投递简历吧', // 分享标题
      desc: '组织招新就差你了！', // 分享描述
      path: 'path' // 分享路径
    }
  }
})