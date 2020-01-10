// pages/goos_detail/index.js
import { request } from '../../request/index'
import apis from '../../request/apis'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const { goods_id } = options
        this.getGoodsDetail(goods_id)
    },
    goods_info: {},
    //添加购物车
    handleCartAdd() {
        let cart = wx.getStorageSync('cart') || []
        let index = cart.findIndex(v => v.goods_id === this.goods_info.goods_id)
        if (index === -1) {
            this.goods_info.num = 1
            this.goods_info.checked = true
            cart.push(this.goods_info)
        } else {
            cart[index].num++
        }
        wx.setStorageSync('cart', cart);
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true,
        });

    },
    // 预览图片
    handlePreviewImage(e) {
        let current = e.currentTarget.dataset.current
        let urls = this.data.goodsDetail.pics.map(v => v.pics_mid)
        wx.previewImage({
            current: current,
            urls,
        });

    },
    getGoodsDetail(goods_id) {
        request({
            url: apis.getGoodsDetail,
            data: { goods_id }
        }).then(res => {
            let {
                pics,
                goods_id,
                goods_price,
                goods_name,
                goods_introduce
            } = res.data.message
            this.goods_info = {
                ...res.data.message
            }
            this.setData({
                goodsDetail: {
                    pics,
                    goods_id,
                    goods_price,
                    goods_name,
                    goods_introduce: goods_introduce.replace(/\.webp/g, ".jpg")
                }
            })
        })
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