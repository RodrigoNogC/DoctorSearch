// proxy.config.js
module.exports = {
    '/api': {
      target: 'http://projeto-integrado-avaliacao.azurewebsites.net',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  };
  