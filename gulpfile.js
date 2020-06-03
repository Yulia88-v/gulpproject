'use strict'

let gulp = require('gulp'),
     less = require('gulp-less'),
	 browserSync = require('browser-sync').create(),
	 concat = require('gulp-concat'),
	 uglifyjs = require('gulp-uglifyjs'),
	 rename = require('gulp-rename'),
	 cssnano = require('gulp-cssnano'),
	 del = require('del'),
	 imagemin = require('gulp-imagemin'),
	 pngquant = require('imagemin-pngquant'),
	 cache = require ('gulp-cache'),
	 autoprefixer = require('gulp-autoprefixer'),
	 spritesmith = require('gulp.spritesmith');

gulp.task('hello', gulp.series(function(){
	console.log('Привет');
	}));
	
	
/*Less*/
let to_less = done =>{
	return gulp.src('app/less/**/*.less')
	.pipe(less())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())+
	console.log('main.less с конвертированы и обёединены и успешно с конвертированы с файлами css  и помещены в папку app')+
	done();
	};
/*Less*/

/*Browser Sync*/
 let browser_sync = done =>{
	  browserSync.init({
		   server:{
			   baseDir: "./app"
			   },
			   notify:false
		  });
		  console.log('Сервер запущен');
		  done();
	 };
/*Browser Sync*/

/*Scripts*/
let scripts = done =>{
	return gulp.src([
	 './app/libs/jquery/dist/jquery.min.js',
	 './app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglifyjs())
	.pipe(gulp.dest('./app/js'))+
	console.log("js- файлы библиотек для front-end успешно объединенны и минифицированы")+
	done();
	};
/*Scripts*/

/*CSS libs*/
let css_libs = done =>{
	 return gulp.src('./app/css/libs.css')
	 .pipe(cssnano())
	 .pipe(rename({suffix:'.min'}))
	 .pipe(gulp.dest('./app/css'))+
	 console.log('libs.css  минифицирован')+
	 done();
	};
/*CSS libs*/

/*Watch*/
 let watch = () => {
	 gulp.watch('./app/less/**/*.less', to_less);
	 gulp.watch('./app/*.html').on('change', browserSync.reload);
	 gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
	 console.log('Отслеживание файлов активировано');
	 };
/*Watch*/

/*Clean dist directory*/
 let clean = done => {
	  return del.sync('dist') +
	  console.log('Папка dist удалена..') +
	  done();
	 };
/*Clean dist directory*/

/*Clear cache if change images directory*/
let clear = done =>{
	return cache.clearAll() + console.log('Кеш успешно очищен...') +
	done();
	};
/*Clear cache if change images directory*/

/*Sprite for images*/
   let sprite = () => {
	   let spriteData = gulp.src('./app/img/sprite/*.png')
	    .pipe(spritesmith({
			 imgName: 'sprite.png',
			 cssName: 'sprite.css',
		}));
		return spriteData.pipe(gulp.dest('./app/img/sprite'));
	   };
/*Sprite for images*/

/*Optimize images*/
let img = done => {
	 return gulp.src('./app/img/**/*')
	 .pipe(cache(imagemin({
		  interced: true,
		  progressive: true,
		  svgPlugins: [{removeViewBox:false}],
		  use:[pngquant]
	 })))
	 .pipe(gulp.dest('dist/img')) + 
	 console.log('Изображения успешно оптимизированы...') +
	 done();
	};
/*Optimize images*/

/*Build*/
let build = done =>{
	 let buildCss = gulp.src(['./app/css/main.css', './app/css/libs.min.css'])
	 .pipe(gulp.dest('dist/css'));/*styles to dist direcory*/
	 
	 let buildFonts = gulp.src('./app/fonts/**/*')
	 .pipe(gulp.dest('dist/fonts'));/*fonts to dist directory*/
	 
	 let buildJs = gulp.src('./app/js/**/*')
	 .pipe(gulp.dest('dist/js'));/*js to dist directory*/
	 
	 let buildHtml = gulp.src('./app/*.html')
	 .pipe(gulp.dest('dist'));/*Html to dist directory*/
	 
	 console.log('Проект слздан. Теперь можно залить его на сервер...');
	 done();
	};
/*Build*/
gulp.task('browser-sync', browser_sync);
gulp.task('less', to_less);
gulp.task('css-libs', gulp.series(to_less, css_libs));
gulp.task('scripts', scripts);
gulp.task('clean', clean);
gulp.task('clear', clear);
gulp.task('sprite',sprite);
gulp.task('img', img);
gulp.task('build', gulp.parallel(clean, img,  to_less, scripts, build));
//gulp.task('watch', gulp.parallel(browser_sync, css_libs, to_less, scripts, sprite, watch));
gulp.task('default', gulp.parallel(browser_sync, css_libs, to_less, scripts, sprite, watch));