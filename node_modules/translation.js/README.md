# translation.js [![NPM Version](https://img.shields.io/npm/v/translation.js.svg?style=flat-square)](https://www.npmjs.com/package/translation.js)

translation.js 整合了[谷歌翻译](https://translate.google.cn/)、[百度翻译](https://fanyi.baidu.com/)与[有道翻译](http://fanyi.youdao.com/)的网页翻译接口，让你方便的在这些翻译接口之间切换，并获取相同数据结构的翻译结果。

## 特点

### 可在 Node.js 及 Chrome 扩展 / 应用中使用

translateion.js 能同时在 Node.js 和浏览器端运行，但由于浏览器端[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)的限制，这些网页接口只能在允许跨域的运行环境使用，Chrome 扩展 / 应用则是其中之一。

**注意**：为了能在 Chrome 扩展 / 应用中使用 translation.js，请阅读[在 Chrome 扩展 / 应用中使用](#在-chrome-扩展--应用中使用)。

### 一致的参数与数据结构

每个网页翻译的接口都有不同的参数和翻译结果，translation.js 统一了这些不同之处并提供了一致的 API，同时提供了每个接口的源数据方便自定义处理。

## 安装

### 在 Node.js 或 Webpack（及类似的模块打包工具）中使用

先用 NPM 安装：

```
npm install translation.js
```

然后在代码中引用：

```js
// CommonJS 中
const { youdao, baidu, google } = require('translation.js')

// ES6 中
import { youdao, baidu, google } from 'translation.js'
```

### 使用 &lt;script&gt; 标签

在 Chrome 扩展 / 应用中使用 &lt;script&gt; 标签引用时，你需要先下载下面的文件到你的项目里：

* [md5.min.js](https://unpkg.com/blueimp-md5/js/md5.min.js)
* [tjs.browser.js](https://unpkg.com/translation.js/dist/tjs.browser.js)

然后在 HTML 中引用：

```html
<!-- 如果你需要使用有道翻译就需要先引用 md5.min.js -->
<script src="path/to/md5.min.js"></script>
<!-- 然后引用 tjs.browser.js -->
<script src="path/to/tjs.browser.js"></script>
<!-- 然后你就可以从全局变量 tjs 中获取翻译对象了 -->
<script>const { youdao, baidu, google } = window.tjs</script>
```

## 使用

所有翻译对象都有相同的三个方法：`translate()`、`detect()` 和 `audio()`，下面会使用 `google` 作为示例，但同样的代码换成 `baidu` 和 `youdao` 也是一样能运行的。

### 获取翻译结果

获取一段文本的翻译结果可以用 `translate()` 方法：

```js
google.translate('test').then(result => {
  console.log(result) // result 的数据结构见下文
})
```

其中 `result` 的结构示例如下：

```js
{
  text: 'test', // 此次查询的文本
  raw: { ... }, // 接口返回的原本的数据
  link: 'https://translate.google.cn/#en/zh/test', // 在线翻译地址
  from: 'en', // 文本的源语种
  to: 'zh-CN', // 文本的目标语种
  // 单词的音标，目前只有用百度翻译英文单词才可能有
  phonetic: [
    {
      name: '美',
      ttsURI: 'https://fanyi.baidu.com/gettts?lan=en&text=test&spd=3&source=web',
      value: 'test'
    },
    {
      name: '英',
      ttsURI: 'https://fanyi.baidu.com/gettts?lan=en-GB&text=test&spd=3&source=web',
      value: 'test'
    }
  ],
  // 单词的详细释义，翻译英文单词时才可能有
  dict: ['n. 试验；测验；考验；化验', 'vt. 测验；考验；考查；勘探', 'vi. 受试验；受测验；受考验；测得结果' ],
  // 一般翻译结果，数组里的每一项是一个段落的翻译
  result: ['测试']
}
```

**注意**：translation.js 中所有的语种格式都以[谷歌翻译支持的语种](https://cloud.google.com/translate/docs/languages)为准。

### 检测语种

检测一段文本的语种可以使用 `detect()` 方法：

```js
google.detect('test').then(lang => {
  console.log(lang) // => 'en'
})
```

**注意**：建议一直使用谷歌翻译检测语种，因为它支持的语种是最多的，其他接口可能不支持你所检测的文本的语种。

### 获取文本的语音朗读地址

使用 `audio()` 方法可以获取到文本的语音朗读地址：

```js
google.audio('test').then(uri => {
  console.log(uri) // => 'http://tts.google.cn/.......'
})
```

在浏览器端，你可以使用 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Using_HTML5_audio_and_video) 播放这段语音，给用户提供朗读功能。

**注意**：谷歌翻译的语音朗读地址只能在 Chrome 扩展 / 应用中的 `<audio>` 里直接引用，在普通网页中引用时会报 404 错误，见 [#20](https://github.com/Selection-Translator/translation.js/issues/20)。

你可以使用 `from` 参数指定文本的语种，这样会跳过检测语种的步骤（通常是一次 HTTP 请求）。

另外，百度翻译支持英标与美标读音：

```js
// 获取美式读音
baidu.audio({
  text: 'test',
  from: 'en'
})

// 获取英式读音
baidu.audio({
  text: 'test',
  from: 'en-GB'
})
```

### 源语种与目标语种

`translate()` 方法支持 `from` 与 `to` 属性，用于指定源语种与目标语种：

```js
// 将 'test' 从英语翻译至中文
google.translate({
  text: 'test',
  from: 'en',
  to: 'zh-CN'
})
```

一般情况下，你不需要设置 `from`，接口会为你自动检测，但还是建议尽量声明 `from` 以跳过自动检测语种的步骤。

### 使用谷歌国际翻译接口

默认情况下，translation.js 从 translate.google.**_cn_** 获取翻译结果、语种检测及语音地址，但**如果你的运行环境支持**，你也可以从 translate.google.**_com_** 获取数据：

```js
google.translate({
  text: 'test',
  com: true // 这一设置仅对谷歌翻译生效
})

google.detect({
  text: 'test',
  com: true
})

google.audio({
  text: 'test',
  com: true
})
```

## 错误处理

每一个方法都可能抛出错误，抛出的错误是一个 `Error` 对象，你可以检查它的 `code` 属性判断错误原因：

```js
google.translate('test').catch(error => {
  console.log(error.code)
})
```

`code` 可能有下面几个值：

```
NETWORK_ERROR - 网络错误，可能是运行环境没有网络连接造成的
API_SERVER_ERROR - 翻译接口返回了错误的数据
UNSUPPORTED_LANG - 接口不支持的语种
NETWORK_TIMEOUT - 查询接口时超时了
```

## 在 Chrome 扩展 / 应用中使用

### 1. 声明网络权限

最简单的方式就是申请 `<all_urls>` 权限：

```json
{
  "permissions": ["<all_urls>"]
}
```

或者，你至少需要申请这些访问权限：

```js
{
  "permissions": [
    // 百度翻译的接口
    "https://fanyi.baidu.com/langdetect",
    "https://fanyi.baidu.com/v2transapi",
    // 谷歌（中国）翻译的接口
    "https://translate.google.cn/",
    "https://translate.google.cn/translate_a/single",
    // 如果你需要使用谷歌国际翻译接口则添加下面两项
    "https://translate.google.com/",
    "https://translate.google.com/translate_a/single",
    // 有道翻译的接口
    "http://fanyi.youdao.com/translate_o"
  ]
}
```

### 2. 给有道翻译接口添加 Referer 请求头

有道翻译接口会验证 `Referer` 请求头判断对接口的访问是否来自网页，由于浏览器不允许 XMLHTTPRequest 对象设置 `Referer` 请求头，所以这一步只能在扩展程序里做。

你需要申请 `webRequest` 与 `webRequestBlocking` 权限，然后在你的[后台页面](https://developer.chrome.com/extensions/background_pages)中引用这个模块：

```js
import 'translation.js/chrome-youdao'
```

或者直接将 [chrome-youdao.js](chrome-youdao.js) 复制到你的项目中并引用。

注意：一旦你声明了 `webRequest` 权限，你的扩展程序就无法运行在[事件页面](https://developer.chrome.com/extensions/event_pages)模式下了，这会让你的扩展常驻后台并持续占用系统资源。

## 许可

MIT
