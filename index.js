const express = require('express');
const app = express();
const path = require('path');
const open = require('open');
const { youdao, baidu, google } = require('translation.js')


//parameter
const port = 3000;

app.use(express.static(path.resolve(__dirname)));
// app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => res.redirect(301, '/web/viewer.html'));
app.get('/query', (req, res) => {
    google.translate({
        text: req.query.word,
        to: 'zh-CN'
      }).then(result => {
        res.send(result.result.join(""));
        console.log(result.result) // result 的数据结构见下文
    })
    // translate(req.query.word, {to: 'zh-cn'}).then(res => {
    //     res.send(res.text);
    //     console.log(res.text);
    // }).catch(err => {
    //     res.status(400).send('请求失败');
    //     console.error(err);
    // });
})

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
    console.log('程序将自动打开浏览器，注意：目前仅仅测试了chrome，请尽量使用基于chrome的浏览器')
    console.log('如果您的默认浏览器是ie，可以复制网址到其他浏览器打开（推荐chrome）\n')
})

open('http://127.0.0.1:3000');