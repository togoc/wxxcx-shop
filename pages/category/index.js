// pages/category/index.js
import { request } from '../../request/index'
import apis from '../../request/apis'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [],
        rightContent: [],
        currentIndex: 0,
        scrollTop: 0
    },
    handleItemTap(e) {
        const { index } = e.currentTarget.dataset
        let rightContent = this.cates[index].children
        this.setData({
            rightContent,
            scrollTop: 0,
            currentIndex: index
        })
    },
    getCates() {
        request({ url: apis.getCategoriesList }).then(res => {
            this.cates = res.data.message
            wx.setStorageSync('cates', { time: Date.now(), data: this.cates });
            let leftMenuList = this.cates.map(item => item.cat_name)
            let rightContent = this.cates[0].children
            this.setData({
                leftMenuList,
                rightContent
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const cates = wx.getStorageSync('cates');
        if (!cates) {
            this.getCates()
        } else {
            if ((Date.now() - cates.time) > 30 * 60 * 1000) {
                this.getCates()
            } else {
                this.cates = cates.data
                let leftMenuList = this.cates.map(item => item.cat_name)
                let rightContent = this.cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }


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