	import { RemoveBook } from "./removeBook.js";
	//卧槽,var行,let不行,let定义的变量无法通过window.变量名获取
	var currentPage = 1;//当前页
	var totalPage = 0;//总页数数
	//初始化请求
	function initReuqest() {
		axios.get(`http://127.0.0.1:8080/currentPage?current=${window.currentPage}`).then(function (res) {
			// console.log("发送请求");
			makeUpData(res);
			updateGui()
		});
	}
	//输入跳转对应页
	function enterCompletable() {
		let element = document.getElementsByClassName("goto_page pageFont")[0]
		console.log("current page:"+window.currentPage);
		console.log("total page:"+window.totalPage);
		const regix = /\d+/;
		if(element.value == "") {
			//等于空就可以跳转分页
			return;
		}
		if(regix.test(element.value) ) {
			window.currentPage = element.value;
			console.log("current page:"+window.currentPage);
			console.log("total page:"+window.totalPage);
			if( window.totalPage >= window.currentPage >= 1) {
				axios.get(`http://127.0.0.1:8080/currentPage?current=${window.currentPage}`).then(function (res) {
					// console.log("发送请求");
					removeChildren();
					makeUpData(res);
					updateGui()
				})	
			}
			else {
				confirm("输入的数字不在范围");
			}
		}
		else {
			confirm("你的输入有误,请输入整数,或者不在范围内");
		}
	}
	//处理请求数据
	function makeUpData(res) {
		//但是这有个bug 切换分页会再创建tr,td元素
		let data = res.data//获取到数组
		//document.getElementById()
		// console.log(JSON.stringify(data.data));
		// console.log("数据:"+data.data);
		
		
		let currentPageData = data.data.currentPage;
		window.totalPage = data.data.totalPage;

		// 遍历创建和赋值
		// #bookSysSeeImpl > div.bookSysSeeIndex > table > tbody:nth-child(2) selector
		let tbodyEl = document.querySelectorAll("#bookSysSeeImpl > div.bookSysSeeIndex > table > tbody:nth-child(2)")[0];
		// console.log("进来");
		for(let i = 0;i<10;i++) {
			let tr = document.createElement("tr");
			tr.className = `tr_${i}`
			for(let j = 0;j<7;j++) {
				let td = document.createElement("td");
				td.id = `td_${i*7+j}`
				//如果当前行数据为空那就直接添加td,否则添加数据后再添加td
				if(currentPageData[i] != null) {
					if(j == 6) {
						let removeBtn = document.createElement("button");
						removeBtn.textContent = "删除";
						removeBtn.className = "bookDelete";
						removeBtn.onclick = "RemoveBook.removeBook(this)";
						let updateBtn = document.createElement("button");
						updateBtn.textContent = "修改";
						updateBtn.className = "bookEdit";
						td.appendChild(removeBtn);
						td.appendChild(updateBtn);
					}
					switch (j) {
						case 0:
						td.innerHTML = currentPageData[i].id;
						break;
						case 1:
						td.innerHTML = currentPageData[i].bookName;
						break;
						case 2:
						td.innerHTML = currentPageData[i].bookprice;
						break;
						case 3:
						td.innerHTML = currentPageData[i].bookauthor;
						break;					
						case 4:
						td.innerHTML = currentPageData[i].bookamount;
						break;
						case 5:
						td.innerHTML = currentPageData[i].booktype;
						break;
						default:
						break;
					}
				}
				tr.appendChild(td);
			}
			tbodyEl.appendChild(tr);
		}
	}

	// 监听 DOMContentLoaded 事件，当DOM准备就绪时执行
	document.addEventListener('DOMContentLoaded', function() {
		// 更新页面上的元素
		// console.log("加载中");
		// initTrs();
		initReuqest();
		updateGui();
	});
	
	function btnListen() {
		let removeBtn = document.getElementsByClassName("bookDelete")
	}
	
	//清空table 下的子元素
	function removeChildren() {
		let tbodyEl = document.querySelectorAll("#bookSysSeeImpl > div.bookSysSeeIndex > table > tbody:nth-child(2)")[0];
		while (tbodyEl.lastChild) {
		       tbodyEl.removeChild(tbodyEl.lastChild);
		}
	}
	// 更新界面
	function updateGui() {
		console.log("current page:"+window.currentPage);
		console.log("total page:"+window.totalPage);
		let textTotalPage = `总共${window.totalPage}页`;
		let textCurPage = `当前${window.currentPage}页`;
		// 更新页面上的元素
		document.getElementsByClassName("total_pages")[0].innerHTML = textTotalPage;
		document.getElementsByClassName("current_page")[0].innerHTML = textCurPage;
	}
	
	function beforePage() {
		// let bookDeleteElm = document.getElementsByClassName("bookDelete")[0];
		// 发送上一页请求
		window.currentPage = Number(window.currentPage) - 1;//等于0第一页
		console.log("current page:"+window.currentPage);
		console.log("total page:"+window.totalPage);
		if(window.currentPage >= 1) {
			confirm("前一页");
			axios.get(`http://127.0.0.1:8080/currentPage?current=${window.currentPage}`).then((res) => {
				removeChildren();
				makeUpData(res);
				updateGui();
			});
		}
		else {
			confirm("无法跳转");
		}
	}
	
	//发送下一页请求
	function afterPage() {
		// let bookDeleteElm = document.getElementsByClassName("bookDelete")[0];
		window.currentPage = Number(window.currentPage) + 1;//下一页
		console.log("current page:"+window.currentPage);
		console.log("total page:"+window.totalPage);
		if(window.currentPage <= window.totalPage) {
			confirm("后一页");
			axios.get(`http://127.0.0.1:8080/currentPage?current=${window.currentPage}`).then((res) => {
				removeChildren();
				makeUpData(res);
				updateGui();
			});
		}
		else {
			confirm("无法跳转");
		}
	}
		
		
		let bookSys = document.querySelector(".bookSys");
		let bookSysItem = document.querySelector(".bookSysItem");
		let triangleBook = document.querySelector(".triangleBook");
		bookSys.onclick = function (){
			if (bookSysItem.style.display == "none"){
				bookSysItem.style.display = "block";
				triangleBook.innerHTML = "▲";
				}else{
					bookSysItem.style.display = "none";
					triangleBook.innerHTML = "▼";
				}
				
		}
		
		let lendSys = document.querySelector(".lendSys");
		let lendSysItem = document.querySelector(".lendSysItem");
		let triangleLend = document.querySelector(".triangleLend");
		lendSys.onclick = function (){
			if (lendSysItem.style.display == "none"){
				lendSysItem.style.display = "block";
				triangleLend.innerHTML = "▲";
				}else{
					lendSysItem.style.display = "none";
					triangleLend.innerHTML = "▼";
				}
				
		}
		
		let userSys = document.querySelector(".userSys");
		let userSysItem = document.querySelector(".userSysItem");
		let triangleUser = document.querySelector(".triangleUser");
		userSys.onclick = function (){
			if (userSysItem.style.display == "none"){
				userSysItem.style.display = "block";
				triangleUser.innerHTML = "▲";
				}else{
					userSysItem.style.display = "none";
					triangleUser.innerHTML = "▼";
				}
				
		}
		
		//以下代码记得注释回来,需要使用
		document.querySelector('.bookSysSee').addEventListener('click', function() {
		    var rightContent = document.querySelector('.bookSysSeeImpl');
		    if (rightContent.style.display === 'none') {
		        rightContent.style.display = 'block';
		    } else {
		        rightContent.style.display = 'none';
		    }
		});