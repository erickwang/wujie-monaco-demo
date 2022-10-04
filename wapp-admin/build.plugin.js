const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = ({ context, onGetWebpackConfig }) => {
  onGetWebpackConfig(config => {
    config.plugin('MonacoEditorWebpackPlugin').use(MonacoEditorWebpackPlugin, [
      [
        {
          languages: ['sql', 'javascript', 'json', 'typescript', 'html', 'css']
        }
      ]
    ]);
  });
};
