module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"extends": [
		"eslint:recommended", "plugin:react/recommended"
	],
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": ["react"],
	"rules": {
		"indent": [
			"error", "tab"
		],
		"linebreak-style": [
			"error", "unix"
		],
		"quotes": [
			"error", "single"
		],
		"semi": [
			"error", "always"
		],
		"no-console": [
			"error", {
				"allow": ["log", "warn", "error"]
			}
		],
		"react/prop-types": ["off"],
		"react/jsx-wrap-multilines": ["error"],
		"react/jsx-closing-bracket-location": ["error", "tag-aligned"],
		"react/no-multi-comp": ["error"],
		"react/prefer-es6-class": ["error"],
		"react/jsx-pascal-case": ["error"],
		"react/sort-comp": ["off"],
		"react/jsx-no-bind": ["error"],
		"react/self-closing-comp": ["error"]

	}
};
