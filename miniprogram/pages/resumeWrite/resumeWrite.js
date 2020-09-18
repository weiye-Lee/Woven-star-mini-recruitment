const db = wx.cloud.database() //启动云数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_openid:"", //获取openid
    myResume:"",

    show: false, //控制弹出层是否隐藏
    searchName: "", //搜索出的组织名称
    orglist: [],
    sexlist: ['男', '女'],
    value: '',
    collegelist: ['林学院', '野生动物与自然保护地学院', '生命科学学院',
      '理学院', '材料科学与工程学院',
      '机电工程学院', '土木工程学院', '交通学院', '工程技术学院',
      '信息与计算机工程学院', '经济管理学院', '外国语学院',
      '文法学院', '化学化工与资源利用学院',
      '奥林学院'
    ],
    organizationlist1: [], //专门用于接数据库的内容使用
    collageindex: '', //下标索引，辅助实现学院选择
    sexindex: '', //下标索引，辅助实现性别
    organizationindex: '',

    images: [],
    //用户选择上传的图片的地址
    fileIds: [],
    //云存储的图片信息
    usename: '',
    dateofbirth: '',
    professionalgrade: '',
    iphonenumber: '',
    qqnumber: '',
    location: '',
    departmentandreason: '',
    award: '',
    evaluate: '',
    remark: '',
    usesex: '',
    usecollage: '',
    image: '../../images/util/defaultPhoto.jpg', //预置了默认的证件照
    organization: '', //组织名称
    deleteImgParameter: 'true', //hidden是让添加的证件照隐藏
    //以下为日期弹窗部分
    birthshow:false,//控制生日弹窗,默认为如此
    currentDate: null,
    minDate: new Date(1990,1,1).getTime(),
    maxDate: new Date(2050,11,31).getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
    //以上为日期弹窗部分
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this //这里将this定义为that是因为this在数据库库中可能引发某些问题
    db.collection('info_org')
      .get({
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            var index = "orglist[" + i + "]";
            that.setData({
              [index]: res.data[i].orgName
            })
          }
        }
      })
   
    this.setData({
      user_openid: options.openid
    })      
    db.collection('resume').where({  //根据openid从投递记录里取出本人最近的一份简历
      _openid: this.data.user_openid
    }).get().then((res) => {
      var image = "images[" + 0 + "]"
      if(res){
        this.setData({
          myResume: res.data[res.data.length-1],
          usename: res.data[res.data.length-1].usename,
          usesex: res.data[res.data.length-1].usesex,
          dateofbirth: res.data[res.data.length-1].dateofbirth,
          usecollage: res.data[res.data.length-1].usecollage,
          professionalgrade: res.data[res.data.length-1].professionalgrade,
          iphonenumber: res.data[res.data.length-1].iphonenumber,
          qqnumber: res.data[res.data.length-1].qqnumber,
          location: res.data[res.data.length-1].location,
          award: res.data[res.data.length-1].award,
          evaluate: res.data[res.data.length-1].evaluate,

        })
      }
    })

    if(options.orgname) {
      console.log(options)
      this.setData({
        organization: options.orgname
      })
    }
  },
  //回车触发 搜索功能
  search: function (e) {
    console.log(e.detail)
    var key = e.detail; //获取输入框输入内容
    this.setData({
      show: true
    })
    db.collection('info_org').where({ //查询        
      orgName: {
        $regex: '.*' + key,
        $options: 'i'
      }
    }).get({
      success: res => {
        console.log(res.data.length)

        var clear = [];
        this.setData({ //重新获取前 清空原数组
          searchName: clear
        })
        for (var i = 0; i < res.data.length; i++) {
          console.log("a")
          var index = "searchName[" + i + "]"

          this.setData({
            [index]: res.data[i].orgName,
          })
        }
      }
    })

  },
  // 弹出层 确认
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      organization: event.detail.value,
      show: false
    })
  },
  // 弹出层 取消
  onCancel() {
    this.setData({
      show: false
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

  /*
  性别选择
   */
  selectsex: function (e) {

    this.setData({
      sexindex: e.detail.value,
      usesex: this.data.sexlist[e.detail.value]
    })
  },

  /**
   * 选择学院
   */
  selectcollage: function (e) {

    this.setData({
      collageindex: e.detail.value,
      usecollage: this.data.collegelist[e.detail.value]
    })
  },

  /**
   * 选择组织
   */
  selectorganization: function (e) {

    this.setData({
      organizationindex: e.detail.value,
      organization: this.data.orglist[e.detail.value]
    })
  },

  /**
   * 单张证件照上传
   */
  //上传图片
  chooseImg() {
    wx.chooseImage({
      count: 1,
      //允许上传图片的最大数量 
      sizeType: ['original', 'compressed'],
      //当前图片类型原图或压缩图
      sourceType: ['album', 'camera'],
      //相册或相机
      success: res => { //使用箭头函数
        // tempFilePath可以作为img标签的src属性显示图片

        const tempFilePaths = res.tempFilePaths //可以再次找到图片的图片的地址
        this.setData({
          images: tempFilePaths,
          image: tempFilePaths, //获取图片地址
          deleteImgParameter: 'true', //让装证件照的容器显示出来

        })
      }
    })
    console.log("img--" + this.data.image)
  },

  gotoPreview: function (e) {

    /**
     * 通过url将数据传递给预览页面进行展示
     */
    wx.navigateTo({
      url: '../previewResume/previewResume?usename=' + this.data.usename +
        '&sex=' + this.data.usesex +
        '&collage=' + this.data.usecollage +
        '&professionalgrade=' + this.data.professionalgrade +
        '&iphonenumber=' + this.data.iphonenumber +
        '&qqnumber=' + this.data.qqnumber +
        '&location=' + this.data.location +
        '&departmentandreason=' + this.data.departmentandreason +
        '&award=' + this.data.award +
        '&evaluate=' + this.data.evaluate +
        '&dateofbirth=' + this.data.dateofbirth +
        '&remark=' + this.data.remark +
        '&img=' + this.data.image +
        '&organization=' + this.data.organization,
    })
  },

  /**
   * 获取页面姓名参数值
   */
  onnameChange: function (e) {

    this.setData({
      usename: e.detail
    })
    // console.log("usuname--" + this.data.usename)
  },



 // /**
  //  * 获取页面生日参数值
  //  */
  // onbirthChange: function (e) {

  //   this.setData({

  //     dateofbirth: e.detail
  //   })
  //   // e.getValues()
  
  // },

  /**
 * 选择生日以后，存储生日(滑轮选择生日部分代码)
 */
setbirthDay:function(e) {


  var n = e.detail  //e.detail返回的是毫秒级的时间戳
  var date = new Date(n);
  //年
  var Y = date.getFullYear();
  //月
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //日
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  //时
  var h = date.getHours();
  //分
  var m = date.getMinutes();
  //秒
  var s = date.getSeconds();
 
  console.log("当前时间：" + Y + "-" + M + "-" + D)
  var mycurretetime =  Y + "年" + M + "月" + D + "日";
 
   this.setData({
    dateofbirth: mycurretetime,
     birthshow: false,
   })
   
   console.log(this.data.dateofbirth)
 
 },
 selectbirth:function(e){
 
   this.setData({
     dateofbirth: e.value,
   })
 
   // console.log(e.getValues())
 },
 

  /**
   * 获取页面专业年级参数值
   */
  onprofessionalgradeChange: function (e) {

    this.setData({
      professionalgrade: e.detail
    })
    // console.log("usuname--" + this.data.usename)
  },

  /**
   * 获取页面手机号参数值
   */
  oniphonenumberChange: function (e) {

    this.setData({
      iphonenumber: e.detail
    })
    // console.log("usuname--" + this.data.usename)
  },

  /**
   * 获取页面QQ号参数值
   */
  onqqnumberChange: function (e) {

    this.setData({
      qqnumber: e.detail
    })
    // console.log("usuname--" + this.data.usename)
  },

  /**
   * 获取页面居住位置参数值
   */
  onlocationChange: function (e) {

    this.setData({
      location: e.detail
    })
    // console.log("usuname--" + this.data.usename)
  },

  /**
   * 获取页面意向部门以及加入理由参数值
   */
  ondepartmentandreasonChange: function (e) {

    this.setData({
      departmentandreason: e.detail
    })
    // console.log("usuname--" + this.data.usename)
  },

  /**
   * 获取页面曾获奖励参数值
   */
  onawardChange: function (e) {

    this.setData({
      award: e.detail
    })
    // console.log("usuname--" + this.data.usename)
  },

  /**
   * 获取页面个人评价参数值
   */
  onevaluateChange: function (e) {

    this.setData({
      evaluate: e.detail
    })
    // console.log("usuname--" + this.data.usename)
  },

  /**
   * 获取页面备注参数值
   */
  onremarkChange: function (e) {

    this.setData({
      remark: e.detail
    })
    // console.log("usuname--" + this.data.usename)
  },


  /**
   * 将页面参数值上传到数据库
   */

  submit() {
    if (this.data.usename.length != 0 && this.data.dateofbirth.length != 0 && this.data.usesex.length != 0 && this.data.organization.length != 0 && this.data.usecollage.length != 0 && this.data.professionalgrade.length != 0 && this.data.iphonenumber.length != 0 && this.data.qqnumber.length != 0 && this.data.location.length != 0 && this.data.departmentandreason.length != 0 && this.data.iphonenumber.length == 11) {
      wx.showLoading({
        title: '发布中...', //上传时友好的交互

      })
      let promiseArr = [] //保存promise对象的数组 异步操作
      for (let i = 0; i < this.data.images.length; i++) {
        promiseArr.push(new Promise((reslove, reject) => {
          let item = this.data.images[i]
          // 正则表达式 取出图片的扩展名
          let suffix = /\.\w+$/.exec(item)[0]
          wx.cloud.uploadFile({
            cloudPath: Math.random() + suffix,
            filePath: item, // 文件本地路径
            success: res => {
              // get resource ID
              console.log(res.fileID)
              this.setData({
                fileIds: this.data.fileIds.concat(res.fileID)
              })
              reslove()
            },
            fail: err => {
              console.error(err)
              reject()
            }
          })

        }))
      }


      Promise.all(promiseArr).then(res => {
        console.log('所有图片上传完成') //插入到云数据库
        const _ = db.command
        db.collection('resume').add({ //recruit译为招新，是我建的表的名字，你需要改成你自己的

          data: {
            // fileIds: this.data.fileIds, //已上传至云存储的图片id列表
            usename: this.data.usename,
            dateofbirth: this.data.dateofbirth,
            professionalgrade: this.data.professionalgrade,
            iphonenumber: this.data.iphonenumber,
            qqnumber: this.data.qqnumber,
            location: this.data.location,
            departmentandreason: this.data.departmentandreason,
            award: this.data.award,
            evaluate: this.data.evaluate,
            remark: this.data.remark,
            usesex: this.data.usesex,
            usecollage: this.data.usecollage,
            image: this.data.image,
            orgName: this.data.organization,
            fileIds: this.data.fileIds,
          }
        }).then(res => {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
            icon: "success",
            duration: 2000,
          }
          ).then(()=>{
            db.collection('recruit').where({
              orgName:this.data.organization
            }).update({
              data: {
                // 表示指示数据库将字段自增 10
                'hot': _.inc(1)
              },
              success: function(res) {
                console.log(res.data)
              }
            })
            
          })
          
        }).catch(err => {
          console.error(err)
          wx.hideLoading()
        })
        

      }).catch(err => {
        console.error(err)
      })
      wx.switchTab({
        url: '../my/my',        
        });


    } else {
      if (this.data.usename.length == 0) {
        wx.showToast({
          title: '请填写姓名',
          icon: 'none',
          duration: 2000,
        })
      }
      if (this.data.dateofbirth.length == 0) {
        wx.showToast({
          title: '请填写出生年月',
          icon: 'none',
          duration: 2000,
        })
      }
      if (this.data.usesex.length == 0) {
        wx.showToast({
          title: '请选择性别',
          icon: 'none',
          duration: 2000,
        })
      }
      if (this.data.organization.length == 0) {
        wx.showToast({
          title: '请选择意向组织',
          icon: 'none',
          duration: 2000,
        })
      }
      if (this.data.usecollage.length == 0) {
        wx.showToast({
          title: '请选择所在学院',
          icon: 'none',
          duration: 2000,
        })
      }
      if (this.data.professionalgrade.length == 0) {
        wx.showToast({
          title: '请填写专业年级',
          icon: 'none',
          duration: 2000,
        })
      }
      if (this.data.iphonenumber.length == 0) {
        wx.showToast({
          title: '请填写您的联系电话',
          icon: 'none',
          duration: 2000,
        })
      }
      if (this.data.iphonenumber.length != 11) {
        wx.showToast({
          title: '请输入正确格式手机号码',
          icon: 'none',
          duration: 2000,
        })
      }

      if (this.data.qqnumber.length == 0) {
        wx.showToast({
          title: '请填写您的QQ账号',
          icon: 'none',
          duration: 2000,
        })
      }
      if (this.data.location.length == 0) {
        wx.showToast({
          title: '请填写您的寝室地址',
          icon: 'none',
          duration: 2000,
        })
      }
      if (this.data.departmentandreason.length == 0) {
        wx.showToast({
          title: '请填写您的意向部门及理由',
          icon: 'none',
          duration: 2000,
        })
      }value
      if (this.data.award.length != 0) {
        wx.showToast({
          title: '请填写您的自我评价',
          icon: 'none',
          duration: 2000,
        })
      }
      if (this.data.evaluate.length != 0) {
        wx.showToast({
          title: '请填写您的主要经历',
          icon: 'none',
          duration: 2000,
        })
      }

    }


  },

  /**
   * 删除已经选中的证件照
   */
  deleteImg: function () {
    this.setData({
      deleteImgParameter: false,
      image: '../../images/util/defaultPhoto.jpg'
    })

    console.log("删除照片")
  },
  // 控制生日弹窗
  showPopup() {
    this.setData({ birthshow: true });
  },

  onClose() {
    this.setData({ birthshow: false });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
    // console.log(this.data.currentDate)
  },
});