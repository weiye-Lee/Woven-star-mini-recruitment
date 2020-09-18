const db = wx.cloud.database();
import Toast from '@vant/weapp/toast/toast';
var app = getApp();
Page({
  data: {
    show: false,
    search: '',
    ne: [],
    searchName:[],
    theName:"",
    showIndex: 0,
    name1: [],
    name2: [],
    name3: [],
    name4: [],
  },


  /*搜索框输入*/
  getData: function (e) {
    this.data.search = e.detail.value,
      console.log(e),
      console.log(this.data.search)
    //监听输入框内容
  },
  /*搜索框查询*/
  SearchContext: function (e) {
    var key = e.detail;   //获取输入框输入内容
    this.setData({
      show: !this.data.show

    })
    db.collection('info_org').where({//查询        
      orgName: {
        $regex: '.*' + key,
        $options: 'i'
      }
    }).get({
      success: res => {
        console.log(res.data.length)
        this.setData({
          ne: res.data,
        })
        var clear = [];
        this.setData({  //重新获取前 清空原数组
          searchName: clear
        })
        for (var i = 0; i < res.data.length; i++) {
          console.log("a")
          var index = "searchName[" + i + "]"

          this.setData({
            [index]: res.data[i].orgName
          })
        }
      }
    })

    
  },
  
  /*折叠面板*/
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },

  /*点击进入组织介绍页面*/
  click_to_OrganIntro(e) {
    console.log(e.currentTarget.dataset)
    var orgName = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../organizationShow/organizationShow?orgName=' + orgName,
    })
  },
  // 弹出层 确认
  onChange(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      theName: event.detail.value
    })
    wx.navigateTo({
      url: '../organizationShow/organizationShow?orgName=' + this.data.theName,
    })
  },
  // 弹出层 取消
  onCancel() {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

     this.app = getApp();

    /*数据库里的组织显示在展开面板下*/
    //开始找数据
    db.collection('info_org').where({
      classify: "学生生活"
    }).get().then((res) => {
      console.log(res.data);
      this.setData({
        name1: res.data     
      })
    })
    db.collection('info_org').where({
      classify: "学术科技"
    }).get().then((res) => {

      this.setData({
        name2: res.data
      })
    })
    db.collection('info_org').where({
      classify: "志愿服务"
    }).get().then((res) => {

      this.setData({
        name3: res.data
      })
    })
    db.collection('info_org').where({
      classify: "艺术审美"
    }).get().then((res) => {

      this.setData({
        name4: res.data
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 100 
    });
    animation1.opacity(0).translate(100, 0).step()
    animation1.opacity(1).translate(0, 0).step()
    this.setData({
      ani1: animation1.export()
    })
    var animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 400
    });
    animation2.opacity(0).translate(100, 0).step()
    animation2.opacity(1).translate(0, 0).step()
    this.setData({
      ani2: animation2.export()
    })
    var animation3 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 700
    });
    animation3.opacity(0).translate(100, 0).step()
    animation3.opacity(1).translate(0, 0).step()
    this.setData({
      ani3: animation3.export()
    })
    var animation4 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay:1000
    });
    animation4.opacity(0).translate(100, 0).step()
    animation4.opacity(1).translate(0, 0).step()
    this.setData({
      ani4: animation4.export()
    })
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
