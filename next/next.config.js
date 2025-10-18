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
              connect-src 'self' https://wxprtdliozgiizvfejql.supabase.co https://maps.googleapis.com https://maps.gstatic.com https://quickcleanrestroommap.s3.ap-northeast-1.amazonaws.com;;
              frame-src 'self';
              font-src 'self' https://fonts.gstatic.com;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload", // HSTSを設定
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // iframe埋め込みを制限
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // MIMEタイプのスニッフィングを防止
          },
        ],
      },
    ];
  },
};
