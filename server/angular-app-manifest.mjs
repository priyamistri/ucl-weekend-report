
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://priyamistri.github.io/ucl-weekend-report/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/ucl-weekend-report"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 670, hash: 'e83e9a39f945d887e306929f87ed94759cea099d8798af9a7b4698b0084a99f3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1183, hash: 'ac517e00883fcb842f42642817681f595f46857ac06fc6d4285ad37dd6d0f3d7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 1565, hash: 'a8da6f0f581ad060409ff1551c2a5ea2dd32746ffb9821b8ff1e5a91cd785da2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
