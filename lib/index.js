const { src, dest, parallel, series, watch } = require('gulp');

const del = require('del');
const browserSync = require('browser-sync');

const loadPlugins = require('gulp-load-plugins');

const plugins = loadPlugins();
const bs = browserSync.create();
const cwd = process.cwd();
let config = {};

try {
  const loadConfig = require(`${cwd}/pages.config.js`);
  config = {
    ...config,
    ...loadConfig,
  };
} catch (error) {}

const clean = () => {
  // temp: useref
  return del(['dist', 'temp']);
};

const style = () => {
  return src('src/assets/styles/*.scss', {
    base: 'src',
  })
    .pipe(
      plugins.sass({
        outputStyle: 'compressed', // 'expanded',
      })
    )
    .pipe(dest('temp'));
  // .pipe(browserSync.reload({stream: true}))
};

const script = () => {
  return src('src/assets/scripts/*.js', {
    base: 'src',
  })
    .pipe(
      plugins.babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(dest('temp'));
};

const page = () => {
  return src('src/*.html', {
    base: 'src',
  })
    .pipe(plugins.swig({ data: config.data, caches: false }))
    .pipe(dest('temp'));
};

const image = () => {
  return (
    src('src/assets/images/**', {
      base: 'src',
    })
      // .pipe(imagemin.imagemin())
      .pipe(dest('dist'))
  );
};

const font = () => {
  return (
    src('src/assets/fonts/**', {
      base: 'src',
    })
      // .pipe(imagemin.imagemin())
      .pipe(dest('dist'))
  );
};

const extra = () => {
  return src('public/**', {
    base: 'public',
  }).pipe(dest('dist'));
};

const serve = () => {
  watch('src/assets/styles/*.scss', style);
  watch('src/assets/scripts/*.js', script);
  watch('src/*.html', page);
  // watch('src/assets/images/**', image);
  // watch('src/assets/fonts/**', font);
  // watch('public/**', extra);

  watch(
    ['src/assets/images/**', 'src/assets/fonts/**', 'public/**'],
    browserSync.reload
  );

  // [options](http://www.browsersync.cn/docs/options/)
  browserSync.init({
    notify: false,
    port: 3003,
    // open: false,
    files: 'temp/**', // ! => .pipe(browserSync.reload({stream: true}))
    server: {
      // ! 本地环境无需 watch : image/font
      baseDir: ['temp', 'src', 'public'],
      // 路由
      routes: {
        '/node_modules': 'node_modules',
      },
    },
  });
};

const useref = () => {
  return (
    src('temp/*.html', {
      base: 'temp',
    })
      .pipe(
        plugins.useref({
          searchPath: ['temp', '.'],
        })
      )
      // html js css
      .pipe(plugins.if(/\.js$/, plugins.uglify()))
      .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
      .pipe(
        plugins.if(
          /\.html$/,
          plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
          })
        )
      )
      .pipe(dest('dist'))
  );
};

const compile = parallel(style, script, page);

const build = series(
  clean,
  parallel(series(compile, useref), image, font, extra)
);

const dev = series(compile, serve);

module.exports = {
  clean,
  dev,
  build,
};
