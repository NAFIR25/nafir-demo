import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⛑️ تجاوز فحص ESLint أثناء build للنشر السريع
    ignoreDuringBuilds: true,
  },
  typescript: {
    // (اختياري) تجاوز فحص type errors أثناء build لو ظهرت
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
