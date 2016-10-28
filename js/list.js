$(function(){
	//头部hover效果
	$(".shop-detail,.show-list").hover(function(){
		$(".server-info").css("background","#F5F5F5");
		$(".shop-select").show();
	},function(){
		$(".server-info").css("background","#FFFFFF");
		$(".shop-select").hide();
	});
	
	//导航栏hover效果
	$(".all-shop").hover(function(){
		$(".ul-hidden").show();
	},function(){
		$(".ul-hidden").hide();
	});
	$(".ul-hidden dl dd").hover(function(){
		$(this).addClass("active");
	},function(){
		$(this).removeClass("active");
	});
	
	//瀑布流
	var 
		iWaterWidth = $(".waterfall").innerWidth(),
		iPanelWidth = $(".panel").outerWidth(true),
		iPanelHeight = $(".panel").outerHeight(true),
		iNum = Math.floor(iWaterWidth / iPanelWidth),	//计算屏幕能放几个panel
		aMinHeight = [],
		sMinHeight = "",
		oBtn = true,
		listNum = 0;
		
		//给第一排panel布局
		for(var i = 0,len = $(".panel").length;i < len;i++){
			$(".panel").eq(i).css({
				left : (i % iNum) * iPanelWidth,
				top : Math.floor(i / iNum) * iPanelHeight
			});
			//初始化布局完成后的高度
			sMinHeight = Math.floor(i / iNum) * iPanelHeight;
			aMinHeight[i % iNum] = sMinHeight + iPanelHeight;
		}
		console.log(aMinHeight);
		
		//窗口滚动事件
		$(window).on("scroll",function(){
			//获取滚动条高度
			var 
				iScroll = $(document).scrollTop(),	//获取滚动条高度
				iWindowHeigh = $(window).height(),	//获取浏览器高度
				oLastPanel = $(".panel:last-child"),
				iTargetHeight = oLastPanel.offset().top + oLastPanel.outerHeight(true) / 2;
				//瀑布流完成之后再显示尾部

				if(oBtn && iWindowHeigh + iScroll > iTargetHeight){
					oBtn = false;
					listNum++;
					$.ajax(
						{
							type : "get",
//							url : "/api/list" + listNum,
							url : "../mock/lisst" + listNum,
							dataType : "json",
							success : function(data){
								for(var i = 0,len = data.length;i < len;i++){
									//遍历添加元素
									var $oNewPanel = $("<div class='panel'><a href='#' class='img'><img src='../img/list/" + data[i].url + "' /></a><div class='panel-text'><a class='panel-title'>" +  data[i].text + "</a><div class='price-box'><b class='price'>￥" + data[i].price + ".00</b><span class='love-num'>" + data[i].love + "</span></div></div></div>").appendTo($(".waterfall"));
									
									// 求最短列的索引
									var shortestIndex = $.inArray(Math.min.apply(null, aMinHeight), aMinHeight);
									
									//设置初始位置
									$oNewPanel.css({
										left : shortestIndex * iPanelWidth,
										top : iWindowHeigh + iScroll
									});
									
									
									//给元素位置赋值
									$oNewPanel.animate({
										left : shortestIndex * iPanelWidth,
										top : aMinHeight[shortestIndex]
									},1000,function(){
										oBtn = true;
										//设置容器高度
										$(".waterfall").height(aMinHeight[shortestIndex] + "px");
									});
										//更新最小高度
									aMinHeight[shortestIndex] += iPanelHeight;
								}
							},
							error : function(xhr){
								$(".footer").show();
							}
						}
					);
				}
		});
		
	
})
