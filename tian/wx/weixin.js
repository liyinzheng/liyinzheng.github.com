'use strict';
document.write('<script src="http://weixin.api.tiantian.com/weixin/getconfig?url=' + encodeURIComponent(location.href) + '" type="text/javascript"></script>');

var wxData = {
    imgUrl: 'http://img-big.tiantian.com/cuxiaoqu2011/201702lover-m/hongbao/images/hb-share.jpg',
	link: 'http://promotions.tiantian.com/cuxiao/201702lover-m/hongbao/wxhb.html',
    desc: '陈坤邀请你加入陈坤粉丝团情人节红包群，进入查看详情。',
    title: "陈坤邀请你加入群聊",
    share: function () {
        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: wxData.desc, // 分享标题
            link: wxData.link, // 分享链接
            imgUrl: wxData.imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                wxData.callback();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: wxData.title, // 分享标题
            desc: wxData.desc, // 分享描述
            link: wxData.link, // 分享链接
            imgUrl: wxData.imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                wxData.callback();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
            title: wxData.title, // 分享标题
            desc: wxData.desc, // 分享描述
            link: wxData.link, // 分享链接
            imgUrl: wxData.imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                wxData.callback();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo({
            title: wxData.title, // 分享标题
            desc: wxData.desc, // 分享描述
            link: wxData.link, // 分享链接
            imgUrl: wxData.imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                wxData.callback();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQZone({
            title: wxData.title, // 分享标题
            desc: wxData.desc, // 分享描述
            link: wxData.link, // 分享链接
            imgUrl: wxData.imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                wxData.callback();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    callback: function () {

    }
};
wx.ready(function () {
    wxData.share();
});
