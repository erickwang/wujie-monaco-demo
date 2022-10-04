const { prettier } = require('@ice/spec');

const rules = {
  ...prettier,
  printWidth: 1000,
  trailingComma: 'none',
  semi: true
};

module.exports = rules;
