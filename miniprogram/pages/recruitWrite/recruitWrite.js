// pages/recruitWrite/recruitWrite.js
const db = wx.cloud.database()//启动云数据库

Page({
  /**
   * 页面的初始数据
   */
  data: {
    timePlaceList:[{
      place:'',
      time:'',
    }],//用于增减招新时间地点input的数组
    orgId:'',
    orgName:'',
    title:'',
    place:'',
    time:'',
    addition:'',
    lists:[{department:''}],//用于增减input的数组
    images: [], //用户选择上传的图片的地址
    fileIds: [], //云存储的图片信息
    video:[],
    videoId:[],
    hot:0,
    flag:true
  },
  onOrgNameChange(event) {
    // console.log(this.data.video)说明this.data.video里面有值
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({
      orgName: event.detail
    })
  },
  onTitleChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({
      title: event.detail
    })
  },
  onPlaceChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({
      place: event.detail
    })
  },
  onTimeChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({
      time: event.detail
    })
  },
  onTimePlaceChange(event){
    var id = event.target.dataset.id;
    var name = event.target.dataset.name;
    var index = "timePlaceList[" + id + "]." + name;
    this.setData({
      [index]: event.detail //这里进行赋值   
    }) 
  },
  onDepartmentChange(event) {
    // event.detail 为当前输入的值
    var id = event.target.dataset.id//当前组件的id
    //  console.log(id)
    //  console.log(event.detail)
    //  console.log(this.data.lists)
     //lists就是你js中data中的定义的一个数组变量，[]里面的值代表数组的下标，department是你申明的这个数组中对象的key，拼接在一起，结果就是当前下标的值
    var index = "lists[" + id + "].department"
    this.setData({ 
        [index]:event.detail        //这里进行赋值
      })
  },
  onAdditionChange(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({
      addition: event.detail
    })
  },


  // 增减input的数组
  addList: function(){
    var  lists = this.data.lists;
    var newData = {department:''};
    lists.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      lists: lists,
    })  
  },
  delList: function () {
    var lists = this.data.lists;
    lists.pop();      //实质是删除lists数组内容，使for循环少一次
    this.setData({
      lists: lists,
    })
  },   


  // 增减招新时间地点input的数组
  addTPList: function(){
    var newTP = {
      place:'',
      time:'',
    }
    var  lists = this.data.timePlaceList;
    lists.push(newTP);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      timePlaceList: lists,
    })  
  },
  delTPList: function () {
    var lists = this.data.timePlaceList;
    lists.pop();      //实质是删除lists数组内容，使for循环少一次
    this.setData({
      timePlaceList: lists,
    })
  },   

    //上传图片
  chooseImg() {
    wx.chooseImage({
      count: 1, //允许上传图片的最大数量 （郝伟做简历图片，此处改成1）
      sizeType: ['original', 'compressed'], //当前图片类型原图或压缩图
      sourceType: ['album', 'camera'], //相册或相机
      success: res => { //使用箭头函数
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths //可以再次找到图片的图片的地址
        console.log(tempFilePaths)
        this.setData({
          images: tempFilePaths
        })
      }
    })
  },
  //上传图片至云存储
  submit() {
    if(this.data.title.length!=0&&this.data.timePlaceList[0].place.length!=0&&this.data.timePlaceList[0].time.length!=0&&this.data.lists[0].department.length!=0){
      wx.showLoading({
        title: '发布中...',
      })
      let promiseArr = [] //保存promise对象的数组 异步操作
      var that = this
      for (let i = 0; i < (this.data.images.length+this.data.video.length); i++) {
  
        promiseArr.push(new Promise((reslove, reject) => {
          if(that.data.video.length==1&&i==that.data.images.length){
            console.log("进来了")
            wx.cloud.uploadFile({
              cloudPath: Math.random() + '.mp4',
              filePath: that.data.video[0], // 视频文件本地路径
              success: res => {
                // get resource ID
                console.log(res.fileID)
                this.setData({
                  videoId: that.data.videoId.concat(res.fileID)
                })
                reslove()
              },
              fail: err => {
                // handle error
                console.error(err)
                reject()
              }
            })
          }
          else{
            let item = this.data.images[i]
            // console.log(i)
            let suffix = /\.\w+$/.exec(item)[0] //正则表达式取出图片的扩展名suffix
            wx.cloud.uploadFile({
              cloudPath: Math.random() + suffix,
              filePath: item, // 文件路径
              success: res => {
                // get resource ID
                console.log(res.fileID)
                this.setData({
                  fileIds: this.data.fileIds.concat(res.fileID)
                })
                reslove()
              },
              fail: err => {
                // handle error
                console.error(err)
                reject()
              }
            })
  
          }
        }))
      }
  
  
  
      
  
  
      //等到所有图片视频都上传完成（云存储）以后，再保存到云数据库
      Promise.all(promiseArr).then(res => {
        console.log('所有图片上传完成')
        //插入到云数据库
        db.collection('recruit').add({//recruit译为招新，是我数据库表的名字
          data: {
            orgName: this.data.orgName,
            title: this.data. title,
            // place: this.data.place,
            // time: this.data.time,
            lists: this.data.lists,
            timePlaceList:this.data.timePlaceList,
            addition: this.data.addition,
            fileIds: this.data.fileIds,//已上传至云存储的图片id列表
            videoId:this.data.videoId,
            hot:this.data.hot,
            createTime:db.serverDate() //添加该字段           
          }
        }).then(res => {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          
         
        }).catch(err => {
          console.error(err)
          wx.hideLoading()
        })
        wx.switchTab({
          url: '../homePage/homePage',        
          })
  
      }).catch(err => {
        console.error(err)
      })
     
    }
    if(this.data.title.length==0){
      wx.showToast({
        title: '请填写招新标题',
        icon:'none',
        duration:2000,
      })
    }
    if(this.data.timePlaceList[0].place.length==0){
      wx.showToast({
        title: '请填写招新地点',
        icon:'none',
        duration:2000,
      })
    }
    if(this.data.timePlaceList[0].time.length==0){
      wx.showToast({
        title: '请填写招新时间',
        icon:'none',
        duration:2000,
      })
    }
    if(this.data.lists[0].department.length==0){
      wx.showToast({
        title: '请填写招新部门及人数',
        icon:'none',
        duration:2000,
      })
    }
    
  },

