# CoBlocks: Page Builder Blocks for Gutenberg

[![CircleCI](https://circleci.com/gh/godaddy-wordpress/coblocks/tree/master.svg?style=svg)](https://circleci.com/gh/godaddy-wordpress/coblocks/tree/master) [![WordPress plugin](https://img.shields.io/wordpress/plugin/dt/coblocks.svg?style=flat)](https://wordpress.org/plugins/coblocks/) [![WordPress plugin](https://img.shields.io/wordpress/plugin/v/coblocks.svg?style=flat)](https://wordpress.org/plugins/coblocks/) [![WordPress](https://img.shields.io/wordpress/v/coblocks.svg?style=flat)]() [![License](https://img.shields.io/badge/license-GPL--2.0%2B-red.svg)](https://github.com/godaddy-wordpress/coblocks/blob/master/LICENSE)

[CoBlocks](https://wordpress.org/plugins/coblocks/) is a suite of professional page building content blocks for the WordPress Gutenberg block editor. This the most innovative collection of page building WordPress blocks for the new Gutenberg block editor. We will make you rethink what WordPress is capable of.

[![CoBlocks, a suite of page builder Gutenberg blocks](https://user-images.githubusercontent.com/1813435/55430214-839cff80-555b-11e9-9624-fcd61fed398d.jpg)](https://wordpress.org/plugins/coblocks/)

## Our Vision

The vision for CoBlocks is to create a suite of WordPress blocks and tools to help folks make beautiful websites easily.

### Our Blocks

-   Accordion Block
-   Alert Block
-   Author Profile Block
-   Buttons Block
-   Carousel Gallery Block
-   Click to Tweet Block
-   Dynamic Separator Block
-   Features Block
-   Food & Drinks Block
-   Form Block
-   Gif Block
-   GitHub Gist Block
-   Hero Block
-   Highlight Block
-   Icon Block
-   Logos & Badges Block
-   Map Block
-   Masonry Gallery Block
-   Media Card Block
-   Pricing Table Block
-   Resizable Row/Columns Blocks
-   Services Block
-   Shape Divider Block
-   Social Profiles Block
-   Social Sharing Block
-   Stacked Gallery Block

### Connect

-   [Download on WordPress.org](https://wordpress.org/plugins/coblocks/)
-   [Follow on Twitter](https://twitter.com/coblocks)
-   [Join our Facebook Community](https://facebook.com/groups/coblocks)
-   [Like us on Facebook](https://www.facebook.com/coblocks/)

## Installation

1. You'll need to install the [Gutenberg](https://wordpress.org/plugins/gutenberg/) plugin if you are not running WordPress 5.0+
2. Download CoBlocks from the [WordPress plugin directory](https://wordpress.org/plugins/coblocks/).

### Advanced Controls

Disable CoBlocks utility styes with an optional filter.
```php
/**
 * Disable block utility styles.
 */
add_filter( 'coblocks_utility_styles_enabled', function ( $bool ) {
	return false;
} );
```

Disable sending of email upon Form block submission.
```php
/**
 * Disable form submission emails.
 */
add_filter( 'coblocks_form_disable_emails', '__return_true' );

/**
 * Set a custom success message to mimic a successful form submission
 *
 * @return string Form submission success message
 */
function coblocks_form_sent_message() {

	return __( 'Your message was sent.', 'textdomain' );

}
add_filter( 'coblocks_form_sent_notice', 'coblocks_form_sent_message' );
```

## Development

1. Clone the GitHub repository: `https://github.com/godaddy-wordpress/coblocks.git`
2. Browse to the folder in the command line.
3. Run the `npm install` command to install the plugin's dependencies within a /node_modules/ folder.
4. Run the `npm start` command for development.
5. Run the `build` gulp task to process build files and generate a zip.

## Support

Need help? This is a developer's portal for CoBlocks and should not be used for general support and queries. Please visit the [CoBlocks support forum on WordPress.org](https://wordpress.org/support/plugin/coblocks) for assistance.

## Contributors

CoBlocks is built by [contributors and volunteers](https://github.com/godaddy-wordpress/coblocks/blob/master/CONTRIBUTORS.md) around the globe.

## How You Can Contribute

Well first off, thank you for your contributions to CoBlocks; every contribution counts. And if you are feeling a little lost, know that you are welcome to submit an issue on any topic, or even submit a pull request on any issue. The worst that can happen is that you'll be politely directed to the best location to ask your question.

We appreciate all contributions and don't want a wall of rules to get in the way of that. That saying, please read our [Contributing Guidelines](https://github.com/godaddy-wordpress/coblocks/blob/master/.github/CONTRIBUTING.md) and know that you're expected to follow our [Code of Conduct](https://github.com/godaddy-wordpress/coblocks/blob/master/CODE_OF_CONDUCT.md).

**Ways to contribute:**

1. Raise an [issue](https://github.com/godaddy-wordpress/coblocks/issues/new/choose) to report a bug or feature request
2. Submit a pull request with bug fixes and/or new features
3. Provide ideas, feedback, mockups, and suggestions
4. Join the conversations

**New contributors:**

Are you new at contributing to CoBlocks? If so, here is a selection of [good first issues](https://github.com/godaddy-wordpress/coblocks/labels/good%20first%20issue) we've marked especially for first-timers. And if you catch yourself spinning your wheels, we're here to help!

## Screenshots

## [![Build modular grid systems with the CoBlocks Row and Columns blocks](https://user-images.githubusercontent.com/1813435/51091007-6aea2e00-1752-11e9-8ac5-4e6cb307ef47.gif)](https://coblocks.com?utm_medium=coblocks-github&utm_source=readme&utm_campaign=readme&utm_content=screenshot-1.gif)

## [![Drag to resize and then nest CoBlocks Row blocks](https://user-images.githubusercontent.com/1813435/51091023-940abe80-1752-11e9-9a91-4c332c393ca9.gif)](https://coblocks.com?utm_medium=coblocks-github&utm_source=readme&utm_campaign=readme&utm_content=screenshot-3.gif)

## [![Add CoBlocks core blocks to pages](https://user-images.githubusercontent.com/1813435/51091036-ccaa9800-1752-11e9-9e9f-fed60a73024c.gif)](https://coblocks.com?utm_medium=coblocks-github&utm_source=readme&utm_campaign=readme&utm_content=screenshot-5.gif)
