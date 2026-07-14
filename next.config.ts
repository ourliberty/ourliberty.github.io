import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 빌드 시 모든 페이지를 정적 HTML로 생성 (SSG)
  output: "export",
  // 정적 호스팅(GitHub Pages 등)에서 주소가 폴더 형태(/posts/글이름/)로 안정적으로 동작하게 함
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