// 预览
gotoPreview(){
  console.log(this.data.lists)
  var lists = JSON.stringify(this.data.lists)
  var timePlaceList = JSON.stringify(this.data.timePlaceList)
  wx.navigateTo({
    url: '../preview/preview?orgName='+ this.data.orgName+'&title='+this.data.title+'&timePlaceList='+timePlaceList+'&lists='+lists+'&addition='+this.data.addition+'&image='+this.data.images[0]+'&video='+this.data.video[0]
  })
},



//选择视频
chooseVideo(){
  console.log("进入选择视频");
  wx.chooseVideo({
    sizeType:['compressed'],
    sourceType: ['album','camera'],
    maxDuration: 180,//最长时长
    camera:"back",
  
    // success: function(res){
    //   const tempFilePath = res.tempFilePath //可以再次找到视频的视频的地址
    //     console.log(tempFilePath)
    //     that.setData({
    //       videofile:tempFilePath
    //     })
    //     // var index = "video[0]"
    //     // that.setData({
    //     //   [index]: tempFilePath
    //     // })
    // },
    success: res=>{
      console.log("成功进入视频选择")
      const tempFilePath = res.tempFilePath //可以再次找到视频的视频的地址
        console.log(tempFilePath)
        var index = "video[0]"
        this.setData({
          [index]: tempFilePath
        })
    },
    fail:function(){
        console.log("视频选择失败")
    }
  })
},

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orgId:options.orgId
    })
    var that =this
    db.collection('info_org').where({
      _id: that.data.orgId
    }).get({
      success: function (res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        that.setData({
          orgName: res.data[0].orgName
        })
        
      }
    })
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