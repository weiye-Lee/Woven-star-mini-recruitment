// pages/organizationWrite/organizationWrite.js
const db = wx.cloud.database()
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: {},//记录是否修改风采图片 0为否
    _id:"",
    list: [{
      depName: "",
      depIntro: ""
    }], //部门相关信息的列表
    orgName: "", //组织名称
    orgPassword:'',
    department: "", //隶属部门
    foundTime: "", //成立时间
    adviser: "", //指导教师
    adviserIntro: "", //教师简介
    orgIntro: "", //组织简介
    qqNumber: "", //qq群号
    mailNumber: "", //邮箱
    logoSrc: [], //logo图片的src
    fileIds:[],//云存储的风采展示图片信息
    logoFileIds:[], //云存储的logo图片信息
    show: false,
    classifyList: ['学生生活', '学术科技', '志愿服务', '艺术审美'],
    classify:"", //用户选择的社团类别
    classifyindex:"",
    org:null,
    imgList:[] //风采展示2.0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orgName: options.orgName
    })
    this.getData();
  },
   getData() {
    wx.showLoading({ //在请求等待的过程中对用户提示
      title: '加载中...',
    })
    db.collection('info_org').where({
      orgName: this.data.orgName
    }).get().then((res) => {

      this.setData({
        org:res.data,//集合全部拿过来
        _id: res.data[res.data.length-1]._id,
        list: res.data[res.data.length-1].depList, //部门列表
        orgName: res.data[res.data.length-1].orgName, //组织名称
        orgPassword:res.data[res.data.length-1].orgPassword,//登陆密码
        department: res.data[res.data.length-1].department, //隶属部门
        foundTime: res.data[res.data.length-1].foundTime, //建立时间
        adviser: res.data[res.data.length-1].adviser, //指导教师
        adviserIntro: res.data[res.data.length-1].adviserIntro, //教师介绍
        orgIntro: res.data[res.data.length-1].orgIntro, //组织介绍
        qqNumber: res.data[res.data.length-1].qqNumber, //qq招新群
        mailNumber: res.data[res.data.length-1].mailNumber, //邮箱
        fileIds:  res.data[res.data.length-1].fileIds, //风采图片
        logoFileIds: res.data[res.data.length-1].logoFileIds, //logo
        classify: res.data[res.data.length-1].classify, //社团分类
        imgList: res.data[res.data.length-1].imgList //风采展示2.0
      })

      wx.hideLoading() //加载完之后别忘了隐藏提示
    })
  },
  //组织分类索引
  change(e) {
    this.setData({
      classifyindex: e.detail.value,
      classify: this.data.classifyList[e.detail.value]
    })
  },
  //获取输入框输入数据
  inputDetail(e) {
    this.setData({
      [e.target.dataset.name]: e.detail
    })
  },
