$(function(){
	//点击输入密码的时候显示再次输入密码
	$("#passWord").on("focus",function(){
		$(".regForm .last").show();
	});
	
	/*各项验证开始*/
	
	//手机号码验证
	$("#phone").on("blur",function(){
		checkPhone();
	});
	
	//用户昵称的验证
	$("#nickName").on("blur",function(){
		checkNickName();
	});
	
	//用户密码设定--blur
	$("#passWord").on("blur",function(){
		checkPad();
	});
	
	//用户密码设定--keyup
	$("#passWord").on("keyup",function(){
		padLevel();
	});
	
	//用户密码的重复输入
	$("#rePassWord").on("blur",function(){
		rePsd();
	});
	
	//点击立即注册判断信息完整
	$("#register").on("click",function(e){
		checkInfo();
		if($(".dxyzm").val() === reg){
			var user = {
				"id" : $("#nickName").val(),
				"address" : []
			}
			
			//将用户信息保存到cookie中
			$.cookie.json = true; // cookie中存储的 value 值是对象
			// 先从 cookie 中读取数组
			$.cookie("user",user, {expires:7, path:"/"});
			location = "../index.html";
		}else{
			$(".yamText").show().css("color","red").text("亲，验证码有误，请重新输入！");
			$(".yzm").find(".checkList").removeClass("ok").addClass("error");
		}
	});
	
	//验证参数
	var 
		isCheckPhone = false,
		isCheckNickName = false,
		isCheckPsd = false,
		isReCheckPsd = false,
		isRead = true,
		spPsd = false,//用于查看特殊的密码控制（是否显示验证码选项控制按钮）
		showReg = false;	//判断是否展开显示验证
		
	//判断是否该显示验证码
	$("#phone,#nickName,#passWord,#rePassWord").on("focus",function(){
		getNum();
		if(showReg){
			$(".yzm").show();
		}
	});
		
		
	//判断是否勾选统一美丽说注册条约s
	$("#readBox").on("click",function(){
		isRead = !isRead;
		if(isRead === false){
			$("#readBox").parent().children(".waring-info").show();
		}else{
			$("#readBox").parent().children(".waring-info").hide();
		}
	});
	
	
	
	//封装检查手机号码的函数
	function checkPhone(){
		//设置默认参数
		isCheckPhone = false;
		//对手机号进行正则运算
		regPhone = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/,	//验证密码
		phoneNum = $("#phone").val();
		//如果没有填写号码
		if($("#phone").val() === ""){
			//提示信息
			$("#phone").parent().children(".waring-info").show().text("你还没有填写手机号哦。");
			//提示图片
			$("#phone").parent().children(".checkList").show().removeClass("ok").addClass("error");
		}else if(!phoneNum.match(regPhone)){		//如果号码有误
			//提示信息
			$("#phone").parent().children(".waring-info").show().text("手机号码格式有误，请重新输入！");
			//提示图片
			$("#phone").parent().children(".checkList").show().removeClass("ok").addClass("error");
		}else{	//正确的情况
			//隐藏错误提示文字
			$("#phone").parent().children(".waring-info").hide();
			//添加正确的图片
			$("#phone").parent().children(".checkList").show().removeClass("error").addClass("ok");
			//成功改变参数
			isCheckPhone = true;
		}
	}
	
	//封装用户昵称验证的函数
	function checkNickName(){
		//设置默认参数
		isCheckNickName = false;
		regNickName = /^[0-9a-zA-Z\u4e00-\u9fa5_]{2,16}$/ig,//验证用户昵称
		nickName = $("#nickName").val();//获取用户昵称的值
		//如果没有填写昵称
		if($("#nickName").val() === ""){
			//提示信息
			$("#nickName").parent().children(".waring-info").show().text("你还没有填写昵称哦。");
			//提示图片
			$("#nickName").parent().children(".checkList").show().removeClass("ok").addClass("error");
		}else if(!nickName.match(regNickName)){		//如果号码有误
			//提示信息
			$("#nickName").parent().children(".waring-info").show().text("用户昵称不合法,请重新输入!");
			//提示图片
			$("#nickName").parent().children(".checkList").show().removeClass("ok").addClass("error");
		}else{	//正确的情况
			//隐藏错误提示文字
			$("#nickName").parent().children(".waring-info").hide();
			//添加正确的图片
			$("#nickName").parent().children(".checkList").show().removeClass("error").addClass("ok");
			//成功改变参数
			isCheckNickName = true;
		}
	}
	
	//封装用户密码验证的函数---blur
	function checkPad(){
		spPsd = false;
		var 
		
			//设置默认参数
			isReCheckPsd = false,
			//基本密码要求
			enoughPsd = new RegExp("(?=.{6,16}).*", "g"),
			 //密码为六位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
			mediumPsd = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"),
			//密码为八位及以上并且字母数字特殊字符三项都包括
			strongPsd= new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
			if($("#passWord").val() === ""){
				//提示信息
				$("#passWord").parent().children(".waring-info").show().text("你还没有填写密码哦。");
				//提示图片
				$("#passWord").parent().children(".checkList").show().removeClass("error").addClass("error");
				//消失显示安全强度
				$(".pas-level").hide();
				spPsd = true;
			}else if (false == enoughPsd.test($("#passWord").val())) {	//不满足基本要求的密码
				//提示信息
				$("#passWord").parent().children(".waring-info").show().text("输入密码需在6位到32位间。");
				//提示图片
				$("#passWord").parent().children(".checkList").show().removeClass("ok").addClass("error");
				//消失显示安全强度
				$(".pas-level").hide();
			}else{	//	满足要求
			  	//成功改变参数
				isCheckPsd = true;
				spPsd = true;
			}
	}
	
	//封装用户密码强度判断
	function padLevel(){
		//设置默认参数
		isCheckPsd = false;

		if($("#passWord").val().length >= 5){
			//成功改变参数
			isCheckPsd = true;
			spPsd = true;
			//消失显示文字提示信息
			$(".waring-info").hide();
			//基本密码要求
			enoughPsd = new RegExp("(?=.{6,16}).*", "g");
			 //密码为六位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
			mediumPsd = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"),
			//密码为八位及以上并且字母数字特殊字符三项都包括
			strongPsd= new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
			if (strongPsd.test($("#passWord").val())) {	//密码强度为强	
		     	//消失不符合的提示
		     	$("#passWord").parent().children(".waring-info").hide();
		     	//提示图片
				$("#passWord").parent().children(".checkList").show().removeClass("error").addClass("ok");
				//将强度提示显示出来
		     	$("#passWord").parent().children(".pas-level").show();
		     	//根据不同的强度标记颜色
		     	$(".level span").addClass("levelSpanCole");
		    }else if (mediumPsd.test($("#passWord").val())) {	//密码强度为中等
		     	//消失不符合的提示
		     	$("#passWord").parent().children(".waring-info").hide();
		     	//提示图片
				$("#passWord").parent().children(".checkList").show().removeClass("error").addClass("ok");
				//将强度提示显示出来
		     	$("#passWord").parent().children(".pas-level").show();
		     	//根据不同的强度标记颜色
		     	$(".level span").addClass("levelSpanCole");
		     	$(".level span:last-child").removeClass("levelSpanCole");
		    }else {		
		    	//密码强度为弱
		     	//消失不符合的提示
		     	$("#passWord").parent().children(".waring-info").hide();
		     	//提示图片
				$("#passWord").parent().children(".checkList").show().removeClass("error").addClass("ok");
				//将强度提示显示出来
		     	$("#passWord").parent().children(".pas-level").show();
		     	//根据不同的强度标记颜色
		     	$(".level span").removeClass("levelSpanCole");
		     	$(".level span:first-child").addClass("levelSpanCole");
		    }
		     return true;
		}else{	//密码小于6位数的时候消失强度提示
			$(".pas-level").hide();
		}
	}
	
	//封装两次密码比较的函数
	function rePsd(){
		//设置默认参数
		isReCheckPsd = false;
		if($("#rePassWord").val() === ""){
			//提示信息
			$("#rePassWord").parent().children(".waring-info").show().text("你还没有填写确认密码哦。");
			//提示图片
			$("#rePassWord").parent().children(".checkList").show().removeClass("ok").addClass("error");
		}else if($("#rePassWord").val() !== $("#passWord").val()){	//两次密码不一致
			//提示信息
			$("#rePassWord").parent().children(".waring-info").show().text("两次密码输入不一致，请重新输入。");
			//提示图片
			$("#rePassWord").parent().children(".checkList").show().removeClass("ok").addClass("error");
		}else{	//两次密码一致
			//成功改变参数
			isReCheckPsd = true;
			//提示信息
			$("#rePassWord").parent().children(".waring-info").hide();
			//提示图片
			$("#rePassWord").parent().children(".checkList").show().removeClass("error").addClass("ok");
		}
	}
	//判断达到要求的信息个数
	function getNum(){
		if(
			(isCheckPhone && isCheckNickName && spPsd) ||
			(isCheckPhone && isCheckNickName && isReCheckPsd) ||
			(isCheckPhone && spPsd && isReCheckPsd)
		){
			showReg = true;
		}else{
			showReg = false;
		}
	}
	
//	isCheckPhone  isCheckNickName  isCheckPsd  isReCheckPsd
	//封装判断是否可以注册的信息判断函数
	function checkInfo(){
		if(isCheckNickName && isReCheckPsd && isCheckPsd && isCheckPhone){
			$(".yzm").show();
		}
		//依次验证各项信息是否满足
		if(isCheckPhone === false){
			$("#phone").parent().children(".waring-info").show();
		}else if(isCheckNickName === false){
			$("#nickName").parent().children(".waring-info").show();
		}else if(isCheckPsd === false){
			$("#passWord").parent().children(".waring-info").show();
		}else if(isReCheckPsd === false){
			$("#rePassWord").parent().children(".waring-info").show();
		}else if(isRead === false){	//没有满足美丽说条约
//			$("#readBox").parent().children(".waring-info").show();
			alert("请先勾选同意美丽说条款！");
		}else{	//满足各项条件显示验证码
			//满足条件写入cookie
			if($(".dxyzm").val() === reg){
				var user = {
					"id" : $("#nickName").val()
				}
				
				//将用户信息保存到cookie中
				$.cookie.json = true; // cookie中存储的 value 值是对象
				$.cookie("user",user, {expires:7, path:"/"});
				location = "../index.html";
			}else{
				$(".yamText").show().css("color","red").text("亲，验证码有误，请重新输入！");
				$(".yzm").find(".checkList").removeClass("ok").addClass("error");
			}
		}
	}
	//设置遮罩层高度
	window.onload = function(){
		$("#zzc").css("height",$(document).height());
	}
	
	//获取验证码按钮点击
	$(".getYzm").on("click",function(){
		//弹出图片测试
		$("#yzmPic").show();
		$("#zzc").show();
		getPic();
	});
		
	//关闭验证码图片按钮
	$(".yzmPicX").on("click",function(){
		$("#yzmPic").hide();
		$("#zzc").hide();
	});
	//换一组
	$("#changePic").on("click",function(){
		getPic();
	});
	
	var 
		aArr = [["picCheck01","180"],["picCheck02","90"],["picCheck03","270"],["picCheck04","90"],["picCheck05","90"],["picCheck06","270"],["picCheck07","90"],["picCheck08","270"],["picCheck09","90"],["picCheck10","270"],["picCheck11","270"],["picCheck12","90"]];
	
	
	//封装验证码图片问题
	function getPic(){
		
			//过滤不重复的数字
			var aNum = [];
			for(var i = 0; i < 12;i++){	//一个从0到11的数组
			    aNum.push(i);
			}
			aNum.sort(function(){//随机打乱这个数组
			  	return Math.random()-0.5;
			})
			for(var i = 0;i < 4;i++){
				$(".picCheck img").eq(i).attr("src","../img/register/" + aArr[aNum[i]][0] + ".jpg");
				$(".picCheck img").eq(i).attr({"index":aNum[i],"status":aArr[aNum[i]][1]});
			}
	}
	
	//照片的点击事件
	var stratNum = 0;
	$(".picCheck img").on("click",function(){
		//旋转图片
		if(aArr[parseInt($(this).attr("index"))][1] === "180"){
			$(this).css("transform","rotate(" + (parseInt($(this).attr("status")) - 90) + "deg)");
		}else if(aArr[parseInt($(this).attr("index"))][1] === "90"){
			$(this).css("transform","rotate(" + (parseInt($(this).attr("status"))) + "deg)");
		}else{
			$(this).css("transform","rotate(" + (parseInt($(this).attr("status")) - 180)+ "deg)");
		}
		$(this).attr("status",parseInt($(this).attr("status")) + 90);
	

		var deg = parseInt($(this).attr("status")) ;
		var num = parseInt($(this).attr("index"));
		
		if(deg  % 360 === 0){
			$(this).attr("btn",true);
		}else{
			$(this).attr("btn",false);
		}
	});
	//判断图片验证码是否正确
	var btnNum = 0;
	$("#sub").on("click",function(){
		if($(".picCheck img").eq(0).attr("btn") === "true" &&  $(".picCheck img").eq(1).attr("btn") === "true" && $(".picCheck img").eq(2).attr("btn") === "true" && $(".picCheck img").eq(3).attr("btn") === "true")
		{
			//关闭窗口
			$("#yzmPic").hide();
			$("#zzc").hide();
			//开启倒计时,发送验证码
			reGetReg();
			//设置为不可点击
			$(".getYzm").css("cursor","auto");
		}else{
			//显示提示
			$("#yzmPic").find(".waring-pic").show();
			//刷新图片
			getPic();
		}
	});
	
	
	
	
	//封装发送验证码函数
	function getCheckNum(){
		var 
			aArr = [0,1,2,3,4,5,6,7,8,9],
			sStr = "";
			for(var i = 0;i < 6;i++){
				var	iRandom = Math.floor(Math.random() * 10);
				sStr += aArr[iRandom];
			}
			sNewStr = "【锦超科技】您在锦超科技请求的验证码是：" + sStr + "，有效时间为1分钟，请不要告诉他人。";
			sNewStr = encodeURIComponent(sNewStr);
		$.ajax({
				type : "get",
				url : "这是你的api接口地址",
				headers : {apikey : "输入你的apikey"},
				dataType : "json",
				success : function(data){
					
				},
				error : function(xhr){
					console.log(xhr);
				}
		});
		return sStr;
	}
	
	//封装重新发送验证码函数
	function reGetReg(){
		//获取验证码
		reg = getCheckNum();
		//显示验证码有效时间,重新发送不可点击
		var time = 60;
		$(".getYzm").val("重新发送(" + time +")");
		$(".getYzm").attr("disabled","disabled").css("color","grey");
		var oTimer = setInterval(function(){
			$(".getYzm").val("重新发送(" + time +")");
			//倒计时
			if(time === 0){
				$(".getYzm").attr("disabled",false).css("color","#666666");
				$(".getYzm").val("获取短信验证码");
				//设置为可以点击
				time = 60;
				//验证码失效
				reg = Math.random();
				clearInterval(oTimer);
			}else{
				time--;
			}
		},1000);
		console.log(reg);
	}
	
})
