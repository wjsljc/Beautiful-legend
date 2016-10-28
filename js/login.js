$(function(){
	//用户昵称的验证
	$("#nickName").on("blur",function(){
		checkNickName();
	});
	
	//用户密码设定--blur
	$("#passWord").on("blur",function(){
		checkPad();
	});
	
	
	//设置图片验证数组
		var 
			aArr = [["picCheck01","180"],["picCheck02","90"],["picCheck03","270"],["picCheck04","90"],["picCheck05","90"],["picCheck06","270"],["picCheck07","90"],["picCheck08","270"],["picCheck09","90"],["picCheck10","270"],["picCheck11","270"],["picCheck12","90"]];
	
	//先执行一次，把带有数据的照片放进页面
	getPic();
	//封装验证码图片问题
	function getPic(){
		
			//过滤不重复的数字
			var aNum = [];
			for(var i = 0; i < 12;i++){	//一个从0到11的数组
			    aNum.push(i);
			}
			aNum.sort(function(){//随机打乱这个数组
			  	return Math.random()-0.5;
			});
			for(var i = 0;i < 4;i++){
				$(".picCheck img").eq(i).attr("src","../img/register/" + aArr[aNum[i]][0] + ".jpg");
				$(".picCheck img").eq(i).attr({"index":aNum[i],"status":aArr[aNum[i]][1]});
			}
	}
	
	//换一组
	$("#changePic").on("click",function(){
		getPic();
	});	
	
	
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
	
	
	//登录点击判断
	$("#login").on("click",function(){
		//判断和验证码是否正确
		if($(".picCheck img").eq(0).attr("btn") === "true" &&  $(".picCheck img").eq(1).attr("btn") === "true" && $(".picCheck img").eq(2).attr("btn") === "true" && $(".picCheck img").eq(3).attr("btn") === "true")
		{			//如果验证码正确则开始判断账号和密码
			//模拟获取后台数据进行验证
			$.get(
//				"/api/user",
				"../mock/user.json",
				function(data){
					//遍历数组对象，获取相应的值
					for(var i = 0,len = data.length;i < len;i++){
						//验证账号密码是否正确
						if((($("#nickName").val() === data[i].data.phone) || ($("#nickName").val() === data[i].data.nickname)) && ($("#passWord").val() === data[i].data.password)){
								var user = {
									"id" : data[i].data.nickname,
									"address" : []
								}
								//将用户信息保存到cookie中
								$.cookie.json = true; // cookie中存储的 value 值是对象
								// 先从 cookie 中读取数组
								$.cookie("user",user, {expires:7, path:"/"});
								history.back();
								break;
						}else{
							//遍历到最后一个都还没有匹配的就显示错误
							if(i === len - 1){
								$(".yzmPic-main").find(".waring-pic").show().css("display","block").text("账号或密码错误!");
								//刷新验证码
								getPic();
							}
						}
					}
				}
			);
		}else{
			//显示提示
			$(".yzmPic-main").find(".waring-pic").show().css("display","block");
			//刷新验证码
			getPic();
		}
	});
	
	
	
	//封装用户昵称验证的函数
	function checkNickName(){
		//设置默认参数
		isCheckNickName = false;
		regNickName = /^[0-9a-zA-Z\u4e00-\u9fa5_]{2,16}$/ig,//验证用户昵称
		nickName = $("#nickName").val();//获取用户昵称的值
		//如果没有填写昵称
		if($("#nickName").val() === ""){
			//提示信息
			$("#nickName").parent().children(".waring-info").show().text("请输入您的用户名或注册邮箱	");
			//提示图片
			$("#nickName").parent().children(".checkList").show().removeClass("ok").addClass("error");
		}else{	//正确的情况
			//隐藏错误提示文字
			$("#nickName").parent().children(".waring-info").hide();
			//添加正确的图片
			$("#nickName").parent().children(".checkList").hide();
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
			enoughPsd = new RegExp("(?=.{6,16}).*", "g");
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
				$("#passWord").parent().children(".waring-info").hide();
				$("#passWord").parent().children(".checkList").hide();
			}
	}
	
	
	
	
})


