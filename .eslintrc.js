module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "no-alert": "off",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-param-reassign": "off",
  },

  plugins: ["jest"],
};
