 window.onload=function(){
        waterfall('main','pin');

         var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};

        window.onscroll=function(){
            if(checkScrollSlide){
                var oParent=document.getElementById('main');
                for(var i=0;i<dataInt.data.length;i++){
                    var oPin=document.createElement("div");
                    oPin.className="pin";
                    oParent.appendChild(oPin);
                    var oBox=document.createElement("div");
                    oBox.className="box";
                    oPin.appendChild(oBox);
                    var oImg=document.createElement('img');
                    oImg.src='./images/'+dataInt.data[i].src;
                    oBox.appendChild(oImg);
                }
                waterfall('main','pin');
            }
        }
    }

    function waterfall(parent,box){
        //将main下所有class为box的元素取出来
        var oParent=document.getElementById(parent);
        var oBoxs=getByClass(oParent,box);
        //console.log(oBoxs);
        //计算整个页面需要显示的列数(页面宽/box的宽度)
        var oBoxW=oBoxs[0].offsetWidth;
        var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
        //设置main的宽度
        oParent.style.cssText="width:"+oBoxW*cols+"px;margin:0 auto";
       /* oParent.style.width=oBoxW*cols+'px';
        oParent.style.margin='0 auto';*/

        //用数组保存第一行图片的高度
        var hArr=[];
        for(var j=0;j<oBoxs.length;j++){
            if(j<cols){
                 hArr.push(oBoxs[j].offsetHeight);
            }else{
                var minH=Math.min.apply(null,hArr);
                //console.log(minH);
                var index=getMinhIndex(hArr,minH);
                console.log(index);
                //oBoxs[j].style.cssText="position:absolute;left:"+oBoxW*index+"px;top:"+minH+"px"
                oBoxs[j].style.position="absolute";
                oBoxs[j].style.top=minH+'px';
                oBoxs[j].style.left=oBoxW*index+'px';
                hArr[index]+=oBoxs[j].offsetHeight
            }
           
        }
        
        console.log(hArr);


    }

    //根据class获取元素
    function getByClass(parent,clsName){
        var boxArr=[];
        var oElements=parent.getElementsByTagName('*');
        for(var i=0;i<oElements.length;i++){
            if(oElements[i].className==clsName){
                boxArr.push(oElements[i]);
            }
        }
        return boxArr;
    }

    function getMinhIndex(arr,val){
        for(var i in arr){
            if(arr[i]==val){
                return i;
            }
        }
    }

    function checkScrollSlide(){
        var oParent=document.getElementById("main");
        var oBoxs=getByClass('main','pin');
        var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
         var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//浏览器兼容性问题
         var documentH=document.documentElement.clientHeight||document.body.clientHeight//页面高度
         return (lastBoxH<scrollTop+documentH)?true:false;

    }