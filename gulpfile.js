var gulp = require('gulp');
var sass = require('gulp-sass');
var pipeline = require('readable-stream').pipeline;
var imagemin = require('gulp-imagemin');

gulp.task('imagemin', function () {
	return gulp.src('src/**/img/*.*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest('dist/image'));
});


gulp.task('scss', function () {
	return gulp.src('src/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('default', gulp.series(['scss', 'imagemin']));

gulp.task('watch', function () {
	gulp.watch('src/**/*.scss', gulp.series(['scss']));
});

