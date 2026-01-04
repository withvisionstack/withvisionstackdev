// vue.config.js
module.exports = {
  devServer: {
    host: '0.0.0.0',  // Escuta em todos os IPs locais
    port: 8080,       // Porta padrão, mas pode ser alterada
    disableHostCheck: true, // Permite acesso de dispositivos móveis
  }
};
