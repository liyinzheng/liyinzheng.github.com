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
		contents=[{
			ids: 0,
			content: ['user1'],
			from: 'user',
			to: 1
		}, {
			ids: 1,
			content: ['author11','author12','author13','author14'],
			from: 'author',
			to: null
		}, {
			ids: 2,
			content: ['user2'],
			from: 'user',
			to: 3
		},{
			ids: 3,
			content: ['author21','author22','author23'],
			from: 'author',
			to: null
		},{
			ids: 4,
			content: ['user3'],
			from: 'user',
			to: 5
		},{
			ids: 5,
			content: ['author31','author32'],
			from: 'author',
			to: null
		}, ];
		
//	函数区
	function delay(n) {
			return new Promise(function(t) {
				setTimeout(t, n)
			})
		}
	
	function change(){
		if(btn==0){
			$btnbox.show()
			$btnbox2.slideDown()
			btn=1
		}
		else{
			$btnbox2.slideUp(function(){
				$btnbox.hide()
			})
			btn=0
		}
	}
	
	
	function getmessage(x){
		var xf=x.from,xt=x.to,   l=x.content.length;
		writing()
		x.content.forEach(function(msg, index){
			pr=pr.then(function(){
				return delay(1000)
			}).then(function(){
					if(xf=='author'&&index==l-1) appendmessages(msg,xf,xt,1); 
					else appendmessages(msg,xf,xt,0)
			})
		})
		
	}
	
	function appendmessages(x,xf,xt,num){
		if(xf=='author') $body.append('<div class="msg-box"><div class="msg msg-left">'+x+'</div></div>') 
		else $body.append('<div class="msg-box"><div class="msg msg-right">'+x+'</div></div>') 
		body.scrollTop = body.scrollHeight;
		if(xt!=null) getmessage(contents[xt])
		if(num==1)  pr=pr.then(function(){
			return delay(1000)
		}).then(function(){
			return saysomething()
		})
	}
	
	
	function sayhello(){
		pr=pr.then(function(){
				return delay(500)
			}).then(function(){
				$body.append('<div class="msg-box"><div class="msg msg-left">Hello world!</div></div>')
			})
	}
	
	function saysomething(){
		$foot1.show()
		$foot2.hide()
	}
	
	function writing(){
		$foot2.show()
		$foot1.hide()
	}
	
//	事件区
	$(".btn1").click(function(){
		getmessage(contents[0])
		change()
	})
	
	$(".btn2").click(function(){
		getmessage(contents[2])
		change()
	})
	
	$(".btn3").click(function(){
		getmessage(contents[4])
		change()
	})
	
	$foot1.click(change)
	
	$btnbox1.click(change)
	
	
	
//	执行区
	saysomething()
	sayhello()
	
	
	
})




