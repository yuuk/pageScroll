/**
 * pageScroll 1.0 by Yukai
 * @description 适用于顶部悬浮导航或侧边悬浮导航，如果对代码有建议或疑问请联系email
 * @email 645481746@qq.com
 * @param  {[object]} options [配置项]
 */
;(function($,window,document,undefined){

    function pageScroll(options){
        this.defaults = {
            navObj : ".top-nav",         //导航父元素
            clickItem : ".js_clickItem", //导航元素
            targetItem : ".js_section",  //区块目标元素
            position : "left",           //导航悬浮位置 left 或 top
            currentClass : "on",         //高亮样式
            deviation : 0,               //偏移值 （主要用来精确调整定位位置）
            speed : 500,                 //滚动速度
            effect : "swing",            //滚动效果（需要搭配jquery.easing.js） 
            isSaveHash : false,          //是否保存到hash （开启后点击a标签会给url加上hash，便于url定位板块） 
            start : $.noop,              //滚动开始的回调
            end : $.noop                 //滚动完成的回调
        }
        this.options = $.extend({}, this.defaults, options);
    }    

    pageScroll.prototype.click = function(){
        var _this = this;		
			
        $(_this.options.clickItem).each(function(i,v){			
			//判断导航是否有对应板块
            var targetOffsetTop = $(_this.options.targetItem).eq(i).length ? $(_this.options.targetItem).eq(i).offset().top : false,
				//如果不这么处理，animate回调(end)会执行2次
				ele = navigator.userAgent.toLowerCase().indexOf("msie") > -1 ? "html" : "body",
				//导航在顶部时会用到导航的高度
				navHeight = _this.options.position == "top" ?  $(_this.options.navObj).outerHeight(true) : 0;
				
            $(v).on("click",function(e){
                e.preventDefault();				
				//判断元素的定位方式
				//var isFixed = ($(_this.options.navObj).css("position")) == "fixed" ? true : false;
				//滚动前的回调
                if(typeof (_this.options.start) == 'function'){
                    _this.options.start();
                }				
		
                if(targetOffsetTop){
                    $(ele).stop(true).animate(
                        {
                            scrollTop : targetOffsetTop + _this.options.deviation - navHeight
                        },
                        _this.options.speed,
                        _this.options.effect,
                        _this.options.end
                    );
                }
				//没有找到对应的板块时
                else{
                    throw new Error("section "+ parseInt(i+1) +" setting error!")
                }

                if(_this.options.isSaveHash){
                    if($(v).is("a") && v.hash){
                        window.location.hash = v.hash;
                    }
					//元素没有hash属性时
                    else{
                        throw new Error("element does not have Hash attribute");
                    }
                }
            });                    
        });
    }

    pageScroll.prototype.scroll = function(){
        var _this = this,
			_navObj = $(_this.options.navObj)
			navObjOffsetTop = _navObj.offset().top;
        $(window).on("scroll",function(){
            var wst = $(this).scrollTop();				
            //如果顶部导航则固定顶部
            if(_this.options.position == "top"){
                if(wst > navObjOffsetTop){                
                    _navObj.css({
                        position : "fixed",
                        padding : 0,
                        marginLeft : - (_navObj.width() / 2),
                        top : 0,
                        left : "50%"
                    });
                }
                else{
                    _navObj.css({
                        position : "",
                        padding : "",
                        margin : "",
                        top : "",
                        left : ""
                    });
                }
            }

            $(_this.options.targetItem).each(function(i,v){               
                var targetOffsetTop = $(v).offset().top  + _this.options.deviation;
                if(wst>=targetOffsetTop){
                    $(_this.options.clickItem).removeClass(_this.options.currentClass).eq(i).addClass(_this.options.currentClass)
                }
            });
        });
    }
	
	pageScroll.prototype.ini = function(){
        var _this = this;
		_this.click();
        _this.scroll();
	}
	
    $.pageScroll = $.PAGESCROLL = function(options) {
        var myPageScroll = new pageScroll(options).ini();
        return myPageScroll;
    }

})(jQuery,window,document);
