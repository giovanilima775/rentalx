module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        'linebreak-style': ['error', 'windows'],
        'class-methods-use-this': 'off',
        'import/first': 'off',
        'no-param-reassign': 'off',
        camelcase: 'off',
    },
};