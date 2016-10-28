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
	//读取商品信息
	var shopInfo = $.cookie($("#userName").text());
	//绑定用户
	if(shopInfo !== "undefined" || shopInfo.length !== 0){
		//ajax读取mock
		$.ajax({
			type : "get",
//			url : "/api/list",
			url : "../mock/listImg.json",
			dataType : "json",
			success : function(data){
				var	userName = $("#userName").text();
				//遍历数组
				$.each(shopInfo, function(index,element) {
					if(index !== shopInfo.length){
						//控制长度
						if(shopInfo[index].shopId !== undefined){
							$('<tr class="cart_mitem " shopNum="' + index + '" shopId="' + shopInfo[index].shopId + '" shopOnePrice="' + shopInfo[index].shopPrice + '"><td class="vm "><input type="checkbox" class="cart_thcheck"></td><td class="cart_table_goods_wrap"><a href="#" target="_blank" class="cart_goods_img"><img class="cartImgTip" src="../img/list/' + data.info[shopInfo[index].shopId - 1].url + '" width="78" height="78" ></a><a href="#" target="_blank" class="cart_goods_t cart_hoverline"> ' +  data.info[shopInfo[index].shopId - 1].text + ' </a> <p class="remind_btm"></p> </td> <td><p class="cart_lh20">颜色：黑色</p> <p class="cart_lh20">尺码：均码</p>  </td> <td class="cart_alcenter"><p class="cart_lh20 cart_bold cart_data_sprice">￥' + data.info[shopInfo[index].shopId - 1].price + ".00" + '</p></td><td class="cart_alcenter"><div><div class="cart_num cart_counter"><input type="text" class="cart_num_input cart_bold" maxlength="3" value="' + shopInfo[index].shopNum + '"><span class="cart_num_add"></span><span class="cart_num_reduce disable"></span></div></div></td> <td class="cart_alcenter"><p class="cart_deep_red cart_font16 item_sum oneMoney" >' + data.info[shopInfo[index].shopId - 1].price * shopInfo[index].shopNum + ".00" + '</p> </td> <td class="cart_alcenter"><a href="javascript:;" class="cart_hoverline delete">删除</a> </td></tr>').appendTo($("#tbody"));
						}
					}
				});
				
				//订单
				var buyShopArr = [];
					shopInfo.buyShopArr = [];//用于存放要买的数据
				$("#payBtn").on("click",function(){
					/*//选中商品才可以下订单
					if($(".cart_thcheck:checked").length !== 0){
						for(var i = 0,len = $(".cart_thcheck:checked").length;i < len;i++){
							console.log($(".cart_thcheck:checked").eq(i).parents("tr").find(".cart_goods_t").text());
							var 
								thisId = $(".cart_thcheck:checked").eq(i).parents("tr").attr("shopId"),
								thisName = $(".cart_thcheck:checked").eq(i).parents("tr").find(".cart_goods_t").text(),
								thisNum = $(".cart_thcheck:checked").eq(i).parents("tr").find(".cart_num_input").val(),
								thisPrice = $(".cart_thcheck:checked").eq(i).parents("tr").attr("shopOnePrice");
								buyShop = {
									shopId : thisId,
									shopName : thisName,
									shopNum : thisNum,
									shopPrice : thisPrice
								};
								buyShopArr.push(buyShop);
						}
						shopInfo.push(buyShopArr);
						//写入cookie
						$.cookie(userName,shopInfo,{expire : 30,path : "/"});*/
//					}
				});
							
				getShopNum();
				//取消不可点击状态
				$.each($(".cart_num_input"), function(index,element) {
					if($(this).val() != 1){
						$(this).siblings(".cart_num_reduce").removeClass("disable");
					}else{
						$(this).siblings(".cart_num_reduce").addClass("disable").attr("disabled","disabled");
					}
					
					//商品数量的修改
					//商品增加
					$(".cart_num_add").eq(index).on("click",function(){
						//改变样式
						$(this).siblings("input").val(parseInt($(this).siblings("input").val())+1);
						//改变cookie
						shopInfo[index].shopNum++;
						$(this).siblings(".cart_num_reduce").removeClass("disable").removeAttr("disabled");
						$.cookie(userName,shopInfo,{expire : 30,path : "/"});
						//改变计费
						$(this).parents(".cart_mitem").find(".oneMoney").text(data.info[shopInfo[index].shopId - 1].price * shopInfo[index].shopNum + ".00" );
						calcTotal();
					});
					//商品减少
					$(".cart_num_reduce").eq(index).on("click",function(){
						if($(this).siblings($(".cart_num_input")).val() != 1){
							//改变样式
							$(this).siblings("input").val(parseInt($(this).siblings("input").val())-1);
							//改变cookie
							shopInfo[index].shopNum--;
							if($(this).siblings(".cart_num_input").val() == 1){
								$(this).addClass("disable").attr("disabled");
							}else{
								$(this).removeClass("disable").removeAttr("disabled");
							}
							$.cookie(userName,shopInfo,{expire : 30,path : "/"});
							//改变计费
							$(this).parents(".cart_mitem").find(".oneMoney").text(data.info[shopInfo[index].shopId - 1].price * shopInfo[index].shopNum + ".00" );
							calcTotal();
						}else{
							alert("请直接删除商品");
						}
					});
					
					//商品的单个删除
					$(".delete").eq(index).on("click",function(){
						if(!confirm("确认要删除？")){
							window.event.returnValue = false;
						}else{
							//删除样式
							$(this).parents(".cart_mitem ").remove();
							//删除cookie
							shopInfo.splice(index,1)
							$.cookie(userName,shopInfo,{expire : 30,path : "/"});
							//更新计算消费值
							calcTotal();
							//更新支付的点击样式
							payStyle();
							//更新商品个数显示
							getShopNum();
						}
					});
					
					//全选功能
					$("#s_all_h").on("click",function(){
						$(".cart_thcheck").prop("checked", $(this).prop("checked"));
						$("#s_all_f").prop("checked", $(this).prop("checked"));
						//更新计算消费值
						calcTotal();
						//更新支付的点击样式
						payStyle();
					});
					$("#s_all_f").on("click",function(){
						$(".cart_thcheck").prop("checked", $(this).prop("checked"));
						$("#s_all_h").prop("checked", $(this).prop("checked"));
						//更新计算消费值
						calcTotal();
						//更新支付的点击样式
						payStyle();
					});
					
					//单选功能
					$(".cart_thcheck").on("click",function(){
						//判断是否全部选中
						if($(".cart_thcheck").length === $(".cart_thcheck:checked").length){
							$("#s_all_h,#s_all_f").prop("checked", $(this).prop("checked"));
						}else{
							$("#s_all_h,#s_all_f").prop("checked", false);
						}
						//更新计算消费值
						calcTotal();
						//更新支付的点击样式
						payStyle();
					});
					
				});
				
				//填写相关信息
			},
			error : function(xhr){
				console.log("数据获取失败");
			}
		});
	}else{
		alert("购物车为空，跳转到商品页面");
		window.location.href = "shopList.html";
	}
	//商品的全部删除
	$("#cartRemoveChecked").on("click",function(){
		if(!confirm("确认要删除？")){
			window.event.returnValue = false;
		}else{
			var k = 0;
			//删除cookie
			$(".cart_thcheck:checked").each(function(index,element){
				var num = $(".cart_thcheck:checked").eq(index).parents(".cart_mitem ").attr("shopNum");
				if($(".cart_thcheck:checked").length === $(".cart_mitem ").length){	//全部删除
					shopInfo = [];
				}else if(k === 0){
					shopInfo.splice(num,1);
					num -= 1; 
					k++;
				}else{
					num -= 1;
					shopInfo.splice(num,1);
				}
			})
			$.cookie($("#userName").text(),shopInfo,{expire : 30,path : "/"});
			//删除样式
			$(".cart_thcheck:checked").parents(".cart_mitem ").remove();
			//更新计算消费值
			calcTotal();
			//更新支付的点击样式
			payStyle();
			//更新商品个数显示
			getShopNum();
		}
	});
	//封装计算总金额的函数
	function calcTotal(){
		var total = 0;
		$(".cart_thcheck:checked").parents(".cart_mitem ").find(".oneMoney").each(function(index, element){
			total += parseFloat($(this).text());
		});
		// 显示合计金额
		$(".goodsSum").text("￥" + total + ".00");
	}
	//封装改变结算样式的方法
	function payStyle(){
		//选中可以去结算
		if($(".cart_thcheck:checked").length >= 1){
			$(".cart_paybtn").removeClass("cart_paybtn_disable");
		}else{
			$(".cart_paybtn").addClass("cart_paybtn_disable");
		}
	}
	//封装计算全部商品的个数的方法
	function getShopNum(){
		//改变导航栏信息
		$("#allShopNum").text("(" + $(".cart_thcheck").length +  ")");
	}
	
})
