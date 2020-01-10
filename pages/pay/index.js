// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
    handlePay() {
        const token = wx.getStorageSync('token')
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',
            });
            return
        }
        console.log('已存在token')
    },
    setCart(cart) {
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price
            totalNum += v.num
        });
        this.setData({
            cart,
            totalPrice,
            totalNum
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let address = wx.getStorageSync('address') || {};
        let cart = wx.getStorageSync('cart') || [];
        let checkCart = cart.filter(v => v.checked)
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
        this.setCart(checkCart)
        this.setData({
            address
        })
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