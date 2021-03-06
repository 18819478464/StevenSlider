(function($){
    $.fn.extend({
        slider:function(options){
        	var defaults={
        		wrapWidth:$(this).width(),
        		wrapHeight:$(this).height(),
        		wrap:".lunbo",
        		prevButton:".prev",
        		nextButton:".next",
        		sameButton:".same",
        		tips:".tips",
        		active:"active",
        		isClick:true,
        		effect:"slide",
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
				    index=0,
				    dotNum=0,
				    second=800,
				    timer=null,
				    time=o.stopTime,
				    isClick=o.isClick,
				    effect=o.effect,
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