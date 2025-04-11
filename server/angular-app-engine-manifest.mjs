
export default {
  basePath: 'https://priyamistri.github.io/ucl-weekend-report',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
