// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:null
  },

  bindKeyInput(e) {
    console.log(e.detail.value)
    wx.request({
      url: `https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=${e.detail.value}`,
      success:res=>{
          console.log(res.data.data)
          this.setData({
            list:res.data.data.result.list
          })
      }
    })
  },

  toDetail(e){
    wx.navigateTo({
      url: '/pages/detail/detail',
      success: function(res) {
        //通过eventChannel向B页面发送数据。
        res.eventChannel.emit('acceptDataFromA', {data: e.currentTarget.dataset['item']})
        }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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