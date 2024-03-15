module.exports = {
	// 运行环境
	env: {
		browser: true,
		es2021: true,
		node: true,
		jest: true
	},
	/* 指定如何解析语法 */
	/** 优先级低于 parse 的语法解析配置 */
	parserOptions: {
		parser: '@typescript-eslint/parser', // 指定解析器
		ecmaVersion: 'latest', // 允许解析那个版本的特性
		sourceType: 'module', // 允许使用 import
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true // 允许对JSX进行解析
		}
	},
	/* 继承已有的规则 */
	extends: [
		'eslint:recommended', // vite自带
		'plugin:@typescript-eslint/recommended', // vite自带 @typescript-eslint/eslint-plugin的推荐规则
		'plugin:react-hooks/recommended', // vite自带
		'plugin:import/typescript', // eslint-plugin-import 抛出导入等支持的规则
		'plugin:prettier/recommended' // eslint-plugin-prettier 的推荐规则
	],
	// https://stackoverflow.com/questions/64126764/how-do-i-fix-typescript-compiler-errors-on-css-files
	ignorePatterns: ['**/*.css', '**/*.scss'],
	parser: '@typescript-eslint/parser', // 指定解析器
	plugins: ['react-refresh', '@typescript-eslint', 'react', 'prettier'],
	/*
	 * "off" 或 0 - 关闭规则
	 * "warn" 或 1 - 打开规则作为警告（不影响退出代码）
	 * "error" 或 2 - 打开规则作为错误（退出代码将为 1）
	 */
	rules: {
		// react
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'react/no-children-prop': 'off',

		// eslint（https://eslint.bootcss.com/docs/rules/）
		'no-var': 'error', // 要求使用 let 或 const 而不是 var
		'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-unexpected-multiline': 'error', // 禁止空余的多行
		'no-useless-escape': 'off', // 禁止不必要的转义字符

		// typeScript (https://typescript-eslint.io/rules)
		'@typescript-eslint/no-unused-vars': 'off', // 禁止定义未使用的变量
		'@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
		'@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
		'@typescript-eslint/semi': 'off'
	}
}
