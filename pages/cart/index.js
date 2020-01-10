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
        const { address, totalNum } = this.data

        if (!address.userName) {
            wx.showToast({
                title: '请选择收货地址 !',
                icon: 'none',
                duration: 1500,
                mask: false,
            });
            return
        }
        if (totalNum === 0) {
            wx.showToast({
                title: '请选择商品',
                icon: 'none',
                duration: 1500,
                mask: false,
            });
            return
        }
        wx.navigateTo({
            url: '/pages/pay/index'
        });

        console.log(1)
    },
    handleChangeNum(e) {
        const { id, operation } = e.currentTarget.dataset
        let { cart } = this.data
        const index = cart.findIndex(v => v.goods_id === id)
        if (cart[index].num === 1 && operation === -1) {
            wx.showModal({
                title: '提示',
                content: '是否删除商品',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        cart.splice(index, 1)
                        this.setCart(cart)
                    } else if (result.cancel) {
                        console.log('取消')
                    }
                },
            });

        } else {
            cart[index].num += operation
            this.setCart(cart)
        }
    },
    handleCheckedAll() {
        let { cart, allChecked } = this.data
        allChecked = !allChecked
        cart.forEach(v => v.checked = allChecked)
        this.setCart(cart)
        this.setData({
            allChecked
        })
    },
    setCart(cart) {
        let allChecked = true
        let totalPrice = 0
        let totalNum = 0
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price
                totalNum += v.num
            } else {
                allChecked = false
            }
        });
        allChecked = cart.length !== 0 ? allChecked : false
        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum
        })
        wx.setStorageSync('cart', cart);
    },
    handleItemChange(e) {
        const id = e.currentTarget.dataset.id
        let { cart } = this.data
        let index = cart.findIndex(v => v.goods_id == id)
        cart[index].checked = !cart[index].checked
        this.setCart(cart)
    },
    handleAddress() {
        wx.getSetting({
            success: (result) => {
                const scopeAddress = result.authSetting["scope.address"]
                    //未定义或者已经允许可以继续访问选择
                if (scopeAddress || scopeAddress === undefined) {
                    wx.chooseAddress({
                        success: (result1) => {
                            wx.setStorageSync('address', result1);
                        },
                        fail: (err) => {
                            console.log(err)
                            wx.showToast({
                                title: '你没有授权',
                                duration: 1500,
                                mask: false,
                            });
                        },
                    });
                } else {
                    // 诱导设置
                    wx.openSetting({
                        success: (result2) => {
                            wx.chooseAddress({
                                success: (result3) => {
                                    wx.setStorageSync('address', result3);
                                }
                            });
                        },
                    });

                }
            },
        });

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        const address = wx.getStorageSync('address') || {};
        const cart = wx.getStorageSync('cart') || [];
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
        this.setCart(cart)
        this.setData({
            address,
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