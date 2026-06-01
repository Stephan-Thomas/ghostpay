/** @type {import('prettier').Config} */
const config = {
  // Line width
  printWidth: 80,

  // Indentation
  tabWidth: 2,
  useTabs: false,

  // Semicolons
  semi: true,

  // Quotes
  singleQuote: true,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',

  // Trailing commas
  trailingComma: 'es5',

  // Brackets
  bracketSpacing: true,
  bracketSameLine: false,

  // Arrow functions
  arrowParens: 'always',

  // Line endings
  endOfLine: 'lf',

  // Prose wrapping (for markdown)
  proseWrap: 'preserve',

  // HTML whitespace sensitivity
  htmlWhitespaceSensitivity: 'css',

  // Embedded language formatting
  embeddedLanguageFormatting: 'auto',

  // Single attribute per line
  singleAttributePerLine: false,

  // Overrides for specific file types
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
        printWidth: 80,
      },
    },
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'docker-compose.yml',
      options: {
        singleQuote: false,
      },
    },
  ],
};

export default config;