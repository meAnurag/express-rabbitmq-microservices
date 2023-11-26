export interface IPROXYROUTE {
  url: string;
  proxy: {
    target: string;
    changeOrigin?: boolean;
    pathRewrite?: Record<string, string>;
  };
}

export const PROXY_ROUTES = [
  {
    url: '/kitchen',
    proxy: {
      target: 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: {
        [`^/kitchen`]: '',
      },
    },
  },
  {
    url: '/reception',
    proxy: {
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: {
        [`^/reception`]: '',
      },
    },
  },
];
