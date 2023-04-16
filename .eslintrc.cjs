/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	globals: {
		Raven: false,
		MarkerClusterer: false,
		Connection: false,
		cordova: true,
		SafariViewController: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2015,
		sourceType: 'module'
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-strongly-recommended',
		'@vue/eslint-config-typescript'
	],
	'plugins': [
		'vue',
		'@typescript-eslint'
	],
	rules: {
		indent: [
			'error',
			'tab'
		],
		'vue/max-attributes-per-line': ['error', {
			'singleline': 1,
			'multiline': 1
		} ],
		'vue/html-indent': ['error', 'tab', {
			'attribute': 1,
			'baseIndent': 1,
			'closeBracket': 0,
			'alignAttributesVertically': true,
			'ignores': []
		} ],
		'no-multiple-empty-lines': [
			'error',
			{
				'max': 1
			}
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'always'
		],
		'no-console': [
			'error',
			{
				allow: [
					'log'
				]
			}
		],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'always',
				asyncArrow: 'always'
			}
		],
		'object-curly-spacing': [
			2,
			'never',
			{
				arraysInObjects: true,
				objectsInObjects: true
			}
		],
		'space-before-blocks': [
			'error',
			{
				functions: 'always',
				keywords: 'always',
				classes: 'always'
			}
		],
		'space-infix-ops': 'error',
		'newline-per-chained-call': [
			'error',
			{
				ignoreChainWithDepth: 3
			}
		],
		'no-whitespace-before-property': 'error',
		'space-in-parens': [
			'error',
			'never'
		],
		'array-bracket-spacing': [
			'error',
			'never',
			{
				arraysInArrays: true,
				objectsInArrays: true
			}
		],
		strict: [
			'error',
			'global'
		],
		'comma-dangle': [
			'error',
			{
				arrays: 'never',
				objects: 'never',
				imports: 'never',
				exports: 'never',
				functions: 'ignore'
			}
		],
		'keyword-spacing': [
			'error',
			{
				before: true,
				after: true
			}
		],
		'prefer-const': [
			'error'
		],
		'no-const-assign': 'error',
		'no-var': 'error',
		'object-shorthand': [
			'error',
			'always'
		],
		'no-confusing-arrow': [
			'error',
			{
				allowParens: true
			}
		],
		'no-dupe-class-members': 'error',
		'eqeqeq': [
			'error',
			'always',
			{
				null: 'ignore'
			}
		],
		'require-atomic-updates': 'off'
	}
};