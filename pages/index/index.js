import { request } from '../../request/index'
import apis from '../../request/apis'
Page({
    data: {
        swiperList: [],
        cateList: [],
        floorList: []
    },
    //options(Object)
    onLoad: function(options) {
        // swiperList
        request({
            url: apis.getSwiperList
        }).then(res => {
            this.setData({
                swiperList: res.data.message
            })
        });
        // cateList
        request({
            url: apis.getCatitemsList
        }).then(res => {
            this.setData({
                cateList: res.data.message
            })
        });
        //floorList
        request({
            url: apis.getFloorDataList
        }).then(res => {
            this.setData({
                floorList: res.data.message
            })
        });
    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});