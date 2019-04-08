const { ObjectId } = require('mongoose').Types;
const Joi = require('joi');
const Post = require('../../models/post');

exports.checkLogin = (ctx, next) => {
  if (!ctx.session.logged) {
    ctx.status = 401;
    return null;
  }
  return next();
};

exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  // 검증 실패
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return null;
  }

  return next();
};

// POST /api/posts { title, body, tags }
exports.write = async (ctx) => {
  // 객체가 지닌 값들을 검증
  const schema = Joi.object().keys({
    title: Joi.string().required(), // 뒤에 required를 붙여 주면 필수 항목이라는 의미
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), // 문자열 배열,
    name: Joi.string().required(),
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
    name, title, content, tags
  } = ctx.request.body;
  console.error(name);
  // 새 Post 인스턴스를 만듭니다.
  const post = new Post({
    name, title, content, tags, views: 0
  });

  try {
    await post.save(); // 데이터베이스에 등록합니다.
    console.log(post);
    ctx.body = post; // 저장된 결과를 반환합니다.
  } catch (e) { // 오류 발생시
    ctx.throw(e, 500);
  }
};

// GET /api/posts
exports.list = async (ctx) => {
  // page 가 주어지지 않았다면 1로 간주
  const page = parseInt(ctx.query.page || 1, 10); // 쿼리는 문자열 형태이므로 숫자로 변환
  const { tag } = ctx.query;

  const query = tag ? {
    tags: tag // tags 배열에 tag를 가진 포스트 찾기
  } : {};
  // 잘못된 페이지가 주어졌다면 오류
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 }) // 역순으로 불러오기
      .limit(10) // 개수 제한
      .skip((page - 1) * 10)
      .lean() // JSON형태로 조회하기
      .exec();
    const postCount = await Post.countDocuments().exec();
    // const limitBodyLength = post => ({
    //   ...post,
    //   // body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
    // });
    // ctx.body = posts.map(limitBodyLength);
    ctx.body = posts;
    ctx.set('last-page', Math.ceil(postCount / 10));
  } catch (e) {
    ctx.throw(e, 500);
  }
};

// GET /api/posts/:id
exports.read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    // 조회수 1 올리기
    await Post.findByIdAndUpdate(id, { views: post.views + 1 }).exec();
    // 포스트가 존재하지 않습니다.
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
// DELETE /api/posts/:id
exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    // await Post.findOneAndDelete(id).exec();
    await Post.findByIdAndDelete(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
// PATCH /api/posts/:id
exports.update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
      // 이 값을 설정해야 업데이트된 객체를 반환합니다.
      // 설정하지 않으면 업데이트 되기 전의 갹체를 반환합니다.
    }).exec();
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};