const Router = require('koa-router');
const posts = require('./posts');
const member = require('./member');

const api = new Router();
api.use('/posts', posts.routes());
api.use('/member', member.routes());

// 생성한 라우터를 내보낸다
module.exports = api;