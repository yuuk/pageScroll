/**
 * pageScroll 1.0 by yukai
 * @param  {[object]} options [配置项]
 */
;(function($,window,document,undefined){

    function pageScroll(options){
        this.defaults = {
            clickItem : ".js_clickItem", //导航元素
            targetItem : ".js_section",  //区块目标元素
            currentClass : "on",         //高亮样式
            deviation : 0,               //偏移值
            speed : 500,                 //滚动速度
            effect : "swing",            //滚动效果（需要搭配jquery.easing.js）    
            end : $.noop                 //滚动完成的回调
        }
        this.options = $.extend({}, this.defaults, options);
    }

    pageScroll.prototype.ini = function(){
        this.click();
        this.scroll();
    }

    pageScroll.prototype.click = function(){
        var _this = this;

        $(_this.options.clickItem).each(function(i,v){
            var targetOffsetTop = $(_this.options.targetItem).eq(i).length ? $(_this.options.targetItem).eq(i).offset().top : false,
				ele = navigator.userAgent.toLowerCase().indexOf("msie") > -1 ? "html" : "body";
                $(v).on("click",function(e){
                    e.preventDefault();
                    if(targetOffsetTop){  
                        $(ele).stop(true).animate(
                            {
                                scrollTop : targetOffsetTop + _this.options.deviation
                            },
                            _this.options.speed,
                            _this.options.effect,
                            _this.options.end
                        );
                    }
                    else{
                        throw new Error("section "+ parseInt(i+1) +" setting error!")
                    }
                });
            
            
        });

    }

    pageScroll.prototype.scroll = function(){
        var _this = this;
        $(window).on("scroll",function(){
            var wst = $(this).scrollTop();
           $(_this.options.targetItem).each(function(i,v){ 
                var targetOffsetTop = $(v).offset().top  + _this.options.deviation;
                if(wst>=targetOffsetTop){
                    $(_this.options.clickItem).removeClass(_this.options.currentClass).eq(i).addClass(_this.options.currentClass)
                }
           });
        });
    }

    $.pageScroll = function(options) {
        var myPageScroll = new pageScroll(options).ini();
        return myPageScroll;
    }

})(jQuery,window,document);
