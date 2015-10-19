/*
核心原理：
有三张幻灯片，分别的索引值为0/1/2,
当切换到最后一张轮播图，把索引为0的幻灯片克隆并且追加到索引为2的幻灯片后面
反方向亦是如此
*/
(function($){
    $.fn.extend({
        slider:function(options){
        	var defaults={
        		wrapWidth:$(this).width(),//包裹幻灯片的宽度
        		wrapHeight:$(this).height(),//包裹幻灯片的高度
        		wrap:".lunbo",//轮播(移动的)层
        		prevButton:".prev",//上一张按钮
        		nextButton:".next",//下一张按钮
        		sameButton:".same",//
        		tips:".tips",//焦点
        		active:"active",//当前幻灯片的类
        		isClick:true,//是否可点击,false则表示hover
        		effect:"slide",//是否以slide方式切换,"fade"表示淡入淡出
        		delay:600,
        		stopTime:2000,


        	}
        	var o=$.extend(defaults,options);
        	this.each(function(){
        		var self=this,
        		    wrap=$(o.wrap),
        		    prevButton=$(o.prevButton),
        		    nextButton=$(o.nextButton),
        		    sameButton=$(o.sameButton),
        		    tips=$(o.tips),
        		    active=o.active,
				    eachWidth=o.wrapWidth,
				    eachHeight=o.wrapHeight,
				    size=wrap.children().size(),
				    allWidth=eachWidth*size,
				    index=0,//幻灯片切换索引值
				    dotNum=0,//焦点切换索引值
				    second=800,//点击前或后按钮间隔时间
				    timer=null,//定时器清空
				    time=o.stopTime,//幻灯片切换间隔时间
				    isClick=o.isClick,//焦点是否可点击
				    effect=o.effect,//幻灯片效果
				    delay=o.delay,
				    date=new Date();
				    $(self).css({
				    	width:eachWidth,
				    	height:eachHeight
				    })
				    if(effect=="slide"){
				    	wrap.css("width",allWidth);
						wrap.children().css("width",eachWidth);
				    }else{
						wrap.css("width",eachWidth);
				    	wrap.children().css({
				    		width:eachWidth,
				    		position:"absolute",
				    		left:0,
				    		top:0,
				    		display:"none"
				    	});
				    	wrap.children().eq(0).css("display","block");
				    }
				function slideNext(){
					index++;
					dotNum++;
					if(index>size-1){
						wrap.append(wrap.children().eq(0).clone())
						wrap.css({
							width:wrap.children().size()*eachWidth,
						})
					}
					
					wrap.animate({
						left:-eachWidth*index
					},function(){
						if(index>size-1){
							index=0;
							wrap.css({
								left:0,
								width:allWidth
							})
							wrap.children().eq(wrap.children().size()-1).remove()
						}
					})
					if(dotNum>size-1){dotNum=0;}
					tips.children().removeClass(active).eq(dotNum).addClass(active);
				}
				function slidePrev(){
					index--;
					dotNum--;
					if(index<0){
						wrap.prepend(wrap.children().eq(size-1).clone());
						wrap.css({
							left:-eachWidth,
							width:wrap.children().size()*eachWidth
						});
						wrap.animate({
							left:0
						},function(){
							wrap.children().eq(0).remove();
							wrap.css({
								left:-eachWidth*(size-1),
								width:allWidth
							});
						})
						index=size-1;
					}else{
						wrap.animate({
							left:-eachWidth*index
						})
					}
					if(dotNum<0){dotNum=size-1;}
					tips.children().removeClass(active).eq(dotNum).addClass(active);
				}
				function fadeNext(){
					index++;
					if(index>size-1){
						index=0;
					}
					wrap.children().fadeOut(delay).eq(index).fadeIn();
					tips.children().removeClass(active).eq(index).addClass(active);
				}
				function fadePrev(){
					index--;
					if(index<0){
						index=size-1;
					}
					wrap.children().fadeOut(delay).eq(index).fadeIn();
					tips.children().removeClass(active).eq(index).addClass(active);
				}
				
				if(effect=="slide"){
					timer=setInterval(slideNext,time);
					nextButton.click(function(){
						if(new Date()-date<=second){
							return;
						}
						date=new Date();
						slideNext();
					})
					prevButton.click(function(){
						if(new Date()-date<=second){
							return;
						}
						date=new Date();
						slidePrev();
					})
					sameButton.hover(function(){
						clearInterval(timer);
					},function(){
						timer=setInterval(slideNext,time);
					})
	                if(isClick){
	                	tips.children().hover(function(){
							clearInterval(timer);
						},function(){
							timer=setInterval(slideNext,time);
						})
						tips.children().mousedown(function(){
							if(index==$(this).index()){return;}
							wrap.animate({
								left:-eachWidth*$(this).index()
							})
							tips.children().removeClass(active).eq($(this).index()).addClass(active);
							dotNum=index=$(this).index();
						})
	                }else{
	                	tips.children().hover(function(){
							clearInterval(timer);
							if(index==$(this).index()){return;}
							wrap.animate({
								left:-eachWidth*$(this).index()
							})
							tips.children().removeClass(active).eq($(this).index()).addClass(active);
						},function(){
							dotNum=index=$(this).index();
							timer=setInterval(slideNext,time);
						})

	                }
				}else{
					timer=setInterval(fadeNext,time);
					nextButton.click(function(){
						if(new Date()-date<=second){
							return;
						}
						date=new Date();
						fadeNext();
					})
					prevButton.click(function(){
						if(new Date()-date<=second){
							return;
						}
						date=new Date();
						fadePrev();
					})
					sameButton.hover(function(){
						clearInterval(timer);
					},function(){
						timer=setInterval(fadeNext,time);
					})
					if(isClick){
	                	tips.children().hover(function(){
							clearInterval(timer);
						},function(){
							timer=setInterval(fadeNext,time);
						})
						tips.children().mousedown(function(){
							if(index==$(this).index()){return;}
							wrap.children().fadeOut(delay).eq($(this).index()).fadeIn();
							tips.children().removeClass(active).eq($(this).index()).addClass(active);
							index=$(this).index();
						})
	                }else{
	                	tips.children().hover(function(){
	                		clearInterval(timer);
	                		if(index==$(this).index()){return;}
							wrap.children().fadeOut(delay).eq($(this).index()).fadeIn();
							tips.children().removeClass(active).eq($(this).index()).addClass(active);
						},function(){
							if(index==$(this).index()){return;}
							index=$(this).index();
							timer=setInterval(fadeNext,time);
						})
	                }

				}
				

                
				
				



			})
        }
    })
})(jQuery)