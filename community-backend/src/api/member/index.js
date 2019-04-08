const Router = require('koa-router');
const memberCtrl = require('./member.ctrl');

const member = new Router();
member.post('/join', memberCtrl.join); // 회원 가입
member.post('/login', memberCtrl.login); // 로그인
member.get('/check', memberCtrl.check);
member.post('/logout', memberCtrl.logout);
member.delete('/remove/:id', memberCtrl.remove); // 회원 탕퇴

module.exports = member;