import type { NextConfig } from "next";

const CONTENT_SECURITY_POLICY = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://assets.calendly.com https://www.googletagmanager.com https://www.clarity.ms;
  style-src 'self' 'unsafe-inline' https://assets.calendly.com;
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.web3forms.com https://calendly.com https://*.calendly.com https://www.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms;
  frame-src https://calendly.com https://*.calendly.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://api.web3forms.com;
  frame-ancestors 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
