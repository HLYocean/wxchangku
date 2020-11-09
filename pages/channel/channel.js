// pages/channel/channel.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        list: null
    },
    toList: (e) => {
        var that=this
        // https://app.vmovier.com/apiv3/post/getPostByTab?p=1&size=10&tab=hot
        e.currentTarget.dataset['alias'];
        wx.navigateTo({
            url: `/pages/play/play?name=${e.currentTarget.dataset['alias']}}`,
            success: function(res) {

                //通过eventChannel向B页面发送数据。
                // console.log(e.currentTarget.dataset['in'])
                res.eventChannel.emit('acceptDataFromA', {data: e.currentTarget.dataset['in']})
                }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            // http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList
            url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList', //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    list: res.data.data
                })
            
                // console.log(res.data.data)
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