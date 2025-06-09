// Opinionated code formatter which removes all original styling
// and ensures that all outputted code conforms to a consistent
// style by reprinting the parsed AST with its own rules.
// Learn more at: https://prettier.io

// Defines configuration.
const config = {};

// Add external formatting plugins.
config.plugins = [
  '@prettier/plugin-pug',
  'prettier-plugin-jsdoc',
  'prettier-plugin-packagejson',
  'prettier-plugin-sh',
  'prettier-plugin-sort-json'
];

// Respect .editorconfig settings.
config.editorconfig = true;

// Use consistent quotation style.
config.quoteProps = 'consistent';

// Prefer single quotes for string literals.
config.singleQuote = true;

// Place closing brackets on same line as last element.
config.bracketSameLine = true;

// Remove trailing commas in multiline structures.
config.trailingComma = 'none';

// Apply indentation to Vue <script> and <style> tags.
config.vueIndentScriptAndStyle = true;

// Enable deep sorting of JSON object properties.
config.jsonRecursiveSort = true;

// Set Vue.js as the template framework.
config.pugFramework = 'vue';

// Use double quotes for Pug attributes.
config.pugSingleQuote = false;

// Wrap attributes when more than one.
config.pugWrapAttributesThreshold = 1;

// Enable proper Single File Component indentation.
config.pugSingleFileComponentIndentation = true;

// Resolve plugin paths relative to this configuration file.
config.plugins = config.plugins.map((plugin) =>
  require.resolve(plugin, {
    paths: [__dirname + '/node_modules']
  })
);

// Export configuration for use by Prettier and IDE.
module.exports = config;
