const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();
posts.get('/', postsCtrl.list); // 포스트 목록 조회
posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read); // 특정 포스트 조회

posts.post('/', postsCtrl.checkLogin, postsCtrl.write); // 포스트 작성
posts.delete('/:id', postsCtrl.checkLogin, postsCtrl.checkObjectId, postsCtrl.remove); // 포스트 삭제
posts.patch('/:id', postsCtrl.checkLogin, postsCtrl.checkObjectId, postsCtrl.update); // 데이터의 특정 필드 교체

module.exports = posts;