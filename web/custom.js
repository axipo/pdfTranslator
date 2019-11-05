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
      client.open("GET", '/query?word=' + queryWord);
      client.onreadystatechange = handler;
      client.responseType = "text";
      client.send();
  });
      return promise;
  }
  
var toolbarContainer = document.getElementById('toolbarContainer');
var transResEle = document.getElementById('transRes');
var transResEleContainer = document.getElementById('transResContainer');
var showRes = false;
function showPop(value){
    if(value === '' && showRes === true){
      transResEleContainer.remove();
      transResEle.style.visibility = 'hidden';
      showRes = false;
    }else if(value !== '' && showRes === false){
      transResEle.style.visibility = 'visible';
      toolbarContainer.insertBefore(transResEleContainer, toolbarContainer.firstChild);
      transResEle.innerHTML = value;
      showRes = true;
    }
}
function clickFun(event){
    var selected = window.getSelection();
    var selectedText = selected.toString();
    if(selectedText === ''){
        showPop('');
    }else{
        console.log(selectedText);
        getTransRes(selectedText).then(res =>{
            showPop(res);
        })
    }
}
document.addEventListener('click', clickFun);