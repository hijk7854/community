const Joi = require('joi');
const Member = require('../../models/member');

// 회원가입
exports.join = async (ctx) => {
  // 객체가 지닌 값들을 검증
  const schema = Joi.object().keys({
    id: Joi.string().required(), // 뒤에 required를 붙여 주면 필수 항목이라는 의미
    pwd: Joi.string().required(),
    name: Joi.string().required(),
  });

  // 첫 번째 파라미터는 검증할 객체, 두 번째는 스카마
  const result = Joi.validate(ctx.request.body, schema);

  // 오류가 발생하면 오류 내용 응답
  if (result.error) {
    console.log('1');
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    id, pwd, name
  } = ctx.request.body;
  // 새 Member 인스턴스를 만듭니다.
  const member = new Member({
    id, pwd, name
  });
  try {
    await member.save(); // 데이터베이스에 등록합니다.
    ctx.body = member; // 저장된 결과를 반환합니다.
  } catch (e) { // 오류 발생시
    ctx.throw(e, 500);
  }
};

// 로그인
exports.login = async (ctx) => {
  // 객체가 지닌 값들을 검증
  const schema = Joi.object().keys({
    id: Joi.string().required(), // 뒤에 required를 붙여 주면 필수 항목이라는 의미
    pwd: Joi.string().required(),
  });

  // 첫 번째 파라미터는 검증할 객체, 두 번째는 스카마
  const result = Joi.validate(ctx.request.body, schema);
  // 오류가 발생하면 오류 내용 응답
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    id,
    pwd
  } = ctx.request.body;

  try {
    const member = await Member.findOne({ id }).exec();
    // id와 pwd 불일
    if (member.pwd !== pwd) {
      ctx.status = 401;
      ctx.body = {
        success: false
      };
      return;
    }
    ctx.body = {
      success: true
    };
    // 세션에 저장
    ctx.session.logged = member;
    ctx.set('name', member.name);
  } catch (e) {
    ctx.throw(e, 500);
  }
};
// 체크
exports.check = (ctx) => {
  ctx.body = {
    // logged 값 반대로 변경
    logged: !!ctx.session.logged
  };
};
// 로그아웃
exports.logout = (ctx) => {
  ctx.session = null;
  ctx.status = 204;
};
// 탈퇴
exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    // await Post.findOneAndDelete(id).exec();
    await Member.findByIdAndDelete(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};