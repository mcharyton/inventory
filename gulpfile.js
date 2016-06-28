/**
 * Created by m.charyton on 27.06.2016.
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var qunit = require('gulp-qunit');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var htmlreplace = require('gulp-html-replace');
var runSequence = require('run-sequence');
var del = require('del');

// configuration
var paths = {
    allScripts: ['gulpfile.js',
        'src/js/*.js',
        'test/**/*.js'
    ],
    vendors: [
        'src/js/lib/jquery/dist/jquery.min.js',
        'src/js/lib/jquery-ui/ui/jquery-ui.js',
        'src/js/lib/knockout/dist/knockout.debug.js',
        'src/js/lib/knockout-sortable/build/knockout-sortable.js'
    ],
    htmls: 'src/index.html',
    css: 'src/css/*.css',
    // other matters
    scripts: [
        'src/js/app.js',
    ]
};

// cleaning everything in build including
// removing build folder
gulp.task('clean', function() {
    return del(['build']);
});

// minify, and rename css file
gulp.task('styles', function() {
    return gulp.src(paths.css)
        .pipe(cssmin())
        .pipe(rename('site.min.css'))
        .pipe(gulp.dest('build/css'));
});

// replace minified scripts/css and minify html
gulp.task('html', function() {
    return gulp.src(paths.htmls)
        // all <!-- build:css|app|lib --> will be replaced
        // with values below
        .pipe(htmlreplace({
            'css': 'css/site.min.css',
            'app': 'js/app.min.js',
            'lib': 'js/lib/vendor.min.js',
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('build'));
});

// just copy images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('build/images'));
})

// minify vendors
gulp.task('vendors', function() {
    return gulp.src(paths.vendors)
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('build/js/lib'));
});

// minify all scripts
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('build/js'));
});

// run tests
gulp.task('test', function() {
    return gulp.src('test/**/*.html')
        .pipe(qunit());
});

// lint all js code
gulp.task('lint', function() {
    return gulp.src(paths.allScripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// watch for changes on js code
gulp.task('watch', function() {
    gulp.watch(paths.allScripts, ['lint']);
});

// execute build with all tasks after clean
// is finished
gulp.task('build', function(callback) {
    runSequence('clean', ['test', 'styles', 'scripts', 'vendors', 'html', 'images'],
        callback
    )
})

gulp.task('default', function() {
    // empty
});