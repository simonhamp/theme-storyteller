let mix = require('laravel-mix')
let tailwindcss = require('tailwindcss');
let glob = require("glob-all");
let PurgecssPlugin = require("purgecss-webpack-plugin");

let theme_name = 'storyteller';
let path_to_root = '../../../';
let theme_path = path_to_root + 'public/themes/' + theme_name + '/';

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// Build the CSS
mix.sass('sass/' + theme_name + '.scss', theme_path + 'css/')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('tailwind.js')]
    });

// Copy other assets into place
mix.copy('js', theme_path + 'js')
   .copy('fonts', theme_path + 'fonts')
   .copy('images', theme_path + 'images')

// Purge unused styles
class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9_\-\:\/\\]+/g) || [];
    }
}

if (process.env.NODE_ENV == 'production') {
    mix.webpackConfig({
        plugins: [
            new PurgecssPlugin({
                // Whitelist any component classes as these are likely compiled by Antlers in templates
                whitelistPatterns: [],
                paths: glob.sync([
                    path.join(__dirname, "js/**/*.js"),
                    path.join(__dirname, "layouts/**/*.html"),
                    path.join(__dirname, "templates/**/*.html"),
                    path.join(__dirname, "partials/**/*.html"),
                    path.join(__dirname, path_to_root, "site/content/pages/**/*.md"),
                    path.join(__dirname, path_to_root, "site/addons/*/resources/views/**/*.blade.php"),
                ]),
                extractors: [
                    {
                        extractor: TailwindExtractor,
                        extensions: [ "html", "js", "php", "vue", "md" ]
                    }
                ]
            })
        ]
    });
}
