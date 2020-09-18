// pages/previewResume/previewResume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // array: ['男', '女'],
    org: '99',
    usename: '',
    sex: '',
    collage: '',
    professionalgrade: '',
    iphonenumber: '',
    qqnumber: '',
    location: '',
    departmentandreason: '',
    award: '',
    evaluate: '',
    dateofbirth: '',
    remark: '',
    img: '../../images/util/addImg.png',
   
    organization:'',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /**
     * 接受简历填写页面传来的数据
     */
    this.setData({
      usename: options.usename,
      sex: options.sex,
      collage: options.collage,
      professionalgrade: options.professionalgrade,
      iphonenumber: options.iphonenumber,
      qqnumber: options.qqnumber,
      location: options.location,
      departmentandreason: options.departmentandreason,
      award: options.award,
      evaluate: options.evaluate,
      dateofbirth: options.dateofbirth,
      remark: options.remark,
      img: options.img,
      organization:options.organization
      
     

    })
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //form表单提交
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

 

})