import { request } from '../../request/index'
import apis from '../../request/apis'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
            id: 0,
            value: '综合',
            isActive: true
        }, {
            id: 1,
            value: '销量',
            isActive: false
        }, {
            id: 2,
            value: '价格',
            isActive: false
        }, ],
        goodList: []
    },
    params: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },
    pageTotal: 1,
    isLoading: false,
    handleTabsItemChange(e) {
        const { index } = e.detail
        const { tabs } = this.data
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        this.setData({
            tabs
        })
    },
    getGoodList() {
     
        request({ url: apis.getGoodList, data: this.params }).then(res => {
            this.pageTotal = Math.ceil(res.data.message.total / this.params.pagesize)
            this.setData({
                goodList: [...this.data.goodList, ...res.data.message.goods]
            })
            this.isLoading = false
            wx.stopPullDownRefresh()
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.params.cid = options.cid
        this.getGoodList()
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
        this.setData({
            goodList: []
        })
        this.params.pagenum = 1
        this.getGoodList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (this.params.pagenum > this.pageTotal) {
            wx.showToast({
                title: '没有下一页',
                duration: 1500,
                mask: false,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
        } else {
            if (this.isLoading) return
            this.params.pagenum += 1
            this.getGoodList()
            wx.showToast({
                title: '开始加载下一页',
                duration: 1500,
                mask: false,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
            this.isLoading = true
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})