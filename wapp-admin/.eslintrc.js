const { eslint } = require('@ice/spec');

// console.log(eslint);

const rules = {
  ...eslint,
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['ice', '.ice/index.ts'],
          ['ice/*', '.ice/pages/*']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.less', '.json']
      }
    }
  },
  rules: {
    'camelcase': 0,
    'consistent-return': 0,
    'operator-linebreak': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/named': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-duplicates': 0,
    'import/no-cycle': 0,
    'import/no-self-import': 0,
    'import/order': 0,
    'import/no-named-as-default': 0,
    'import/no-useless-path-segments': 0,
    'import/no-named-as-default-member': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-empty': 0,
    'no-lonely-if': 0,
    'no-new-func': 0,
    'no-plusplus': 0,
    'no-shadow': 0,
    'no-unused-vars': 1,
    'no-underscore-dangle': 0,
    'no-restricted-syntax': 1,
    'no-param-reassign': 0,
    'no-use-before-define': 1,
    'no-multi-assign': 0,
    'no-await-in-loop': 0,
    'no-nested-ternary': 0,
    'no-continue': 0,
    'no-restricted-properties': 0,
    'no-return-await': 0,
    'prefer-destructuring': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/no-array-index-key': 1,
    'react/jsx-no-target-blank': 0,
    'react/destructuring-assignment': 0,
    'react/no-danger': 0,
    'react/require-default-props': 0,
    'react/no-access-state-in-setstate': 0,
    radix: 0,
    semi: [2, 'always']
  }
};
module.exports = rules;
