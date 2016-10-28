var myShop = angular.module("app",[]);
	myShop.controller("shop",function($scope,$http,$timeout,$interval){
		$http.get("../mock/listImg.json").success(function(response){
			$scope.info = response.info;
		});
		//全部隐藏
		allFalse();
		//初始化控制排序
		$scope.showHot = true;
		
		//初始化关闭所有排序开关
		choseWay();
		$scope.choseHot = true;
		
		//初始化关闭所有栏目标识
		isWay();
		
		$timeout(function(){
			//给初始化显示的panel布局
			for(var i = 0;i < 20;i++){
				$(".panel").eq(i).css({
					"display" : "block"
				});
			}
		},100);
		
		//切换排序方式
		$scope.price = function(){
			//设置三种方式为false
			choseWay();
			//开启价格标识
			$scope.chosePrice = true;
			//设置瀑布流
			getPic();
			//设置标识样式
			$("#prive").addClass("current").parent("li").siblings("li").find("a").removeClass("current");
			///判断栏目，决定显示
			navSign("price");
		}
		$scope.love = function(){
			//设置瀑布流
			getPic();
			//设置三种方式为false
			choseWay();
			//开启喜欢标识
			$scope.choseLove = true;
			
			$("#love").addClass("current").parent("li").siblings("li").find("a").removeClass("current");
			///判断栏目，决定显示
			navSign("love");
		}
		$scope.hot = function(){
			//设置瀑布流
			getPic();
			//设置三种方式为false
			choseWay();
			//开启热卖标识
			$scope.choseHot = true;
			
			$("#hot").addClass("current").parent("li").siblings("li").find("a").removeClass("current");
			//判断栏目，决定显示
			navSign("text");
		}
		
		//封装栏目标识判断函数
		function navSign(param){
			var 
				px = param;
			//全部隐藏
			allFalse();
			//栏目标识判断
			if($scope.isSy === true){
				switchParam(px,"sy");
			}else if($scope.isQz === true){
				switchParam(px,"qz");
			}else if($scope.isKz === true){
				switchParam(px,"kz");
			}else if($scope.isTz === true){
				switchParam(px,"tz");
			}else if($scope.isYz === true){
				switchParam(px,"yz");
			}else if($scope.isMz === true){
				switchParam(px,"mz");
			}else{
				if(param === "price"){
					$scope.showPrice = true;
				}else if(param === "love"){
					$scope.showLove = true;
				}else{
					$scope.showHot= true;
				}
			}
			function switchParam(px,nav){
				if(px === "price"){
					switch (nav){
						case "sy":$scope.click_sy_price = true;break;
						case "qz":$scope.click_qz_price = true;break;
						case "kz":$scope.click_kz_price = true;break;
						case "tz":$scope.click_tz_price = true;break;
						case "yz":$scope.click_yz_price = true;break;
						case "mz":$scope.click_mz_price = true;break;
						default:break;
					}
				}else if(px === "love"){
					switch (nav){
						case "sy":$scope.click_sy_love = true;break;
						case "qz":$scope.click_qz_love = true;break;
						case "kz":$scope.click_kz_love = true;break;
						case "tz":$scope.click_tz_love = true;break;
						case "yz":$scope.click_yz_love = true;break;
						case "mz":$scope.click_mz_love = true;break;
						default:break;
					}
				}else{
					switch (nav){
						case "sy":$scope.click_sy_text = true;break;
						case "qz":$scope.click_qz_text = true;break;
						case "kz":$scope.click_kz_text = true;break;
						case "tz":$scope.click_tz_text = true;break;
						case "yz":$scope.click_yz_text = true;break;
						case "mz":$scope.click_mz_text= true;break;
						default:break;
					}
				}
			}
		}
		
		
		//搜本站
		$scope.s_inshop = function(){
			$timeout(function(){
				for(var i = 0;i < $(".panel").length;i++){
					$(".panel").eq(i).css({
						"display" : "block"
					});
				}
				if($(".panel").length === 0){
					$(".waring").show();
				}else{
					//清除没有商品时的提示
					$(".waring").hide();
				}
			},100);
			//消失导航栏样式
			$(".nav-ul li a").removeClass("current");
			$("#hot").addClass("current").parent("li").siblings("li").find("a").removeClass("current");
			$("#allShop").addClass("current");
			$("#nav_ul").hide();
			//消失类型索引
			isWay();
			//全部隐藏
			allFalse();
			$scope.click_search = true;
		}
		//尝试搜索时搜索栏不消失
		$scope.showIcur = function(){
			if($scope.click_search === true){
				$timeout(function(){
					for(var i = 0;i < $(".panel").length;i++){
						//还原搜索前的栏目
						$(".panel").eq(i).css({
							"display" : "block"
						});
					}
					if($(".panel").length === 0){
						$(".waring").show();
					}else{
						//清除没有商品时的提示
						$(".waring").hide();
					}
				},10);
				if($("#search-key").val().length <= 1){
					//全部隐藏
					allFalse();
					$scope.showHot = true
					//打开排序显示
					$("#nav_ul").show();
				}else{
					$scope.click_search = true;
				}
			}
		}
		
		//导航栏点击跳转事件
			//搜全部
		$scope.all_shop = function(){
			//显示搜索页面（在搜索时才有用）
			$("#searchContainer").show();
			//清除没有商品时的提示
			$(".waring").hide();
			//清除所有显示
			isWay();
			//全部隐藏
			allFalse();
			if($scope.chosePrice === true){
				$scope.showPrice = true;
			}else if($scope.choseLove === true){
				$scope.showLove = true;
			}else if($scope.choseHot === true){
				$scope.showHot = true;
			}
			//打开排序显示
			$("#nav_ul").show();
			//瀑布流设置
			getPic();
		}
		
			//搜索上衣
		$scope.sy = function(){
			//显示搜索页面（在搜索时才有用）
			$("#searchContainer").show();
			//打开排序显示
			$("#nav_ul").show();
			//证明是上衣
			isWay();
			$scope.isSy = true;
			//瀑布流设置
			getPic();
			//全部隐藏
			allFalse();
			if($scope.chosePrice === true){
				$scope.click_sy_price = true;
			}else if($scope.choseLove === true){
				$scope.click_sy_love = true;
			}else if($scope.choseHot === true){
				$scope.click_sy = true;
			}

		}
			//搜索裙装
		$scope.qz = function(){
			//显示搜索页面（在搜索时才有用）
			$("#searchContainer").show();
			//打开排序显示
			$("#nav_ul").show();
			//证明是裙装
			isWay();
			$scope.isQz = true;
			//瀑布流设置
			getPic();
			//全部隐藏
			allFalse();
			if($scope.chosePrice === true){
				$scope.click_qz_price = true;
			}else if($scope.choseLove === true){
				$scope.click_qz_love = true;
			}else if($scope.choseHot === true){
				$scope.click_qz = true;
			}
		}
			//搜索裤子
		$scope.kz = function(){
			//显示搜索页面（在搜索时才有用）
			$("#searchContainer").show();
			//打开排序显示
			$("#nav_ul").show();
			//证明是裤子
			isWay();
			$scope.isKz = true;
			//瀑布流设置
			getPic();
			//全部隐藏
			allFalse();
			if($scope.chosePrice === true){
				$scope.click_kz_price = true;
			}else if($scope.choseLove === true){
				$scope.click_kz_love = true;
			}else if($scope.choseHot === true){
				$scope.click_kz = true;
			}
		}
			//搜索套装
		$scope.tz = function(){
			//显示搜索页面（在搜索时才有用）
			$("#searchContainer").show();
			//打开排序显示
			$("#nav_ul").show();
			//证明是套装
			isWay();
			$scope.isTz = true;
			//瀑布流设置
			getPic();
			//全部隐藏
			allFalse();
			if($scope.chosePrice === true){
				$scope.click_tz_price = true;
			}else if($scope.choseLove === true){
				$scope.click_tz_love = true;
			}else if($scope.choseHot === true){
				$scope.click_tz = true;
			}
		}
			//搜索泳装
		$scope.yz = function(){
			//显示搜索页面（在搜索时才有用）
			$("#searchContainer").show();
			//打开排序显示
			$("#nav_ul").show();
			//证明是泳装
			isWay();
			$scope.isYz = true;
			//瀑布流设置
			getPic();
			//全部隐藏
			allFalse();
			if($scope.chosePrice === true){
				$scope.click_yz_price = true;
			}else if($scope.choseLove === true){
				$scope.click_yz_love = true;
			}else if($scope.choseHot === true){
				$scope.click_yz = true;
			}
		}
			//搜索美妆
		$scope.mz = function(){
			//显示搜索页面（在搜索时才有用）
			$("#searchContainer").show();
			//打开排序显示
			$("#nav_ul").show();
			//证明是美妆
			isWay();
			$scope.isMz = true;
			//瀑布流设置
			getPic();
			//全部隐藏
			allFalse();
			if($scope.chosePrice === true){
				$scope.click_mz_price = true;
			}else if($scope.choseLove === true){
				$scope.click_mz_love = true;
			}else if($scope.choseHot === true){
				$scope.click_mz = true;
			}
		}
		
		//封装所有的都为false
		function allFalse(){
			$scope.showHot = $scope.showPrice = $scope.showLove = $scope.click_search = $scope.click_sy = $scope.click_sy_text = $scope.click_sy_price = $scope.click_sy_love = $scope.click_qz = $scope.click_qz_text = $scope.click_qz_price = $scope.click_qz_love = $scope.click_kz = $scope.click_kz_text = $scope.click_kz_price = $scope.click_kz_love = $scope.click_tz = $scope.click_tz_text = $scope.click_tz_price = $scope.click_tz_love = $scope.click_yz = $scope.click_yz_text = $scope.click_yz_price = $scope.click_yz_love = $scope.click_mz = $scope.click_mz_text = $scope.click_mz_price = $scope.click_mz_love = false;
		}
		//用于判断hot、price、love开关
		function choseWay(){
			$scope.choseHot = $scope.chosePrice = $scope.choseLove = false;
		}
		//用于判断导航徐昂向开关
		function isWay(){
			$scope.isSy = $scope.isQz = $scope.isKz = $scope.isTz = $scope.isYz = $scope.isMz = false;
		}
		//初始化显示瀑布流
		getPic();
		function getPic(){
			$timeout(function(){
				//给初始化显示的panel布局
				for(var i = 0;i < 20;i++){
					$(".panel").eq(i).css({
						"display" : "block"
					});
				}
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
					
				var addNum = 20;
				if((20+addNum) < $(".panel").length){
					addNum += 20;
				}else{
					addNum = $(".panel").length;
				}
				
				
				$(window).on("scroll",function(){
					var 
						iScroll = $(document).scrollTop(),	//获取滚动条高度
						iWindowHeigh = $(window).height(),	//获取浏览器高度
						oLastPanel = $(".panel:last-child");
						if($(".panel").length > 21){
							iTargetHeight = $(".panel").eq(addNum - 21).offset().top + iPanelHeight;
						}else{
							iTargetHeight = 10000000000000000000000;
						}
					//瀑布流完成之后再显示尾部
					
					//超出临界值的时候显示
					if(iWindowHeigh + iScroll > iTargetHeight){
						for(var i = 20;i < addNum;i++){
							$(".panel").eq(i).css({
								"display" : "block"
							});
						}
						if((20+addNum) < $(".panel").length){
							addNum += 20;
						}else{
							addNum = $(".panel").length;
						}
					}
				});
			},100);
		}
	})
	
$(function(){
	//获取cookie,显示用户名信息
	$.cookie.json = true;
	var user = $.cookie("user");
	if(user !== undefined){
		$(".register,.login").hide();
		$(".userBox").show().css("display","inline-block");
		$("#userName").text($.cookie("user").id);
	}
	
	//退出清除cookie
	$("#exit").on("click",function(){
		//删除cookie
		$.cookie("user","",{expires:-1,path:"/"});
		//显示样式
		$(".register,.login").show();
		$(".userBox").hide();
		location = "../index.html";
	});
	
	
	
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
	
	//切换类型样式
	$(".nav-ul li a").on("click",function(){
		$(this).addClass("current").parent("li").siblings("li").find("a").removeClass("current");
	});
})
