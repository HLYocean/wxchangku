// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        list: null
    },

    todetail(e){
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
        var that = this
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromA', function (data) {
            // console.log(data.data) //这是从A页面向B页面传输的数据
            that.setData({
                id: data.data.postid
            })

            wx.request({
                url: `https://app.vmovier.com/apiv3/post/view?postid=${data.data.postid}`,
                success: (res) => {
                    // console.log(res.data.data)
                    that.setData({
                        list: res.data.data
                    })
                }
            })

        })
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
