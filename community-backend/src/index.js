require('dotenv').config(); // <- process.env 에 접근하여 환경변수 조회

const Koa = require('koa'); // 웹 프레임워크 라이브러리
const Router = require('koa-router'); // koa 라우팅 기능
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const session = require('koa-session');
const path = require('path');
const serve = require('koa-static');

const staticPath = path.join(__dirname, '../../community-frontend/build');
const ssr = require('./ssr');

const {
  PORT: port = 4000, // 값이 없다면 4000 기본값
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey
} = process.env;

mongoose.Promise = global.Promise; // Node의 Promise를 사용하도록 설정
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
  console.log('connected to mongodb');
}).catch((e) => {
  console.error(e);
});

const app = new Koa(); // 인스턴스 생성
const router = new Router();

// 라우팅 소환
const api = require('./api');

// 라우터 설정
router.use('/api', api.routes());
router.get('/', ssr);

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// 세션 /키 적용
const sessionConfig = {
  maxAge: 86400000, // 하루
};

app.use(session(sessionConfig, app));
app.keys = [signKey];

// 라우팅기능 등록
app.use(router.routes()).use(router.allowedMethods());
app.use(serve(staticPath));
app.use(ssr);

// 포트 지정
app.listen(port, () => {
  console.log('listening to port', port);
});