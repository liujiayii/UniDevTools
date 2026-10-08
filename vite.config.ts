import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path"
// import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: "es6"
	},
	resolve: {
		alias: [
			{
				find: "@",
				replacement: resolve(__dirname, 'src')
			},
			{
				// npm 化改造后页面内 import "@xiaodou/uni-devtools/..."，
				// 示例项目通过 alias 指向本地 src/devTools，无需安装私有包即可运行
				find: "@xiaodou/uni-devtools",
				replacement: resolve(__dirname, 'src/devTools')
			}
		]
	},
	server: {
		port: 1314,
		// 选项写法
		proxy: {
			'/pag': {
				target: 'https://cdn.tmui.design',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '/api')
			},
		}
	},
	plugins: [
		uni(),
		vueJsx()
	]
});
