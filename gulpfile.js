/**
 * Icon Component Style for tingle
 * @author fushan, hanyu
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

var gulp = require('gulp');
var fs = require('fs');

var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var webpack = require('webpack');

// http://browsersync.io/
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// https://github.com/floridoo/gulp-sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// https://github.com/stevelacy/gulp-stylus
var stylus = require('gulp-stylus');

// https://github.com/wearefractal/gulp-concat
var concat = require('gulp-concat');

// https://www.npmjs.com/package/gulp-just-replace/
var replace = require('gulp-just-replace');

var gulpUniqueFile = require('gulp-unique-files');
var pathMap = require('gulp-pathmap');

//make inline svg
var svgSymbols = require('gulp-svg-symbols');
var through = require('through2');

gulp.task('pack_demo', function(cb) {
  webpack(require('./webpack.dev.js'), function (err, stats) {
    // 重要 打包过程中的语法错误反映在stats中
    console.log('webpack log:' + stats);
    if (stats.hasErrors()) {
      // 异常日志打印到屏幕
      fs.writeFileSync('./demo/dist/demo.js', [
        'document.body.innerHTML="<pre>',
        stats.toJson().errors[0].replace(/[\n\r]/g, '<br>').replace(/\[\d+m/g, '').replace(/"/g, '\\"'),
        '</pre>";',
        'document.body.firstChild.style.fontFamily="monospace";',
        'document.body.firstChild.style.lineHeight="1.5em";',
        'document.body.firstChild.style.margin="1em";',
      ].join(''));
    }
    console.info('###### pack_demo done ######');
    cb();
  });
});

gulp.task('stylus_component', function(cb) {
  gulp.src(['./src/**/*.styl'])
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src'));
  console.info('###### stylus_component done ######');
  cb();
});

gulp.task('stylus_demo', function(cb) {
  gulp.src([
      './node_modules/tingle-style/dist/tingle.css', // tingle基础样式
      './node_modules/tingle-!(style)*/src/*.css', // 依赖包样式
      './tingle/tingle-!(style)*/src/*.css', // submodule样式, tingle-style不支持submodule方式使用
      './demo/src/**/*.styl'
    ])
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(concat('demo.css'))
    .pipe(replace([{
      search: /\/\*#\ssourceMappingURL=([^\*\/]+)\.map\s\*\//g,
      replacement: '/* end for `$1` */\n'
    }]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./demo/dist'));
  console.info('###### stylus_demo done ######');
  cb();
});

// 命名方式是 xxx.svg, 会把fill都干掉
// 命名方式是 xxx.color.svg, 会保留svg中的颜色
// 命名方式是 xxx.ignore.svg, 会忽略该svg文件
function svgFilter() {
  return through.obj(function(file, enc, cb) {

    // console.log(file.path + ':\n');
    if (!!file.path.match(/\.color\.svg$/)) {
      //console.log('file.path');
      file.path = file.path.replace(/\.color\.svg$/, '.svg');
    } else if (!!file.path.match(/\.ignore\.svg$/)) {
      cb();
      return;
    } else {
      var fileContent = file.contents.toString();

      // FIXME 这个地方还要增强, `illustrator`和`sketch`导出的`svg`文件, 表示颜色的方式不一致!!!
      file.contents = new Buffer(fileContent.replace(/\sfill="[^"]*\"\s?/g, ' '));
    }

    this.push(file);
    cb();
  });
}

gulp.task('svg', function () {
  return gulp.src([
      // TODO 这个地方要考虑多皮肤
      './node_modules/tingle-*/src/svg/**/*.svg',
      './node_modules/@ali/tingle-*/src/svg/**/*.svg',
      './tingle/tingle-*/src/svg/**/*.svg',
      './demo/src/svg/**/*.svg',
      './src/svg/**/*.svg',
    ])
    .pipe(pathMap('%f'))
    .pipe(gulpUniqueFile())
    .pipe(svgFilter())
    .pipe(svgSymbols({
      templates: ['default-svg']
    }))
    .pipe(gulp.dest('./demo/dist'));
});

gulp.task('reload_by_js', ['pack_demo'], function () {
  reload();
});

gulp.task('reload_by_component_css', ['stylus_component'], function () {
  reload();
});

gulp.task('reload_by_demo_css', ['stylus_demo'], function () {
  reload();
});

gulp.task('reload_by_svg', ['svg'], function () {
  reload();
});

// 开发`Tingle component`时，执行`gulp develop` or `gulp d`
gulp.task('develop', [
  'pack_demo',
  'stylus_component',
  'stylus_demo',
  'svg'
], function() {
  browserSync({
    server: {
      baseDir: './'
    },
    open: 'external'
  });

  gulp.watch(['src/**/*.js', 'demo/src/**/*.js'], ['reload_by_js']);

  gulp.watch('src/**/*.styl', ['reload_by_component_css']);

  gulp.watch('demo/src/**/*.styl', ['reload_by_demo_css']);

  // 监听svg icon文件的变化
  gulp.watch([
    'src/svg/tingle/*.svg', // 来自tingle提供的icon
    'src/svg/custom/*.svg'  // 控件自定义的icon
  ], ['reload_by_svg']);
});

// 发布`Tingle component`之前要先build， 执行`gulp build` 或 `gulp b`
gulp.task('build', function () {
  return gulp.src(__dirname + '/src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'stage-1', 'react']
    }))
    // .pipe(uglify())
    // 独立的map文件不起作用, 先写到build后的js文件里
    // http://stackoverflow.com/questions/27671390/why-to-inline-source-maps
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
})

// 快捷方式
gulp.task('d', ['develop']);
gulp.task('b', ['build']);

// 保留nowa的命令
gulp.task('server', ['develop']);
