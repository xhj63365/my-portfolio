import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// ============ GitHub Pages 部署配置 ============
// site：你的站点完整地址，部署前把 your-username 换成你的 GitHub 用户名
//   · 主页仓库（仓库名 = 用户名.github.io）：https://your-username.github.io
//   · 普通仓库（如 my-portfolio）：https://your-username.github.io/my-portfolio
//
// base：仅「普通仓库」需要，值为仓库名（以 / 开头），例如 '/my-portfolio'；
//       如果使用主页仓库（用户名.github.io），保持下面这行注释即可，不要设置 base。
export default defineConfig({
  site: 'https://your-username.github.io',
  // base: '/my-portfolio',

  // Tailwind CSS v4 通过 Vite 插件接入
  vite: {
    plugins: [tailwindcss()],
  },
});
