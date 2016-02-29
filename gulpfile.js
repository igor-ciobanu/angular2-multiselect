const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tscConfig = require('./tsconfig.json');
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const runSequence = require('run-sequence').use(gulp);

// sass linting
gulp.task('sassLint', function () {
    gulp.src('demo/assets/sass/**/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

// typescript linting
gulp.task('tsLint', function() {
    return gulp.src('demo/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('dist/**/*');
});

// Sass compile
gulp.task('sassCompile', function () {
    return gulp.src('demo/assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist/assets/css'));
});

// TypeScript compile
gulp.task('tsCompile', function () {
    return gulp.src('demo/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));
});

// copy static assets
gulp.task('copy:assets', function() {
    return gulp.src([
        'demo/**/*',
        '!demo/**/*.ts',
        '!demo/assets/sass/**/*.scss',
        '!demo/assets/sass',
        '!demo/assets/sass/**'
    ]).pipe(gulp.dest('dist'))
});

// copy dependencies
gulp.task('copy:libs', function() {
    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/immutable/dist/immutable.js',
        'node_modules/node-uuid/uuid.js'
    ]).pipe(gulp.dest('dist/libs'))
});

//copy component
gulp.task('copy:component', function() {
    return gulp.src([
        'component/**/*'
    ]).pipe(gulp.dest('demo/app'))
});

// Run watch for demo changes
gulp.task('serve', ['build'], function() {
    gulp.watch('demo/**/*.html', ['copy:assets']);
    gulp.watch('demo/app/**/*.ts', ['tsCompile', 'copy:libs']);
    gulp.watch('demo/assets/sass/**/*.scss', ['sassCompile']);
});

gulp.task('build', function() {
    runSequence(['tsLint', 'sassLint', 'clean'], ['tsCompile', 'sassCompile', 'copy:libs', 'copy:component', 'copy:assets']);
});

gulp.task('default', ['build']);