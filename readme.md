# pdfTranslator

——追求简洁·优雅·美观的解决之道

这是一个具有划词翻译功能的pdf阅读器，用着挺好用开源一下帮助众科研人员，**欢迎star**

## 太长不读通道
[点此下载](https://github.com/axipo/pdfTranslator/releases)，双击打开

软件会自动调用默认浏览器打开一个本地地址，然后软件本身会变成一个后台服务，所有操作在浏览器中进行。

打开新文件有两种方式：
1. 直接把pdf拖进阅读器中
2. 或者在阅读器顶部的工具栏点击打开文件的按钮


## 效果图

![效果图](https://cdn.0x00.eu.org/d/iV0Vi3kHUe.gif)

## 缘由

阅读论文并且想用翻译的时候，经常面临的一个问题就是要在pdf阅读器和谷歌翻译之间切换，非常容易打乱思绪，有一个良好的工具可以实现更好的工作流。

常用的几种解决方案有本地监控剪切板变化，本地监控快捷键，浏览器油猴插件等等。

所有本地监控类型的都不推荐：对系统入侵太大，尤其是那些具有划词功能的词典，居然大部分是不断触发ctrl+c来实现的，经常导致我命令行程序强制退出。

浏览器插件要更优雅一些，比如[这个油猴插件](https://greasyfork.org/en/scripts/374339-google-translate-utils)，对双屏用户极其友好，无系统入侵并且跨平台。

更好的方案是在pdf阅读器上进行扩展，实现划词翻译，这样视线不用移动多少，更舒服。比如 [这个项目](https://github.com/do-something-for-fun/thesis-helper)。本项目灵感正是来自于它， 感觉挺有用并且想要加一些特性进去，于是就重新造了这个轮子。


## 特点

- 划词后自动翻译，工作流更加简单，简单是最重要的，**keep it simple stupid**
- 支持google翻译，相对于百度必应和有道，仍然是更喜欢谷歌翻译的结果
- 跨平台支持（win/linux/mac），使用webui也就是直接用浏览器作为前台，更加干净整洁


## 技术栈

- express 实现后端
- translate.js
- pdfjs 作为前端

## 跨平台支持

### windows

win端直接[下载](https://github.com/axipo/pdfTranslator/releases)，双击打开使用即可

### Linux & Mac OS

    git clone https://github.com/axipo/pdfTranslator.git
    cd pdfTranslator
    npm install
    node index.js

## 打包方法

    git clone https://github.com/axipo/pdfTranslator.git
    cd pdfTranslator
    npm install
    npx pkg ./package.json
    
## Q&A

1. 支持什么浏览器？

	目前仅适配了基于chrome的浏览器以及firefox，ie不支持，Safari测试通过。

	程序启动后自动打开默认浏览器，直接使用浏览器作为UI即可~

	如果默认浏览器是ie，那么可以在其他受支持的浏览器中输入[http://127.0.0.1:3000](http://127.0.0.1:3000/) 使用。

	后续会加入对ie的支持
 
2. 为什么我划词之后没有自动翻译？

	如果你是使用ie或者基于ie的浏览器，建议换到基于chrome的浏览器或者firefox

	另外，我发现一个共性的问题，如果你用过ipv6 hosts科学上网，那么很有可能只能打开不能获取翻译结果 需要删除掉hosts里面[translate.google.cn](http://translate.google.cn/)的记录。原因是hosts里关于google翻译的ipv6地址已经被墙，无法使用。但是删除后走正常的ipv4是可行的，因为谷歌翻译cn域名没有被墙。这也回答了另一个问题，本程序是不需要科学上网的。

3. 为什么不开发桌面版，还要在浏览器打开？

	这个是一个个人喜好问题了，实际上我还是偏向用webui的方式，界面交由浏览器实现，请求翻译API由后台负责，干净整洁。非常自然的解决了跨平台问题，并且软件体积很小。
	
4. 使用人数过多会导致API被限流吗？

	不会，没有使用标准的收费接口，实际上是使用的非正规接入方式。

5. 软件收费吗？

	nope，项目被别人喜欢带来的快乐感更重要，欢迎star/反馈意见/推广给朋友
    
## To-Do

- 有时间把有道翻译和必应翻译也加上吧（咕咕咕

- 有时间把Linux和mac的打包版本也导出好（咕咕咕+1

**↑估计要等空闲一点再搞，最近真的忙...**

## 请我喝杯咖啡？（多虑了

![收款码](https://cdn.0x00.eu.org/d/XxcO1sJGMi.png)
