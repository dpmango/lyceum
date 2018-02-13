let gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat 		= require('gulp-concat'),
	uglify 		= require('gulp-uglify'),
	cssnano 	= require('gulp-cssnano'),
	prefixer 	= require('gulp-autoprefixer'),
	rename 		= require('gulp-rename'),
	del    		= require('del'),
	imagemin 	= require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	cache       = require('gulp-cache'),
	spritesmith = require('gulp.spritesmith'),
	flexbugs    = require('postcss-flexbugs-fixes'),
	postcss     = require('gulp-postcss');
	
gulp.task('sass', function () {
	return gulp.src('src/sass/**/*.+(sass|scss)')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefixer({
			browsers: ['last 10 versions'],
			remove: true,
			cascade: false
		 }))
		.pipe(postcss([flexbugs()]))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
});

gulp.task('css-libs', function () {
	return gulp.src('src/css/main.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css'));
});

gulp.task('scripts', function () {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'));
});


gulp.task('compressImages', function () {
	return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
			interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
		})))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('src/img/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.sass',
                cssFormat: 'sass', // в каком формате выводить css
                algorithm: 'binary-tree', // алгоритм сортировки иконок в спрайте
                imgPath: 'img/sprite.png', // путь до спрайта
                padding: 1,
				cssTemplate: 'src/sass/sass.template.mustache', 
				cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('src/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('src/sass/')); // путь, куда сохраняем стили
});

gulp.task('liveReload', function () {
	browserSync.init({
		server: {
			baseDir: 'src/'
		},
		notify: false
	});
});

gulp.task('watch', ['liveReload', 'sass', 'css-libs', 'scripts', 'sprite'], function () {
	gulp.watch('src/sass/**/*.+(sass|scss)', ['sass']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/*.js', browserSync.reload);
});

gulp.task('clean', function () {
	return del.sync('dist');
});

gulp.task('build', ['clean', 'sass', 'css-libs', 'scripts', 'compressImages', 'sprite'], function () {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
		
	gulp.src(['src/img/**/*', '!src/img/sprite/*'])
		.pipe(gulp.dest('dist/img'));		
		
	gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
		
	gulp.src('src/css/**/*.css')
		.pipe(gulp.dest('dist/css'));		
		
	gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('dist/js'));	
});

gulp.task('default', ['watch']);

