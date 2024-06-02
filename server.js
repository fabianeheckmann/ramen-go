const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('.'));

app.use('/api', createProxyMiddleware({
    target: 'https://api.tech.redventures.com.br',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('x-api-key', 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf');
    }
}));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
