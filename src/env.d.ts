/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_TOKEN: string
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
// declare module '*.module.scss' {
// 	const styles: { [className: string]: string }
// 	export default styles
// }
