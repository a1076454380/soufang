window.onload = function(){
    var preview = document.getElementById('preview');//获取中图可视区元素
    var big = document.getElementById('img-big');//获取大图显示div元素
    var bigImg = big.getElementsByTagName('img')[0];//大图Img元素
    var medium = document.getElementById('img-medium');//中图div元素
    var mediumImg = medium.getElementsByTagName('img')[0];//中图img元素
    var mark = document.getElementById('mark');//遮罩层元素
    var detail = document.getElementById('detail');
    //小图导航
    var imgItems = document.getElementById('img-items');
    var liNodes = imgItems.childNodes;
    var tmpNodes = [];
    //循环只保留li节点
    for(var i=0;i<liNodes.length;i++){
        if(liNodes[i].nodeType == 3) continue;
        tmpNodes.push(liNodes[i]);
    }
    var liNum = tmpNodes.length;//li节点总数
    var liWidth = parseInt(getCurrentStyle(tmpNodes[0])["width"]);//获取每个li的width值
    var liNo1 = tmpNodes[0].getElementsByTagName('img')[0];
        liNo1.style.border= "1px solid #999999";
        liNo1.style.width = "112px";
        liNo1.style.height = "80px";
        imgItems.style.width = liWidth*liNum+'px';
    //循环每个li导航节点绑定鼠标滑过事件
    for(var j=0;j<liNum;j++){
        tmpNodes[j].index = j;
        tmpNodes[j].onmouseover = function(){
            var img = this.getElementsByTagName('img')[0];
            img.style.border = "1px solid #999999";
            img.style.width = "112px";
            var _this = this;
            //判断取消li的兄弟节点的鼠标滑过样式
            for(var k=0;k<liNum;k++){
                if(k != _this.index){
                    var imgI = tmpNodes[k].getElementsByTagName('img')[0];
                    imgI.style.border = "0";
                    imgI.style.width = "112px";
                    imgI.style.height = "80px";     
                }
            }
            //获取大图总图替换大图中图src属性加载大图中图
            mediumImg.setAttribute('src',img.getAttribute('msrc'));
            bigImg.setAttribute('src',img.getAttribute('bsrc'));
        }

    }

    //导航左右按钮
    var totalWidth = liWidth*liNum;//总宽度
    var mcount = liNum - 5;
    var now = 0;//小图左右移动计数器
    var lBtn = document.getElementById('left');
    var rBtn = document.getElementById('right');
    //小图标导航向左移动
    lBtn.onclick= function(){
    	var left=parseInt(imgItems.style.left)||0
        if(left<0){
            imgItems.style.left =parseInt(left+liWidth)+'px'
         }
    }
    //小图标导航向右移动
    rBtn.onclick = function(){
    	var left=parseInt(imgItems.style.left)||0
    	var bzhun=parseInt(-liWidth*(liNum-5))
        if(left>bzhun){
            now++;
            imgItems.style.left =parseInt(left-liWidth)+'px'
        }
    }
    //获取style样式兼容
    function getCurrentStyle(node) {
        return window.getComputedStyle ? window.getComputedStyle(node,null):node.correntStyle;
    }
}