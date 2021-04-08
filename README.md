# duyb-cli-gulp

[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> cli for gulp web project

> static web app workflow

## Installation

```shell
$ yarn add duyb-cli-gulp

# or npm
$ npm install duyb-cli-gulp
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const duybPages = require('duyb-cli-gulp');
const result = duybPages('duyb');
// result => '1255248666@qq.com'
```

## API

<!-- TODO: Introduction of API -->

### duybPages(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'github.com'`

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; Duyb <1255248666@qq.com> (https://gihub.com/thxl2010)

[downloads-image]: https://img.shields.io/npm/dm/duyb-cli-gulp.svg
[downloads-url]: https://npmjs.org/package/duyb-cli-gulp
[version-image]: https://img.shields.io/npm/v/duyb-cli-gulp.svg
[version-url]: https://npmjs.org/package/duyb-cli-gulp
[license-image]: https://img.shields.io/github/license/duyb/duyb-cli-gulp.svg
[license-url]: https://github.com/duyb/duyb-cli-gulp/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/duyb/duyb-cli-gulp.svg
[dependency-url]: https://david-dm.org/duyb/duyb-cli-gulp
[devdependency-image]: https://img.shields.io/david/dev/duyb/duyb-cli-gulp.svg
[devdependency-url]: https://david-dm.org/duyb/duyb-cli-gulp?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
