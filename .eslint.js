module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: ["plugin:react/recommended", "airbnb"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	parser: "babel-eslint",
	plugins: ["react", "react-hooks"],
	rules: {
		strict: 0,
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		indent: ["error", "tab"],
		"no-tabs": "off",
		"import/prefer-default-export": "off",
		"comma-dangle": ["error", "never"],
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"react/jsx-curly-brace-presence": [2, { props: "always", children: "always" }],
		"object-curly-newline": "off",
		"max-len": ["error", { code: 120 }],
		"react/self-closing-comp": ["error", { component: true, html: true }],
		"prefer-destructuring": [
			"error",
			{ array: true, object: true },
			{ enforceForRenamedProperties: false }
		],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"implicit-arrow-linebreak": "off",
		"react/jsx-curly-newline": "off",
		"function-paren-newline": "off"
	}
};
