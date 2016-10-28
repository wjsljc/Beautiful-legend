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
	
	
	var 
		sHref = window.location.href,
		aHref = sHref.split("?"),
		aArr = aHref[1].split("&"),
		aAttr = [],
		sTarget = "";
	//遍历出id
	for(var i = 0,len = aArr.length;i < len;i++){
		aAttr = aArr[i].split("=");
		//获取到id的值
		if(aAttr[0] === "sid"){
			sTarget = aAttr[1];
		}
	}
	
	$.ajax({
		type : "get",
//		url : "/api/list",
		url : "../mock/listImg.json",
		dataType : "json",
		success : function(data){
			//如果有传sid值
			if(sTarget){
				//插入商品标题
				 $(".goods-title span").text(data.info[sTarget-1].text);
				 //插入商品价格
				 $(".price-con span").text("￥" + data.info[sTarget-1].price + ".00");
				 //评价和销量（没有这个数据用love和id取代）
				 $(".pj").text(data.info[sTarget-1].love);
				 $(".xl").text(data.info[sTarget-1].sid);
		 		//生成款式图标
				 for(var i= 0,len = data.info[sTarget-1].imgtype.length;i < len;i++){
				 	if(i === 0){
				 		$('<li class="img c" title="黑色"><img src="../img/detail/' + data.info[sTarget-1].imgtype[i] + '"><b></b></li>').appendTo($(".style-list"));
				 	}else{
				 		//生成款式图标
				 		$('<li class="img" title="黑色"><img src="../img/detail/' + data.info[sTarget-1].imgtype[i] + '"><b></b></li>').appendTo($(".style-list"));
				 	}
				 }
		 		//生成尺码
				 for(var i= 0,len = data.info[sTarget-1].size.length;i < len;i++){
				  	if(i === 0){
				 		$('<li class="c">' + data.info[sTarget-1].size[i] +'</li>').appendTo($(".size-list"));
				 	}else{
				 		$('<li class="">' + data.info[sTarget-1].size[i] +'</li>').appendTo($(".size-list"));
				 	}
				  }
				 //生成库存
				 $(".goods-stock").text("库存" + data.info[sTarget-1].num + "件");
				 //商品数量的加减
				$(".num-reduce").on("click",function(){
					if($(".num-input").val() == 1){
						
					}else if($(".num-input").val() == 2){
						//隐藏-
						$(this).css("opacity",".3");
						$(".num-input").val(parseInt($(".num-input").val()) - 1);
					}else{
						$(".num-input").val(parseInt($(".num-input").val()) - 1);
						//显示+
						$(".num-add").css("opacity","1");
					}
				});
				$(".num-add ").on("click",function(){
					if($(".num-input").val() >= data.info[sTarget-1].num){
						
					}else if($(".num-input").val() >= data.info[sTarget-1].num - 1){
						//隐藏+显示-
						$(this).css("opacity",".3");
						$(".num-input").val(parseInt($(".num-input").val()) + 1);
					}else{
						$(".num-input").val(parseInt($(".num-input").val()) + 1);
						$(".num-reduce").css("opacity","1");
					}
				});
				//big图片的生成
				$(".big-img img").attr("src","../img/detail/" + data.info[sTarget-1].imgbig[0]);
				//生成small图片列表
				for(var i= 0,len = data.info[sTarget-1].imgsmall.length;i < len;i++){
						if(i === 0){
					 		$('<li class="c"><img src="../img/detail/' + data.info[sTarget-1].imgsmall[i] + '"><i></i></li>').appendTo($(".small-img ul"));
					 	}else{
					 		$('<li class=""><img src="../img/detail/' + data.info[sTarget-1].imgsmall[i] + '"><i></i></li>').appendTo($(".small-img ul"));
					 	}
				}
				//如果图片过少则不显示滚动
				if(data.info[sTarget-1].imgsmall.length <= 5){
					$("#left-btn,#right-btn").hide();
				}else{
					//设置small的ul的宽度
					$(".small-img .list ul").css("width",$(".small-img .list ul li").length * $(".small-img .list ul li").outerWidth(true));
				}
				//轮播切换
				var iCur = 0;
				$("#right-btn").on("click",function(){
					iCur++;
					if(iCur >= Math.floor(data.info[sTarget-1].imgsmall.length / 5) - 1){
						$(".small-img .list ul").animate({
							left : - iCur * (5 * $(".small-img .list ul li").outerWidth(true))
						});
						$(this).hide();
					}else{
						$(".small-img .list ul").animate({
							left : - iCur * (5 * $(".small-img .list ul li").outerWidth(true))
						});
					}
					console.log(iCur);
				});
				$("#left-btn").on("click",function(){
					console.log(iCur);
					if(iCur > 0){
						iCur--;
						$(".small-img .list ul").animate({
							left : iCur * (5 * $(".small-img .list ul li").outerWidth(true))
						});
						$("#right-btn").show();
					}
				});
				
				//hover切换展示图片(small)
				$(".small-img ul li img").each(function(index,element){
					$(this).on("mouseenter",function(){
						//改变透明
						$(this).parent("li").addClass("c").siblings("li").removeClass("c");
						//改变图片
						$(".big-img img").attr("src","../img/detail/" + data.info[sTarget-1].imgbig[index]);
					});
				});
				//热卖推荐生成
				for(var j = 0;j < 3;j++){
					var random = Math.floor(Math.random() * data.info.length);
					//除重
					if(random !== sTarget){
						$('<li><a href="' + data.info[random].href + '" target="_blank"><img src="../img/list/' +  data.info[random].url + '" width="120"> </a><span>￥' + data.info[random].price + ".00" + '</span></li>').appendTo($(".goods-recommend .list ul"));
					}else{
						random = Math.floor(Math.random() * data.info.length);
					}
				}
				//商品描述生成
				$(".graphic-text").text(data.info[sTarget-1].desc);
				//展示图片的生成
				for(var i = 0,len = data.info[sTarget-1].imgshow.length;i < len;i++){
					$('<div class="graphic-pic"><div class="pic-box"><img class="lazy"  src="../img/detail/' + data.info[sTarget-1].imgshow[i] + '"/> </div></div>').appendTo($(".scxg"));
				}
				//过滤不重复的数字
				var aNum = [];
				for(var i = 0; i < data.info.length;i++){	//一个从0到11的数组
				    aNum.push(i);
				}
				aNum.sort(function(){//随机打乱这个数组
				  	return Math.random()-0.5;
				});
				//slider看了又看列表生成
				for(var i = 0;i < 10;i++){
					$('<li><a class="pic" href="' + data.info[aNum[i]].href + '" target="_blank"><img class="lazy" src="../img/list/' + data.info[aNum[i]].url + '" ></a> <a class="title" href="#" target="_blank">' + data.info[aNum[i]].text + '</a><div class="info"><div class="price"><em class="price-u">¥</em><span class="price-n">' + data.info[aNum[i]].price + ".00" + '</span></div><div class="fav"><em class="fav-i"></em><span class="fav-n">' + data.info[aNum[i]].love + '</span></div></div></li>').appendTo($(".repeat-info .repeat-list"));
				}
				
				//加入购物车存放cookie
				$("#J_BuyCart").on("click",function(){
					$.cookie.json = true;
					var user = $.cookie("user");
					//先让用户登录
					if(user !== undefined){
						var	userName = $("#userName").text();//获取用户名字
						//用户登录的状况
						var	shopInfo = $.cookie(userName);
						if(shopInfo === undefined){
							var 
							shopInfo = [],//用于存放信息
							shopNum = $("#num-input").val();//获取商品的数量
							shopInfo.push({
								shopId : sTarget,	//商品id
								shopName : data.info[sTarget-1].text,
								shopPrice : data.info[sTarget-1].price,
								shopNum : $("#num-input").val()
							});
							$.cookie(userName,shopInfo,{expire : 30,path : "/"});
							alert("加入成功！");
						}else{
							var bNewGoods = true;
							for(var i = 0,len = shopInfo.length;i < len;i++){
								if(shopInfo[i].shopId === sTarget){
									shopInfo[i].shopNum = parseInt(shopInfo[i].shopNum ) + parseInt($("#num-input").val());
									bNewGoods = false;
								}
							}
							if(bNewGoods){//它是一个新品
								shopInfo.push({
									shopId : sTarget,	//商品id
									shopName : data.info[sTarget-1].text,
									shopPrice : data.info[sTarget-1].price,
									shopNum : $("#num-input").val()
								});
							}
							$.cookie(userName,shopInfo,{expire : 30,path : "/"});
							alert("加入成功！");						
						}
					}else{
						//用户没有登录的状态
						location = "login.html";
					}
				});
				
				
			}
		},
		error : function(xhr){
			console.log(111);
		}
	});
	
	//搜索本店显示搜索内容
	$("#J_SearchInShop").on("click",function(){
		//搜索内容展示
		$("#searchContainer").show();
		//隐藏其他内容
		$("#detailContainer").hide();
	});
	
	//点击款式图标
	setTimeout(function(){
		//点击事件
		$(".style-list .img,.size-list li").on("click",function(){
			$(this).addClass("c").siblings("li").removeClass("c");
		});
	},10);
	
	//二维码hover显示
	$(".qrcode").hover(function(){
		$(".qrcode-pic").show();
	},function(){
		$(".qrcode-pic").hide();
	});
	
	//展示栏滚动改变样式
	$(window).on("scroll",function(){
		var
			iScroll = $(document).scrollTop(),
			iWindowHeigh = $(window).height(),	
			iTargetTop = $(".content-main").offset().top;
		//导航栏变化
		if(iScroll >= iTargetTop){
			$('.tabbar-box').addClass("ui-fixed");
			$('.tabbar-bg').show().addClass("ui-fixed");
			$(".cart-hd,.shop-hd,.extranav-bd").addClass("ui-fixed");
		}else{
			$('.tabbar-box').removeClass("ui-fixed");
			$('.tabbar-bg').hide().removeClass("ui-fixed");
			$(".cart-hd,.shop-hd,.extranav-bd").removeClass("ui-fixed");
		}
		//右侧楼层导航变化
		if(iScroll >= $(".scxg").offset().top){
			$("#scxg").addClass("selected").siblings("li").removeClass("selected");
		}else{
			$("#spms").addClass("selected").siblings("li").removeClass("selected");
		}
	});
	
})
