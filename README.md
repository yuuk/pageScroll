# pageScroll
页面定位滚动
# 使用方法和参数说明
$.pageScroll({
    navObj : ".side-nav",         //导航元素
    clickItem : ".js_clickItem", //导航点击元素
    targetItem : ".js_section",  //区块目标元素
    currentClass : "on",         //高亮样式
    speed : 500,                 //滚动速度
    effect : "swing",            //滚动效果（需要搭配jquery.easing.js） 
    position : "left",           //导航位置
    deviation : 0,               //滚动偏移
    isSaveHash : true,           //点击滚动时是否保存hash到url
    start : function(){          //开始滚动的回调
    console.log("要开始滚动了");
    },
    end : function(){           //结束滚动的回调
    console.log("滚动结束了");
    }
});
