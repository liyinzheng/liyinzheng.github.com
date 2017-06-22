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
			toUser: [['基本信息',21],['工作经历/经验',22],['专业技能',23],['关于',24]]
		}, {
			ids: 12,
			content: ['......','你想知道点什么？'],
			toUser: [['基本信息',21],['工作经历/经验',22],['专业技能',23],['关于',24]]
		},{
			ids: 21,
			content: ['基本信息s1','基本信息s2','基本信息s3'],
			toUser: 0
		},{
			ids: 22,
			content: ['工作经历/经验s1','工作经历/经验s2','工作经历/经验s3'],
			toUser: 0
		},{
			ids: 23,
			content: ['专业技能s1','专业技能s2','专业技能s3'],
			toUser: 0
		},{
			ids: 24,
			content: ['关于s1','关于s2','关于s3'],
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
			content: ['关于'],
			toAuthor: 24
		},]
		
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




