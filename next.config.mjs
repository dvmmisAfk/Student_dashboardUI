/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles compression; standalone is for Docker/self-host
  // output: 'standalone',

  // Security headers applied to every response
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevents the page from being loaded in an iframe (clickjacking)
          { key: "X-Frame-Options",           value: "DENY" },
          // Stops MIME-type sniffing
          { key: "X-Content-Type-Options",    value: "nosniff" },
          // Enables browser XSS filter (legacy, still good to have)
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          // Controls how much referrer info is sent
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable features we don't use
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
