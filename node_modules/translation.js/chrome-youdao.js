var options = ['blocking', 'requestHeaders']
var matches = /Chrome\/(\d+)/.exec(navigator.userAgent)
var chromeVersion = matches && Number(matches[1])
if (chromeVersion > 71) {
  options.push('extraHeaders')
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(info) {
    var requestHeaders = info.requestHeaders
    var r = {
      name: 'Referer',
      value: 'http://fanyi.youdao.com'
    }
    var index = requestHeaders.findIndex(function(header) {
      return header.name.toLowerCase() === 'referer'
    })
    if (index >= 0) {
      requestHeaders.splice(index, 1, r)
    } else {
      requestHeaders.push(r)
    }
    return { requestHeaders: requestHeaders }
  },
  {
    urls: ['http://fanyi.youdao.com/translate_o*'],
    types: ['xmlhttprequest']
  },
  options
)
