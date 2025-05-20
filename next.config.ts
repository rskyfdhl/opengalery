/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swzyyzqrjteojovegnhw.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;
