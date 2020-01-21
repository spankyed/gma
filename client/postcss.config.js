const purgecss = require('@fullhuman/postcss-purgecss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

class TailwindExtractor {
  static extract(content) {
    // This will extract variants
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}
module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    autoprefixer
  ]
  
}
//purge css fucking shit up
/*
    ...(false
      ? [
          purgecss({
            content: ['./src/*.js', './src/components/*.js'],
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ['js']
              }
            ]
          })
        ]
      : [])
*/      