$(function(){
	//引入fastclick模块消除点透影响
	FastClick.attach(document.body);
	//首页轮播图
	var mySwiper1=new Swiper('.swiper-container-1,.swiper-container-3',{
				direction:'horizontal',
				autoplay:5000,
				speed:500,
				loop:true,
				//分页器
			    pagination: '.swiper-pagination',
			    paginationClickable :true,
	});
	//引导页轮播图
	var mySwiper2=new Swiper('.swiper-container-2',{
				direction:'horizontal',
				autoplay:5000,
				speed:500,
				autoplayStopOnLast:true,
				//分页器
			    pagination: '.swiper-pagination',
			    paginationClickable :true,
	});
	//启动页倒计时
    var time=7;//单位是s
    function hday(){
    	$(".start-page h3 span").html("<b>"+time+"</b>秒");
    	time--;
    }
    hday();
	var stop1=setInterval(hday,1000);
	//社区提问部分
	$(".cy-pose").find(".collect").click(function(){
		$(this).toggleClass("active");
	});
	$(".cy-pose p b").click(function(){
		var i=$(this).parent().parent().parent().index();
		var num=$(".cy-pose p b").eq(i).find("span").html();
		num++;
		$(".cy-pose p b").eq(i).find("span").html(parseInt(num++));
	});
	$(".cy-pose p strong").click(function(){
		var i=$(this).parent().parent().parent().index();
		var num=$(".cy-pose p strong").eq(i).find("span").html();
		num++;
		$(".cy-pose p strong").eq(i).find("span").html(parseInt(num++));
	});
	//风格展示部分
	$(".style-list h2").find("i").click(function(){
		$(this).toggleClass("active");
	});
	//热门分类tab切换部分
	$(".hot-sort .tab-set").find("li").click(function(){
		var i=$(this).index();
		$(".hot-sort .tab-set li").removeClass("active");
		$('.hot-sort .tab').hide();
		$(this).addClass("active");
		$('.hot-sort .tab').eq(i).show();
	});
	
	//购物车部分
	//定义购物车价格变化函数
	function costChange(){
		var a=0;//选择物品的个数
		var num=$(".shop-cart-list a").length;
		var arr=[];
		$.each($(".shop-cart-list a"),function(i,n){
			var b=$(this).parent().index();
			if($(this).hasClass("active")){
				a+=1;
				//购物车单个物品价格
				var cost=$(".shop-cart-list").find(".cost").eq(b).html();
				//购物车单个物品购买个数
				var age=$(".shop-cart-list").find("input").eq(b).val();
				var total=parseFloat(cost)*parseFloat(age);
				arr.push(total);
				//更新购物车总价格
				var ztotal=eval(arr.join('+'));
				$(".shop-check-all").find("#sum").html(ztotal);
			}
		});
		//更新购物车结算的个数
		$(".shop-check-all").find("#number").html(a);
		//更新全选与全不选状态
		if(a==num){
			$(".shop-check-all a span").addClass("active");
			$(".shop-check-all a").find("b").html("全不选");
		}else{
			$(".shop-check-all a span").removeClass("active");
			$(".shop-check-all a").find("b").html("全选");
		}
	}
	//全选和全不选选择
	$(".shop-check-all a").find("span").click(function(){
		var b=$(".shop-cart-list a").length;
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(".shop-cart-list a").removeClass("active");
			$(".shop-check-all a").find("b").html("全选");
			$(".shop-check-all").find("#number").html('0');
			$(".shop-check-all").find("#sum").html('0');
			costChange();
		}else{
			$(this).addClass("active");
			$(".shop-cart-list a").addClass("active");
			$(".shop-check-all a").find("b").html("全不选");
			$(".shop-check-all").find("#number").html(b);
			costChange();
		}
	})
	//更新全选状态
	$(".shop-cart").find(".btn").click(function(){
		$(this).toggleClass("active");
		costChange();
	});
	//购物车单个物品购买个数减一
	$(".shop-cart-list dd span").find("em").click(function(){
		var i=$(this).parent().parent().parent().parent().index();
		var num=$(".shop-cart-list dd span").eq(i).find("input").val();
		num--;
		$(".shop-cart-list dd span").eq(i).find("input").val(parseInt(num--));
	});
	//购物车单个物品购买个数加一
	$(".shop-cart-list dd span").find("strong").click(function(){
		var i=$(this).parent().parent().parent().parent().index();
		var num=$(".shop-cart-list dd span").eq(i).find("input").val();
		num++;
		$(".shop-cart-list dd span").eq(i).find("input").val(parseInt(num++));
	});
	//购物车删除按钮
	$(".shop-check-all").find("#del").click(function(){
		$(".shop-cart").find(".btn").filter(".active").parent().remove();
		$(".shop-check-all").find("#sum").html(0);
		costChange();
		if(!$(".shop-cart").children().hasClass(".shop-cart-list")){
			$(".shop-cart").find("h1").remove();
			$(".shop-cart").prepend("<h1>购物车空空如也，快去挑选物品吧<h1>")
		}
	})
	//购物车结算按钮
	$(".shop-check-all").find("#balance").click(function(){
		var total=$(".shop-check-all").find("#sum").html();
		alert("您总共花费"+total+"元");
		var r=confirm("是否确定本次消费")
		if(r==true){
		    alert("请完成支付操作");
		}else{
		    alert("未完成本次消费");
		}
	})
})





























