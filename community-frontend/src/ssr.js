import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import configure from 'store/configure';

import routes from './routes';
import axios from 'axios';

import transit from 'transit-immutable-js';

import App from 'components/App';
import { Helmet } from 'react-helmet';

const render = async (ctx) => {
  const { url, origin } = ctx;

  axios.default.baseURL = origin;
  // 요청이 들어올때마다 새로운 스토어 생성
  const store = configure();

  const promises = [];
  // 라우트 설정에 반복문을 돌려 일치하는 라우트를 찾습니다
  routes.forEach(
    route => {
      const match = matchPath(url, route);
      if(!match) return; // 일치하지 않는다면 무시
      // match가 성공하면 해당 라우트가 가리키는 컴포넌트의 preload를 호출
      const { component } = route;
      const { preload } = component;
      if(!preload) return;
      const { params } = match;
      const promise = preload(store.dispatch, params);
      promises.push(promise);
    }
  );

  try {
    await Promise.all(promises);
  } catch(e) {

  }

  const context = {};

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  if(context.isNotFound) {
    ctx.status = 404;
  }

  const helmet = Helmet.renderStatic();

  const preloadedState = JSON.stringify(transit.toJSON(store.getState())).replace(/</g, '\\u003c');

  return {html, preloadedState, helmet};
}

export default render;