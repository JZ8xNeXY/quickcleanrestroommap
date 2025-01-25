module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "quickcleanrestroommap.s3.ap-northeast-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // 全てのリクエストに適用
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' https://quickcleanrestroommap.s3.ap-northeast-1.amazonaws.com https://maps.gstatic.com data: https:;
              connect-src 'self' https://wxprtdliozgiizvfejql.supabase.co https://maps.googleapis.com https://maps.gstatic.com;
              frame-src 'self';
              font-src 'self' https://fonts.gstatic.com;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};
