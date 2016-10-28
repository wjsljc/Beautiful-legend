$(function(){
	var isBuy = false;
	//获取cookie,显示用户名信息
	$.cookie.json = true;
	var user = $.cookie("user");
	if(user !== undefined){
		$(".register,.login").hide();
		$(".userBox").show().css("display","inline-block");
		$("#userName").text($.cookie("user").id);
		//读取地址信息
		console.log(user.address);
		if(user.address != undefined){
			isBuy = true;
			//显示样式
			$('#cartAddressList').show();
			var html = "";
			for(var i = 0,len = user.address.length;i < len;i++){
				if(i === 0){
					html += '<li><a href="javascript:;" class="cart_address_card addressCard selected"><h5 class="cart_address_tit">' + user.address[i].name + '</h5><p class="cart_address_street">' + user.address[i].street + '</p><p class="cart_address_zipinfo">' + user.address[i].province + user.address[i].city + user.address[i].area + user.address[i].postcode + '</p><p class="cart_address_mobile">' + user.address[i].phone + '</p><i class="cart_address_edit" style="display: none;" index="' + i + '">删除</i></a></li>'
				}else{
					html += '<li><a href="javascript:;" class="cart_address_card addressCard"><h5 class="cart_address_tit">' + user.address[i].name + '</h5><p class="cart_address_street">' + user.address[i].street + '</p><p class="cart_address_zipinfo">' + user.address[i].province + user.address[i].city + user.address[i].area + user.address[i].postcode + '</p><p class="cart_address_mobile">' + user.address[i].phone + '</p><i class="cart_address_edit" style="display: none;" index="' + i + '">删除</i></a></li>'
				}
				
			}
			$(html).appendTo($('#cartAddressList'));
		}
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
	
	//获取cookie商品信息
	var 
		cookieName = $("#userName").text(),
		shopInfo = $.cookie(cookieName);
		console.log(shopInfo);
	if(shopInfo !== "undefined" || shopInfo.length !== 0){
		$.ajax({
			type : "get",
//			url : "/api/list",
			url : "../mock/listImg.json",
			dataType : "json",
			success : function(data){
				//插入商品数据
				var
					html = "",
					totalMoney = 0;
				for(var i = 0,len = $.cookie(cookieName).length;i < len;i++){
					html += '<tr class="tr_checked"><td class="cart_table_goods_wrap"><a href="' + data.info[shopInfo[i].shopId - 1].href + '" target="_blank" class="cart_goods_img"><img class="cartImgTip" src="../img/list/' + data.info[shopInfo[i].shopId - 1].url + '" width="78" height="78"></a><a href="http://item.meilishuo.com/detail/1gls8sa" target="_blank" class="cart_goods_t cart_hoverline">时尚起义 时尚个性设计印花优雅显瘦罩衫</a></td><td><p class="cart_lh20">颜色：海军蓝</p><p class="cart_lh20">尺码：均码</p></td><td class="cart_alcenter"><p class="cart_bold cart_itemUnit">￥' + data.info[shopInfo[i].shopId - 1].price + ".00" + '</p></td> <td class="cart_alcenter"><p class="cart_itemNum">' + shopInfo[i].shopNum + '</p> </td> <td class="cart_alcenter cartItemPromo"> <p class="J_extraPromo"></p><p class="ui-red-discount ui-red ui-red-packet-info"></p></td><td class="cart_alcenter"><p class="cart_font16 item_sum itemSum">￥' + (shopInfo[i].shopPrice * shopInfo[i].shopNum) + '.00</p></td></tr>';
					totalMoney += parseInt(shopInfo[i].shopNum) * parseInt(shopInfo[i].shopPrice);
				}
				$(html).appendTo($("#tbody"));
				//改变合计价格
				$(".shopSum,.cart_money").text("￥" + totalMoney + ".00");
				//改变总共商品数量
				$('.goodsNum').text($.cookie(cookieName).length);
			},
			error : function(xhr){
				console.log("数据读取失败");
			}
		})
	}
	
	//初始隐藏“显示全部地址”
	$(".allAddress").hide();
	
	$.get(
//		"/api/address",
		"../mock/address.json",
		function(data){
			//插入省份
				//初始化
			var html_s = "";
			for(var i = 0,len = data.length;i < len;i++){
				if(i === 0){
					html_s += '<option value="' + i + '" checked="checked">' + data[i].name + '</option>'; 
				}else{
					html_s += '<option value="' + i + '">' + data[i].name + '</option>'; 
				}
			}
			$(html_s).appendTo($(".J_province"));
			
			//插入市
				startCity();
				//改变
			$(".J_province").on("change",function(){
				getCity();
				var html_area = '',
				iCur_city = $(".J_province option:checked").attr("value");
				for(var k = 0,len = data[iCur_city].city[0].area.length;k < len;k++){
					if(k === 0){
						html_area += '<option value="' + k + '" checked="checked">' + data[iCur_city].city[0].area[k] + '</option>'; 
					}else{
						html_area += '<option value="' + k + '>' + data[iCur_city].city[0].area[k] + '</option>'; 
					}
				}
				$(".J_area").html(html_area);

			});
			
			//插入区
				//初始化
			var html_area = '';
			for(var k = 0,len = data[0].city[0].area.length;k < len;k++){
				if(k === 0){
					html_area += '<option value="' + k + '" checked="checked">' + data[0].city[0].area[k] + '</option>'; 
				}else{
					html_area += '<option value="' + k + '>' + data[0].city[0].area[k] + '</option>'; 
				}
			}
			$(".J_area").html(html_area);
				//改变
			$(".J_city").on("change",function(){
				var 
					html_area = "",
					iCur_city = $(".J_province option:checked").attr("value"),
					len_city = data[iCur_city].city.length,
					iCur_area = $(".J_city option:checked").attr("value"),
					len_eare = data[iCur_city].city[iCur_area].area.length;
				for(var k = 0;k < len_eare;k++){
					if(k === 0){
						html_area += '<option value="' + k + '" checked="checked">' + data[iCur_city].city[iCur_area].area[0] + '</option>'; 
					}else{
						html_area += '<option value="' + k + '>' + data[iCur_city].city[iCur_area].area[k] + '</option>'; 
					}

				}
				$(".J_area").html(html_area);
			});
			
			//插入初始化市的方法
			function startCity(){
					//初始化
				var html_city = '';
				for(var j = 0,len = data[0].city.length;j < len;j++){
					if(j === 0){
						html_city += '<option value="' + j + '" checked="checked">' + data[0].city[j].name + '</option>'; 
					}else{
						html_city += '<option value="' + j + '">' + data[0].city[j].name + '</option>'; 
					}
				}
				$(".J_city").html($(html_city));
			}
			
			//封装插入市的方法
			function getCity(){
				var 
					html_city = "",
					iCur_city = $(".J_province option:checked").attr("value"),
					len_city = data[iCur_city].city.length;
				for(var j = 0;j < len_city;j++){
					html_city += '<option value="' + j + '">' + data[iCur_city].city[j].name + '</option>'; 
				}
				$(".J_city").html($(html_city));
			}
			
			//封装插入地区的方法
			function getArea(){
				var 
					html_area = "",
					iCur_city = $(".J_province option:checked").attr("value"),
					len_city = data[iCur_city].city.length,
					iCur_area = $(".J_city option:checked").attr("value"),
					len_eare = data[iCur_city].city[iCur_area].area.length;
				for(var k = 0;k < len_eare;k++){
					if(k === 0){
						html_area += '<option value="' + k + '" checked="checked">' + data[iCur_city].city[len_eare].area[k] + '</option>'; 
					}else{
						html_area += '<option value="' + k + '">' + data[iCur_city].city[len_eare].area[k] + '</option>'; 
					}

				}
				$(".J_area").html(html_area);
			}
			
			
		}
	);
	
	//验证
	var 
		isPost = false,
		isAddress = false,
		isgetName = false,
		isGetPhone = false;
		//邮编
	$(".J_postcode").on("blur",function(){
		var 
			post = $(".J_postcode").val(),
			regPost = /^[1-9][0-9]{5}$/;
			if(post.match(regPost)){
				$(this).next(".prompt").hide().removeClass("notice").end().removeClass("error");
				isPost = true;
			}else{
				$(this).next(".prompt").show().addClass("notice").text("请填写正确的邮政编码").end().addClass("error");
				isPost = false;
			}

	});
	
	//街道地址
	$(".J_street").on("blur",function(){
		var 
			street = $(".J_street").val();
			if(street.length < 5){
				$(this).next(".prompt").show().addClass("notice").text("请填写街道地址，最少5个字，最多不能超过100个字").end().addClass("error");
				isAddress = false;	
			}else if(street.length > 100){
				$(this).next(".prompt").show().addClass("notice").text("请填写街道地址，最少5个字，最多不能超过100个字").end().addClass("error");
				isAddress = false;
			}else{
				$(this).next(".prompt").hide().removeClass("notice").end().removeClass("error");
				isAddress = true;
			}
			
	});
	
	//收货人姓名
	$(".J_name").on("blur",function(){
		var 
			getName = $(".J_name").val();
			if(getName.length !== 0){
				$(this).next(".prompt").hide().removeClass("notice").end().removeClass("error");
				isgetName = true;
			}else{
				$(this).next(".prompt").show().addClass("notice").text("请填写收货人").end().addClass("error");
				isgetName = false;
			}
	});
	
	//手机号码
	$(".J_mobile").on("blur",function(){
		var 
			regPhone = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/,//验证密码
			phone = $(".J_mobile").val();
			if(phone.match(regPhone)){
				$(this).next(".prompt").hide().removeClass("notice").end().removeClass("error");
				isGetPhone = true;
			}else{
				$(this).next(".prompt").show().addClass("notice").text("请填写正确的联系号码").end().addClass("error");
				isGetPhone = false;
			}
	});
	console.log(user);
	//获取生成地址	
	var aAddress = user.address;//用于装地址数组
	$(".J_okbtn").on("click",function(){
		if(isPost && isgetName && isAddress && isGetPhone){
			isBuy = true;
			//样式显示
			$("#cartAddressList").show();
			//写入cookie保存
			var 
				address = {
					name : $(".J_name").val(),
					street : $(".J_street").val(),
					province : $(".J_province option:checked").text(),
					city : $(".J_city option:checked").text(),
					area : $(".J_area option:checked").text(),
					postcode : $(".J_postcode").val(),
					phone : $(".J_mobile").val()
				};
				console.log(address);
				console.log(aAddress);
			aAddress.push(address);
			if(user !== "undefined"){
				user = {
					id : $.cookie("user").id,
					address : aAddress
				}
				$.cookie("user",user, {expires:30, path:"/"});
			}

			
			//刷新页面
			location = location;
		}else{
			console.log("地址生成失败!");
		}
	});
	//地址选择的样式切换
	$(".cart_address_card").on("click",function(){
		$(this).addClass("selected").parent("li").siblings().children("a").removeClass("selected");
	});
	
	
	//编辑地址的hover
	$(".cart_address_card").hover(function(){
		$(this).children(".cart_address_edit").show();
	},function(){
		$(this).children(".cart_address_edit").hide();
	});
	//地址的删除
	$(".cart_address_edit").on("click",function(){
		//删除样式
		$(this).parents("li").remove();
		//删除cookie
		aAddress.splice($(this).attr("index"),1);
		user = {
			id : $.cookie("user").id,
			address : aAddress
		}
		$.cookie("user",user, {expires:30, path:"/"});
		//刷新页面
		location = location;
	});
	
	//确认并付款
	$(".cart_surebtn").on("click",function(){
		if(isBuy){
			alert("买什么买！剁手！留钱娶媳妇！--中国好男人！");
		}else{
			alert("请先完善数据!");
		}
	});
	
	
})
