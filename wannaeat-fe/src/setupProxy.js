const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // "/api" 경로로 요청할 때 프록시를 사용합니다.
    createProxyMiddleware({
      target: 'https://finopenapi.ssafy.io/ssafy',
      changeOrigin: true, // 타겟 서버의 호스트 헤더를 재작성합니다.
    })
  );
};
