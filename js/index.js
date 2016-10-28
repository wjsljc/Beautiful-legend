$(function(){
	//如果有cookie，接受cookie值,并且改变相应样式
	$.cookie.json = true;
	console.log($.cookie("user"));
	if($.cookie("user") !== undefined){
		//隐藏登录选项
		$(".load").hide();
		//显示用户信息
		$(".userBox").show().css("display","inline-block");
		$("#userName").text($.cookie("user").id);
	}
	
	//退出清除cookie
	$("#exit").on("click",function(){
		//删除cookie
		$.cookie("user","",{expires:-1,path:"/"});
		//显示样式
		$(".load").show();
		$(".userBox").hide();
	});
	
	
	//返回顶部按钮功能实现
	$(window).scroll(function(){
		if ($(window).scrollTop()>100){  
       	 	$("#slider-backTop").fadeIn(500);  
	   	}else{  
	        $("#slider-backTop").fadeOut(500);  
	    }  
	});
	$("#slider-backTop").click(function(){
		 $('body,html').animate({
          scrollTop: 0
        },
        300);
        return false;
	});
	
	//搜索样式
	$(".search-tab a").on("click",function(){
		//消除按钮样式
		$(this).addClass("cur");
		$(this).siblings().removeClass("cur");
	});
	//消除input内容
	$(".curNext").on("click",function(){
		$(".search-input").attr("placeholder","");
	});
	$(".curFirst").on("click",function(){
		$(".search-input").attr("placeholder","813教你美 新品秋装抢先看");
	});
		
	
	//nav-slider的 hover效果
	var oTime = null;
	$(".list-content").each(function(index,element){
		$(this).hover(function(){
			clearTimeout(oTime);
			$(this).next(".list-hidden").show().parent(".nav-list").addClass("active").find(".list-content").css("border-right","1px solid white");
			$(this).parent(".nav-list").siblings().removeClass("active").find(".list-hidden").hide();
			$(this).parent(".nav-list").siblings().find(".list-content").css("border-right","1px solid #FF3366");
			$(this).parent(".nav-list:last-child").addClass("last");
		},function(){
			oTime = setTimeout(function(){
				$(".list-content").eq(index).next(".list-hidden").hide();
				$(".list-content").eq(index).css("border-right","1px solid #FF3366").parent().removeClass("active");
				$(".list-content").eq(index).parent(".nav-list").find(".list-content").css("border-right","0");
			},20);

		});
	})
	
	$(".list-hidden").each(function(index,element){
		$(this).hover(function(){
			clearTimeout(oTime);
			$(this).show();
		},function(){
			oTime = setTimeout(function(){
				$(".list-hidden").eq(index).hide();
				$(".list-content").eq(index).css("border-right","1px solid #FF3366");
				$(".nav-list").eq(index).removeClass("active");
			},20);
		});
	});
	
	/*
	 * 轮播图效果开始
	 * */
	var 
		iCurIndex = 0,
		iImgWidth = $(".swiper-box").width(),
		oTimer = null,
		oBtn = true;
	
	//给每张图片布局
	for(var i = 0,len = $(".swiper li img").length;i < len;i++){
		$(".swiper li").eq(i).css("left",i * iImgWidth + "px");
	}
	//克隆无缝
	$(".swiper li").eq(0).clone(true).css("left",$(".swiper li img").length * iImgWidth + "px").appendTo($(".swiper"));
	$(".swiper li").eq(0).before($(".swiper li").eq($(".swiper li img").length - 2).clone(true).css("left",-iImgWidth + "px"));
	
	//鼠标移上移下
	$(".swiper-box").on("mouseenter",function(){
		clearInterval(oTimer);
	});
	$(".swiper-box").on("mouseleave",function(){
		autoRun();
	});
	
	//点击按钮切换轮播图
	$(".swiperNum a").each(function(index,element){
		$(this).click(function(){
			//实现轮播
			iCurIndex = index;
			//改变样式
			changeStyle();
			run();
		});
	});
	
	//左右键点击
		$(".swiperNext").on("click",function(){
			if(oBtn){
				iCurIndex++;
				if(iCurIndex === $(".swiper li img").length - 1){
					iCurIndex = 0;
				}
			}

			//改变样式
			changeStyle();
			run();
		});
		$(".swiperPrev").on("click",function(){
			if(oBtn){
				iCurIndex--;
				if(iCurIndex === -3){
					iCurIndex = $(".swiper li img").length - 1;
				}
				//改变样式
				changeStyle();
				run();
			}
		});
	
	
	//封装样式改变函数
	function changeStyle(){
		$(".swiperNum a").each(function(index,element){
			//改变样式
			if(iCurIndex === $(".swiper li img").length -2){
				$(".swiperNum a").eq(0).addClass("cur");
				$(".swiperNum a").eq(0).siblings().removeClass("cur");
			}
			$(".swiperNum a").eq(iCurIndex).addClass("cur");
			$(".swiperNum a").eq(iCurIndex).siblings().removeClass("cur");
		})
	}
	
	//封装运动函数
	function run(){
		oBtn = false;
		if(iCurIndex === $(".swiper li img").length - 2){
			$(".swiper").stop(true).animate({
				left : - iCurIndex * iImgWidth
			},function(){
				iCurIndex = 0;
				$(".swiper").css("left",0);
				oBtn = true;
			});
		}else if(iCurIndex === -1){
			$(".swiper").stop(true).animate({
				left : iImgWidth
			},function(){
				iCurIndex = $(".swiper li img").length - 3;
				$(".swiper").css("left",(-($(".swiper li img").length - 3)) * iImgWidth + "px");
				oBtn = true;
			});
		}else{
			$(".swiper").stop(true).animate({
				left : - iCurIndex * iImgWidth
			},function(){
				oBtn = true;
			});
		}
		changeStyle();
	}
	autoRun();
	//自动运动
	function autoRun(){
		oTimer = setInterval(function(){
			$(".swiperNext").click();
		},3000);
	}
	/*
	 * 轮播图效果结束
	 * */
	
	
	//广告开始
//	设置遮罩层高度
	window.onload = function(){
		$(".firstAd-out").css("height",$(document.body).outerHeight(true));
		$(".firstAdX").on("click",function(){
			$(".firstAd-out").hide();
			$(".firstAd").hide();
			setTimeout(function(){
				$('.adLeft').css("top",$(window).height() - $('.adLeft').outerHeight());
				$(".adLeftX").css("top", -$(".adLeftX").height());
				$(".adLeftX").on("click",function(){
					$(".adLeft").hide();
				});
			},10000)
		});
	}

		

})
