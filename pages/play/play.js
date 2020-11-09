// pages/play/play.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: null
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
    onLoad: function () {

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
        var that = this;
        // https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostInCate?p=1&size=10&cateid=7

        

        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromA', function (data) {
            if (data.data.cateid) {
                wx.request({
                    url: `https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostInCate?p=1&size=10&cateid=${data.data.cateid}`,
                    success(res) {
                        that.setData({
                            list: res.data.data
                        })
                    }
                })
            } else {
                wx.request({
                    url: `https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostByTab?p=1&size=10&tab=${that.options.name.toLowerCase()}`,
                    success(res) {
                        that.setData({
                            list: res.data.data
                        })
                    }
                })
            }
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