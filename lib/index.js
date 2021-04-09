const { src, dest, parallel, series, watch } = require('gulp');

const del = require('del');
const browserSync = require('browser-sync');

const loadPlugins = require('gulp-load-plugins');

const plugins = loadPlugins();
const bs = browserSync.create();
const cwd = process.cwd();
let config = {
  // default config
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**',
    },
  },
};

try {
  const loadConfig = require(`${cwd}/pages.config.js`);
  // console.log('loadConfig :', loadConfig);
  config = {
    ...config,
    ...loadConfig,
  };
} catch (error) {
  throw error;
}

const clean = () => {
  // temp: useref
  return del([config.build.dist, config.build.temp]);
};

const style = () => {
  return src(config.build.paths.styles, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(
      plugins.sass({
        outputStyle: 'compressed', // 'expanded',
      })
    )
    .pipe(dest(config.build.dist));
  // .pipe(bs.reload({stream: true}))
};

const script = () => {
  return src(config.build.paths.scripts, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(
      plugins.babel({
        presets: [require('@babel/preset-env')],
      })
    )
    .pipe(dest(config.build.temp));
};

const page = () => {
  return src(config.build.paths.pages, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.swig({ data: config.data, caches: false }))
    .pipe(dest(config.build.temp));
};

const image = () => {
  return src(config.build.paths.images, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist));
};

const font = () => {
  return src(config.build.paths.fonts, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist));
};

const extra = () => {
  return src('**', {
    base: config.build.public,
    cwd: config.build.public,
  }).pipe(dest(config.build.dist));
};

const serve = () => {
  watch(
    config.build.paths.styles,
    {
      cwd: config.build.public,
    },
    style
  );
  watch(
    config.build.paths.scripts,
    {
      cwd: config.build.public,
    },
    script
  );
  watch(
    config.build.paths.pages,
    {
      cwd: config.build.public,
    },
    page
  );
  // watch('src/assets/images/**', image);
  // watch('src/assets/fonts/**', font);
  // watch('public/**', extra);

  watch(
    [config.build.paths.images, config.build.paths.fonts],
    { cwd: config.build.src },
    bs.reload
  );
  watch(['**'], { cwd: config.build.public }, bs.reload);

  // [options](http://www.browsersync.cn/docs/options/)
  bs.init({
    notify: false,
    port: 3003,
    // open: false,
    files: 'temp/**', // ! => .pipe(bs.reload({stream: true}))
    server: {
      // ! 本地环境无需 watch : image/font
      baseDir: [config.build.temp, config.build.src, config.build.public],
      // 路由
      routes: {
        '/node_modules': 'node_modules',
      },
    },
  });
};

const useref = () => {
  return (
    src(config.build.paths.pages, {
      base: config.build.temp,
      cwd: config.build.temp,
    })
      .pipe(
        plugins.useref({
          searchPath: [config.build.temp, '.'],
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
      .pipe(dest(config.build.dist))
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
