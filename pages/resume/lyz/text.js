$(function(){
	
//	变量区
	var $body=$(".mobile-body"),
		$foot1=$(".mobile-foot .foot1"),
		$foot2=$(".mobile-foot .foot2"),
		$btnbox=$(".btn-box"),
		$btnbox1=$(".btn-box1"),
		$btnbox2=$(".btn-box2"),
		btn=0,
		body=document.getElementsByClassName("mobile-body")[0];
		
	var pr=Promise.resolve(),
		authors=[{
			ids: 0,
			content: ['很高兴遇见你'],
			toUser: [['我也是',11],['有多高兴？',12]]
		}, {
			ids: 11,
			content: ['你想知道点什么？'],
			toUser: [['基本信息',21],['专业技能',23],['工作经历/经验',22],['项目经验',25]]
		}, {
			ids: 12,
			content: ['......','你想知道点什么？'],
			toUser: [['基本信息',21],['专业技能',23],['工作经历/经验',22],['项目经验',25]]
		},{
			ids: 21,
			content: ['我叫李银政，出生于1993年2月，湖北武汉人','本科毕业于武汉理工大学材料科学与工程学院','联系电话为18771017283<br />邮箱是446784359@qq.com'],
			toUser: 0
		},{
			ids: 22,
			content: ['2016年10月至今在天天网从事前端工作','所执行的任务大体上分为3块','1、日常促销活动页切图，根据设计图完成PC、app、wap的页面制作，包括js以及css动画。同时制作模版增加工作效率。参见<br /><a href="https://liyinzheng.github.io/tian/moban/index.html">工作模版(PC端)</a>','2、参加过公司双十一与双十二大促，有抗压能力。','3、商城页面样式调整，及购物车等页面的前端部分的重制。','4、按需求制作特效页面，以及小游戏的前端部分。'],
			toUser: 0
		},{
			ids: 23,
			content: ['熟练使用HTML5、CSS3，页面结构和布局（DIV+CSS布局，Flex布局等），熟练使用PS，根据设计图完成PC端、IOS/Android的H5页面以及移动端wap页面的开发。','熟练使用JavaScript，框架和类库如Jquery，Bootstrap','熟悉CSS预处理语言Less','熟悉Ajax、DOM、JSON和 事件处理机制','了解MVVM模型，vue2.0，ES6语法标准，JS模块化开发','了解PHP及laravel框架和Mysql','会使用开发中常用的工具: webpack,NPM'],
			toUser: 0
		},{
			ids: 24,
			content: ['谢谢喜欢','主页的创意参考于之前看过的一个页面','<a href="http://zhangwenli.com/" target="_blank">http://zhangwenli.com/</a> ','我觉得很有趣，就用来作一个简历模板'],
			toUser: 0
		}, {
			ids: 25,
			content: ['(1)<b>仿聊天界面式电子简历</b><br /><b>项目描述：</b>仿照网络聊天的形式，对用户展示信息，起到了展示自己的作用。项目难点在于每条信息弹出之间存在的时间间隔，使用到了es6语法中的promise对象，实现在不使用回调的情况下的异步操作。<br /><a href="https://liyinzheng.github.io/pages/resume/lyz/text.html">电子简历</a><br />','(2)<b>红包雨小游戏</b><br /><b>项目描述：</b>为天天网运营过程中的促销活动页面，用于发放优惠券等。项目难点在于移动端的适配处理，PC端的对低版本IE的兼容性，动画的流畅性，图片预加载等技术。<br /><a href="https://liyinzheng.github.io/tian/hby/pc/hb.html">红包雨小游戏PC版</a><br /><a href="https://liyinzheng.github.io/tian/hby/mobile/hb.html">红包雨小游戏移动版</a>','(3)<b>仿微信聊天页面</b><br /><b>项目描述：</b>为天天网运营过程中的促销活动页面，用于在微信用户及朋友圈中起到宣传作用。项目使用到了微信分享的API，可自定义分享的信息。<br /><a href="https://liyinzheng.github.io/tian/wx/wxhb.html">微信页面</a>'],
			toUser: 0
		}, ],
		
		users=[{
			ids: 11,
			content: ['我也是'],
			toAuthor: 11
		},{
			ids: 12,
			content: ['有多高兴？'],
			toAuthor: 12
		},{
			ids: 21,
			content: ['基本信息'],
			toAuthor: 21
		},{
			ids: 22,
			content: ['工作经历/经验'],
			toAuthor: 22
		},{
			ids: 23,
			content: ['专业技能'],
			toAuthor: 23
		},{
			ids: 24,
			content: ['这个主页好有意思啊！'],
			toAuthor: 24
		},{
			ids: 25,
			content: ['项目经验'],
			toAuthor: 25
		}]
		
		;
		
//	函数区
	function delay(n) {
			return new Promise(function(t) {
				setTimeout(t, n)
			})
		}
	
	function findbyids(l,x){
		var temp;
		if(l=='authors'){
			authors.forEach(function(value){
				if(x==value.ids) temp=value
			})
		}
		
		else if(l=='users'){
			users.forEach(function(value){
				if(x==value.ids) temp=value
			})
		}
		
		return temp
	}
	
	
	function getauthors(x){
		var l=x.content.length, to=x.toUser;
		writing()
		x.content.forEach(function(msg, index){
			pr=pr.then(function(){
				return delay(1000)
			}).then(function(){
					if(index==l-1) appendmessages(msg,'author',to); 
					else appendmessages(msg,'author',null)
			})
		})
	}
	
	
	
	function appendmessages(x,xf,to){
		if(xf=='author'){
			$body.append('<div class="msg-box"><div class="msg msg-left"><div class="msg-back msg-back-left"></div><p>'+x+'</p></div></div>')
			
			if(to!=null) {
				if(to!=0) {
					pr=pr.then(function(){
						return delay(1000)
					}).then(function(){
						saysomething()
						$btnbox2.empty()
						to.forEach(function(value){
							var $tm=$('<p>'+value[0]+'</p>')
							$btnbox2.append($tm)
							$tm.on('click',function(){
								sayusers(value[1])
								change()
							}) 
							
						})
					})
				}
				else saysomething()
			}
			
		} 
		else if(xf=='user') {
			$body.append('<div class="msg-box"><div class="msg msg-right"><div class="msg-back msg-back-right"></div><p>'+x+'</p></div></div>')
			
			pr=pr.then(function(){
				getauthors(findbyids('authors',to))
			})
		}
		body.scrollTop = body.scrollHeight;
	}
	
	function sayusers(ids){
		appendmessages( findbyids('users',ids).content, 'user', findbyids('users',ids).toAuthor)
	}
	
	function saysomething(){
		$foot1.show()
		$foot2.hide()
	}
	
	function writing(){
		$foot2.show()
		$foot1.hide()
	}
	
	function change(){
		if(btn==0){
			$btnbox1.show()
			$btnbox2.slideDown()
			btn=1
		}
		else{
			$btnbox1.hide()
			$btnbox2.slideUp()
			btn=0
		}
	}
	
//	事件区
	
	$foot1.click(change)
	
	$btnbox1.click(change)
	
	
//	执行区
	
	getauthors(authors[0])
	
	
})