//获取风采展示输入框输入数据
inputImgDetail(e) {
  var id = e.target.dataset.id;
  var index = "imgList.[" + id + "].imgText"
  this.setData({
    [index]: e.detail
  })
},
  //增减部门以及部门输入数据
  onDepartmentChange(event)  {     // event.detail 为当前输入的值

    var  id  =  event.target.dataset.id //当前组件的id
    var name = event.target.dataset.name //需要接收的属性，比如我的对象是{depName:"",depIntro:""}，这里的name就会是depName或者depIntro，在wxml中用data-name="depName"绑定
          //lists就是你js中data中的定义的一个数组变量，[]里面的值代表数组的下标，depaetment是你申明的这个数组中的key，拼接在一起，结果就是当前下标的值
    var  index  =  "list["  +  id  +  "]." + name;    
    this.setData({        
      [index]: event.detail         //这里进行赋值   
    })  
  },
    
  addDep(e) {
    var newDep = {
      depName: "",
      depIntro: ""
    };
    var newList = this.data.list;
    newList.push(newDep);
    this.setData({
      list: newList
    })
  },
  delDep() {
    var newList = this.data.list;
    newList.pop();
    this.setData({
      list: newList
    })
  },
  addImg(e) {
    var newImg = {
      imgSrc: "",
      imgText: ""
    };
    var newList = this.data.imgList;
    newList.push(newImg);
    this.setData({
      imgList: newList
    })
  },
  delImg() {
    var newList = this.data.imgList;
    newList.pop();
    this.setData({
      imgList: newList
    })
  },
  // 按钮相关 保存、预览chen
  saveInfor() {
    console.log(this.data.orgPwd)
    // Dialog.alert({
    //   message: '填写成功！'+this.data.orgPwd
    // })

   //上传图片至云存储

   let  promiseArr  =   []  //保存promise对象的数组 异步操作
        

 //风采展示2.0
  if(this.data.imgList){
    for (let i = 0; i < this.data.imgList.length; i++) {
      if(this.data.flag[i] != 1){                                        //若风采图片未修改，先把src清空
        var index = 'imgList[' + i + '].imgSrc' 
        this.setData({
          [index]: []          
        })
      }
      for (let j = 0; j < this.data.imgList[i].imgSrc.length; j++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.imgList[i].imgSrc[j]
        let suffix = /\.\w+$/.exec(item)[0] //正则表达式取出图片的扩展名suffix
        let index = "imgList[" + i + "].imgFileIds[" + j + "]";
        wx.cloud.uploadFile({
          cloudPath: Math.random() + suffix,
          filePath: item,
          // 文件路径
          success: res => {
            // get resource ID
            console.log(res.fileID)
            this.setData({
              [index]: res.fileID
            })
            reslove()
          },
          fail: err => {
            // handle error
            console.error(err)
            reject()
          }
        })
      }))
    }
    } //等到所有图片都上传完成（云存储）以后，再保存到云数据库
  }

   for (let i = 0; i < this.data.logoSrc.length; i++) {
     promiseArr.push(new Promise((reslove, reject) => {
       let item = this.data.logoSrc[i]
       let suffix = /\.\w+$/.exec(item)[0]  //正则表达式取出图片的扩展名suffix
       wx.cloud.uploadFile({
         cloudPath: Math.random() + suffix,
         filePath: item,
         // 文件路径
         success: res => {
           // get resource ID
           this.setData({
             logoFileIds: this.data.logoFileIds.concat(res.fileID)
           })
           reslove()
         },
         fail: err => {
           // handle error
           console.error(err)
           reject()
         }
       })
     }))
   } 
    Promise.all(promiseArr).then(res  =>  {
      console.log('所有图片上传完成')       //插入到云数据库
             db.collection('info_org').doc(this.data._id)
      .update({ 
        data:  {          
          depList: this.data.list, //部门列表
          orgName: this.data.orgName, //组织名称
          orgPassword:this.data.orgPassword,
          department: this.data.department, //隶属部门
          foundTime: this.data.foundTime, //建立时间
          adviser: this.data.adviser, //指导教师
          adviserIntro: this.data.adviserIntro, //教师介绍
          orgIntro: this.data.orgIntro, //组织介绍
          qqNumber: this.data.qqNumber, //qq招新群
          mailNumber: this.data.mailNumber, //邮箱
          // fileIds:  this.data.fileIds, //风采图片
          logoFileIds: this.data.logoFileIds, //logo
          classify: this.data.classify, //社团分类
          imgList: this.data.imgList //风采展示2.0
        }
      }).then(res  =>  {        
        console.log(res)         
        wx.hideLoading()
        Dialog.alert({
          message: '更新成功！'
        })
      }).catch(err  =>  {        
        console.error(err)         
        wx.hideLoading()      
      })
    }).catch(err  =>  {      
      console.error(err)    
    })
  },
  previewBtn() {
    var imgList = JSON.stringify(this.data.imgList);
    var logoList = JSON.stringify(this.data.logoSrc);
    var depList = JSON.stringify(this.data.list);
    wx.navigateTo({
      url: '../organizationPreview/organizationPreview?orgName=' + this.data.orgName + '&department=' + this.data.department +'&foundTime=' + this.data.foundTime + '&adviser=' + this.data.adviser + '&adviserIntro=' + this.data.adviserIntro + '&orgIntro=' + this.data.orgIntro + '&qqNumber=' + this.data.qqNumber + '&mailNumber=' + this.data.mailNumber + '&logoSrc=' + logoList + '&imgList=' + imgList + '&depList=' + depList,
    })
  },
  //添加图片
  addOrgLogo() {
    this.setData({
      logoFileIds: []
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths);
        this.setData({
          logoSrc: tempFilePaths
        })
      }
    })
  },
  
  //风采展示2.0
  addOrgImg(event) {
    var id = event.target.dataset.id //当前组件的id
    var index = "imgList[" + id + "].imgSrc";
    var flag = "flag[" + id + "]"
    this.setData({
      [flag]: 1
    })
    wx.chooseImage({
      count: 1,
      //允许上传图片的最大数量 （郝伟做简历图片，此处改成1）
      sizeType: ['original', 'compressed'],
      //当前图片类型原图或压缩图
      sourceType: ['album', 'camera'],
      //相册或相机
      success: res => { //使用箭头函数
        // tempFile0Path可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths //可以再次找到图片的图片的地址
        this.setData({
          [index]: tempFilePaths //这里进行赋值   
        })
      }
    })
  },
  //弹出层
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      classify: event.detail.value
    })
    Toast(`当前值：${value}, 当前索引：${index}`);
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

  }
})