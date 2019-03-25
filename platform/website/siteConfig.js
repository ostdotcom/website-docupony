/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  // {
  //   caption: 'User1',
  //   // You will need to prepend the image path with your baseUrl
  //   // if it is not '/', like: '/test-site/img/docusaurus.svg'.
  //   image: '/img/docusaurus.svg',
  //   infoLink: 'https://www.facebook.com',
  //   pinned: true,
  // },
];

const siteConfig = {
  title: '' /* title for your website */,
  tagline: 'Developer Documentation',
  url: 'localhost:8000/' /* your website url */,
  baseUrl: '/platform/' /* base url for your project */,
  projectName: 'platform',
  // organizationName: 'facebook',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  // headerLinks: [
  //   {doc: 'doc1', label: 'Docs'},
  //   {doc: 'doc4', label: 'API'},
  //   {page: 'help', label: 'Help'},
  //   {blog: true, label: 'Blog'},
  // ],

  headerLinks: [
    {href: "/platform/", label: 'Platform'},
    {href: 'https://help.ost.com/support/home', external: true,  label: 'Support'}
  ],

  secondryHeaderLinks: [
  {href: '/platform/', label: 'Docs'},
  {href: '/platform/docs/sdk/', label: 'SDK References'},
  {href: '/platform/docs/api', label: 'API References'}

  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/docusaurus.svg',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#34445b',
    secondaryColor: '#e4b030'
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} <a href="https://ost.com" target="_blank">OST.com</a> Ltd., All Rights Reserved.`,
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    '/platform/js/gitter.js',
    '/platform/js/custom.js'
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
