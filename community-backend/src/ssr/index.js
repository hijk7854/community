// require('browser-env')();
const render = require('./render').default;
const manifest = require('../../../community-frontend/build/asset-manifest.json');

function buildHtml({ html, helmet, preloadedState }) {
  const { title, meta } = helmet;
  return `
    <!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8"/>
    <link rel="shortcut icon" href="/favicon.ico"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/>
    <meta name="theme-color" content="#000000"/>
    <link rel="manifest" href="/manifest.json"/>
    ${title.toString()}
    ${meta.toString()}
    <link href="${manifest['runtime~main.js']}" rel="stylesheet">
    <link href="${manifest['main.css']}" rel="stylesheet">
    </head>
    <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${preloadedState}
    </script>
    <script src="${manifest['runtime~main.js']}"></script>
    <script src="${manifest['vendor.js']}"></script>
    <script src="${manifest['main.js']}"></script>
    </body>
    </html>`;
}
module.exports = async (ctx) => {
  try {
    const rendered = await render(ctx);
    ctx.body = buildHtml(rendered);
  } catch (e) {
    ctx.body = buildHtml({});
  }
};