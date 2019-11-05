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
  

var transResEle = document.getElementById('transRes');
function showPop(value){
    if(value === ''){
      transResEle.style.visibility = 'hidden';
    }else{
      transResEle.style.visibility = 'visible';
      transResEle.innerHTML = value;
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