// pages/home/home.js
const app = getApp();
const db = wx.cloud.database();
const more = db.collection('more');
more.where({
  _openid: 'o1-ah4mlv09t1F_VcTxvuBqN6T78' // 填入当前用户 openid
}).watch({
  onChange: (snapshot) => {
    // console.log('snapshot', snapshot.docs)
    app.globalData.moreinfo = snapshot.docs
    let m = [];
    if (snapshot.docs.length) {
      for (let i = 0; i < snapshot.docs.length; i++) {
        // console.log(Object.keys(snapshot.docs[i])[0])
        let key = Object.keys(snapshot.docs[i])[0]
        m.push(snapshot.docs[i][key])
        // console.log(key,snapshot.docs[i][key])
      }
      app.globalData.moreinfo = m
    }
  },
  onError: function (err) {
    console.error('the watch closed because of error', err)
  }
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: null,
    list: {},
    morelist: null
  },

  toDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail',
      success: function (res) {

        //通过eventChannel向B页面发送数据。
        res.eventChannel.emit('acceptDataFromA', {
          data: e.currentTarget.dataset['item']
        })
      }
    })
  },
  bindKeyInput() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //轮播图
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
      success(res) {
        that.setData({
          banner: res.data.data.banner.list
        })
      }
    })
    //热门
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
      success(res) {
        that.setData({
          list: {
            ...that.data.list,
            hot: res.data.data.hot
          }
        })
      },
    })
    //专题
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
      success(res) {
        that.setData({
          list: {
            ...that.data.list,
            album: res.data.data.album
          }
        })
      },
    })
    //today
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
      success(res) {
        that.setData({
          list: {
            ...that.data.list,
            today: res.data.data.today
          }
        });

        //posts
        wx.request({
          url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/getIndexPosts/lastid/60469',
          success(res) {
            that.setData({
              list: {
                ...that.data.list,
                posts: res.data.data
              }
            })
          },
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
    setTimeout(() => {
      if (app.globalData.moreinfo !== null) {
        this.setData({
          morelist: app.globalData.moreinfo
        })
      }
      if (Object.keys(this.data.list).length > 3) {
        let num;
        for (var key in this.data.list) {
          num = key
        }
        let name = this.data.list[num].lastid;
        wx.request({
          url: `https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/getIndexPosts/lastid/${this.data.list[num].lastid}`,
          success: (res) => {
            this.setData({
              list: {
                ...this.data.list,
                [`${name}`]: res.data.data
              }
            })
            more.where({
              _openid: 'o1-ah4mlv09t1F_VcTxvuBqN6T78' // 填入当前用户 openid
            }).get({
              success: (res) => {


                if (res.data.length) {
                  if (res.data.length < 20) {
                    let num = Object.keys(res.data[res.data.length - 1])[0]
                    // console.log(res.data[res.data.length-1][num].lastid)
                    num = res.data[res.data.length - 1][num].lastid
                    wx.request({
                      url: `https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/getIndexPosts/lastid/${num}`,
                      success: res => {
                        // console.log(res.data)
                        more.add({
                          data: {
                            [`${num}`]: res.data.data
                          }
                        })
                      }
                    })
                  }
                } else {
                  wx.request({
                    url: `https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/getIndexPosts/lastid/${name}`,
                    success: res => {
                      // console.log(res.data)
                      more.add({
                        data: {
                          [`${name}`]: res.data.data
                        }
                      })
                    }
                  })
                }
              }
            })
          }
        })
      }
    }, 2000)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})