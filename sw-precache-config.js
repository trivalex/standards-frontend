/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/* eslint-env node */
module.exports = {
  staticFileGlobs: [
    'manifest.json',
    'src/**/*',
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\/webcomponents-loader.js\//,
      handler: 'fastest'
    },
    {
      urlPattern: /\/design\/design.js\//,
      handler: 'fastest'
    },
    {
      urlPattern: /\/design\/designjs\//,
      handler: 'fastest'
    },
    {
      urlPattern: /\/design\/design\//,
      handler: 'fastest'
    },
    {
      urlPattern: /^https:\/\/fonts.gstatic.com\//,
      handler: 'fastest'
    },
    {
      urlPattern: /^https:\/\/baconipsum.com\/api\//,
      handler: 'fastest'
    },
  ]
};
