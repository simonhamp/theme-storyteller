# Storyteller Theme 2.0

This site theme is a fork of [Storyteller](https://github.com/statamic/theme-storyteller) by Statamic. It's not meant for production. It merely exists as a demonstration of how you could set up Tailwind in a Statamic theme.

The goal is a setup that allows you to use the full power of Tailwind to build an absolute minimal stylesheet. In most cases, you can reduce your stylesheet to less than 20% of its original size.

## Installing

- Setup a fresh Statamic install
- Unzip the Storyteller package
- Replace the contents of `site` and `assets` with those from the package
- Run the following commands:

```
cd site/themes/storyteller

# NPM
npm install
npm run prod

# Yarn
yarn && yarn run prod
```

And see how small your CSS could be!

> NB: The one main drawback of this approach is that concatenating variables into class names in your templates (i.e. `class="h-{{ height }}"`) will actually break your theme as the PurgeCSS extractor will not know what you intend from this. One fix for this is to put the full style name into your variables/fieldset options.
