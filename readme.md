# pdfTranslator

一个具有划词翻译功能的pdf阅读器，用起来非常的爽！开源一下帮助众科研狗，欢迎star

**`「太长不读者通道：」`** [点此下载](https://github.com/axipo/pdfTranslator/releases)，双击打开

阅读论文并且想用翻译的时候，经常面临的一个问题就是要在pdf阅读器和谷歌翻译之间切换，非常容易打乱思绪，有一个良好的工具可以实现更好的工作流。

常用的几种解决方案有本地监控剪切板变化，本地监控快捷键，浏览器油猴插件等等。

所有本地监控类型的都不推荐：对系统入侵太大，尤其是那些具有划词功能的词典，居然大部分是不断触发ctrl+c来实现的，经常导致我命令行程序强制退出。

浏览器插件要更优雅一些，比如[这个油猴插件](https://greasyfork.org/en/scripts/374339-google-translate-utils)，对双屏用户极其友好，无系统入侵并且跨平台。

更好的方案是在pdf阅读器上进行扩展，实现划词翻译，这样视线不用移动多少，更舒服。比如 [这个项目](https://github.com/do-something-for-fun/thesis-helper)。本项目灵感正是来自于它， 感觉挺有用并且想要加一些特性进去，于是就重新造了这个轮子。

## 特点

- 划词后自动翻译，工作流更加简单，简单是最重要的，**keep it simple stupid**
- 支持google翻译，相对于百度必应和有道，仍然是更喜欢谷歌翻译的结果
- 跨平台支持（win/linux/mac），使用webui也就是直接用浏览器作为前台，更加干净整洁


## 效果图

![效果图](https://cdn.0x00.eu.org/d/iV0Vi3kHUe.gif)

## 技术栈

- express 实现后端
- google 翻译
- pdfjs 作为前端

## 使用方法

### windows

win端直接[下载](https://github.com/axipo/pdfTranslator/releases)，双击打开使用即可

> **注意细节**： 在弹出翻译卡片后，通过点击非卡片区域（空白区域）取消卡片显示。此时才能进行下一次选择，当翻译卡片显示时划词是**不会更新结果**的。

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

## To-Do

- 有时间把有道翻译和必应翻译也加上吧（咕咕咕

- 有时间把Linux和mac的打包版本也导出好（咕咕咕+1

**↑估计要等空闲一点再搞，最近真的忙...**

## 请我喝杯咖啡？

![收款码](https://cdn.0x00.eu.org/d/XxcO1sJGMi.png)
