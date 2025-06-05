// Opinionated code formatter which removes all original styling
// and ensures that all outputted code conforms to a consistent
// style by reprinting the parsed AST with its own rules.
// © Prettier <https://prettier.io>

// Defines config.
const config = {};

// External plugins.
config.plugins = [
  '@prettier/plugin-pug',
  'prettier-plugin-jsdoc',
  'prettier-plugin-packagejson',
  'prettier-plugin-sh',
  'prettier-plugin-sort-json'
];

// Read editorconfig.
config.editorconfig = true;

// Consistent quotes.
config.quoteProps = 'consistent';

// Single quotes for string.
config.singleQuote = true;

// Closing bracket position.
config.bracketSameLine = true;

// No commas on multi-line.
config.trailingComma = 'none';

// Indent script and style.
config.vueIndentScriptAndStyle = true;

// Sort Json props recursively.
config.jsonRecursiveSort = true;

// Framework using pug engine.
config.pugFramework = 'vue';

// Pug attribute double quotes.
config.pugSingleQuote = false;

// Pug attribute wrap threshold.
config.pugWrapAttributesThreshold = 1;

// Pug single file component indent.
config.pugSingleFileComponentIndentation = true;

// Resolve plugins from node directory.
config.plugins = config.plugins.map((plugin) =>
  require.resolve(plugin, {
    paths: [__dirname + '/node_modules']
  })
);

// Export prettier config used by IDE.
module.exports = config;
