// pages/auth/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    //获取用户信息
    handleGetInfo(e) {
        const { encryptedData, rawData, signature, iv } = e.detail
        wx.login({
            timeout: 10000,
            success: (result) => {
                const { code } = result
            },
        });
        wx.showToast({
            title: '支付成功',
            icon: 'none',
            duration: 1500,
            success: (result) => {
                let newCart = wx.getStorageSync('cart');
                newCart = newCart.filter(v => !v.checked)
                wx.setStorageSync('cart', newCart);
                wx.navigateTo({
                    url: '/pages/order/index'
                });
            },
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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