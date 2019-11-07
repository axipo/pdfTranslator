(function msieRefuse() {

  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  if (isIE){
    alert('本软件暂时未实现对ie的支持，请移步基于chrome内核的浏览器（复制网址到其他浏览器）')
  }
})();

const getTransRes = function(queryWord) {
    const promise = new Promise(function(resolve, reject){
      const handler = function() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      const client = new XMLHttpRequest();
      client.open("POST", '/query');
      client.onreadystatechange = handler;
      client.responseType = "text";
      client.setRequestHeader("Content-Type", "application/json");
      client.send(JSON.stringify({
        word: queryWord
      }));
  });
      return promise;
  }
  
var transResEle = document.getElementById('transRes');
function showPop(value){
    if(value === ''){
      transResEle.style.display = 'none';
    }else{
      transResEle.style.display = 'block';
      transResEle.innerHTML = value;
    }
}
function clickFun(event){
    var selected = window.getSelection();
    var selectedText = selected.toString();
    if(selectedText === ''){
        showPop('');
    }else{
        getTransRes(selectedText).then(res =>{
            showPop(res);
        })
    }
}
document.addEventListener('click', clickFun);



// 彩蛋

(function() {
    'use strict';

    function fire(){
        'use strict'
        var bg = document.getElementsByTagName('canvas');
        var wd = document.getElementsByTagName('span');
        var textLayer = document.getElementsByClassName('textLayer');
        var timeSep = '300'; //ms
        var timeDurition = 2;
        bg = Array.prototype.slice.call(bg);
        wd = Array.prototype.slice.call(wd);
        for(let ind = 0; ind < textLayer.length; ind++){
          var aNode = textLayer[ind];
          aNode.style.opacity = 1;
        }
        for(let ind = 0; ind < wd.length; ind++){
          var aNode = wd[ind];
          aNode.style.color = 'black';
          aNode.style.opacity = 1;
        }
        for(var ind = 0; ind < bg.length; ind++){
          bg[ind].style.visibility = 'hidden';
        }
        for(let ind = 0; ind < wd.length; ind++){
          let aNode = wd[ind];
          setTimeout(() =>{
                aNode.style.transition='transform ' + timeDurition + 's' + ',opacity ' + timeDurition + 's';
                aNode.style.transform = 'rotate(180deg) scale(0, 0)';
                aNode.style.opacity = '0';
          }, timeSep * (ind + 1))
        }
    }


    var timeSeq = ['X', 'X', 'X', 'X'];
    var threeClick = function (event){
        'use strict'
        var MININTERVAL = 400;
        var keypressed = String.fromCharCode(event.keyCode);
        console.log(keypressed);
        timeSeq.push(keypressed);
        timeSeq.shift();
        if(timeSeq.join('') === 'XBDL'){
            fire()
            console.log('别问我怎么恢复显示，刷新页面吧')
        }
    };

    document.addEventListener('keydown',threeClick);
})();

console.log('哦豁，你找到一个彩蛋，以此按下xbdl(学不动了)触发自暴自弃行为, 从第一页开始')