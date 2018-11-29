// 使用vue
const Vue = require('vue');
//使用node框架--koa
const Koa = require('koa');
const server = new Koa();
const route = require('koa-route');


const app = new Vue({
  data: {
    msg: 'hello vue ssr',
  },
  template: `<div>{{msg}}</div>`
})


const main = ctx => {
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    ctx.response.body = html;
  })
}


const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.html', 'utf-8')
})


server.use(route.get('*', main))

server.listen(8080)
