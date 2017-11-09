window.onload=function(){
	var projectObject=[
		{
			"link":"https://luuman.github.io/FrontEndGuide/V1/index.html#page_9",
			"linkName":"前端导航"
		},
		{
			"link":"http://www.haorooms.com/nav",
			"linkName":"前端技术导航"
		},
		{
			"link":"http://www.alloyteam.com/nav/",
			"linkName":"腾讯前端技术导航"
		},
		{
			"link":"https://docs.pfan123.com/",
			"linkName":"前端导航平台"
		},
		{
			"link":"https://segmentfault.com/a/1190000010686636",
			"linkName":"前端学习资源"
		},
		{
			"link":"https://segmentfault.com/a/1190000003510001",
			"linkName":"github资源收集"
		}
	];
	
	new Vue({
		el:'#resourceUl',
		data:{
			items:projectObject
		}
	});
}
