module.exports = {
    "extends": [
        "standard",
        "prettier",
        "prettier/standard",
        "eslint:recommended",
        'plugin:react/recommended',
    ],
    "plugins": [
        "import",
        "prettier",
        "standard",
        "react",
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "jsx": true,
    },
    "env": {
        "node": true,
        "es6": true,
        "jest": true,
    },
    "rules": {
        "space-before-function-paren": 0,
        "new-cap": 0,
        "prettier/prettier": 2,
        // jsx
        "react/display-name": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0
    },
    "settings": {
        "react": {
            "pragma": "React",
            "version": "detect",
        }
    }
}