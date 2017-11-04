//initialize all of our variables
var app, base, concat, directory, gulp, gutil, hostname, path, refresh, sass, uglify, imagemin, minifyCSS, del, autoprefixer, gulpSequence, shell, sourceMaps, plumber;

var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

//load all of our dependencies
//add more here if you want to include more libraries
gulp = require('gulp');
gutil = require('gulp-util');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
sass = require('gulp-sass');
sourceMaps = require('gulp-sourcemaps');
imagemin = require('gulp-imagemin');
minifyCSS = require('gulp-minify-css');
autoprefixer = require('gulp-autoprefixer');
gulpSequence = require('gulp-sequence').use(gulp);
shell = require('gulp-shell');
plumber = require('gulp-plumber');



//compressing images & handle SVG files
gulp.task('images', function(tmp) {
    gulp.src(['src/assets/images/*.jpg', 'src/assets/images/*.png'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('src/assets/images'));
        });

//compressing images & handle SVG files
gulp.task('images-deploy', function() {
    gulp.src(['src/assets/images/**/*', '!src/assets/images/README'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/images'));
        });

//compiling our Javascripts
gulp.task('scripts', function() {
    //this is where our dev JS scripts are
    return gulp.src(['src/assets/scripts/src/_includes/**/*.js', 'src/assets/scripts/src/**/*.js'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        //this is the filename of the compressed version of our JS
        .pipe(concat('app.js'))
        //catch errors
        .on('error', gutil.log)
        //where we will store our finalized, compressed script
        .pipe(gulp.dest('src/assets/scripts'))

        });

//compiling our Javascripts for deployment
gulp.task('scripts-deploy', function() {
    //this is where our dev JS scripts are
    return gulp.src(['src/assets/scripts/src/_includes/**/*.js', 'src/assets/scripts/src/**/*.js'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        //this is the filename of the compressed version of our JS
        .pipe(concat('app.js'))
        //compress :D
        .pipe(uglify())
        //where we will store our finalized, compressed script
        .pipe(gulp.dest('dist/assets/scripts'));
        });

//compiling our SCSS files
gulp.task('styles', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('src/assets/styles/scss/init.scss')
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
            }))
        //get sourceMaps ready
        .pipe(sourceMaps.init())
        //include SCSS and list every "include" folder
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
            'src/assets/styles/scss/'
            ]
            }))
        .pipe(autoprefixer({
            browsers: autoPrefixBrowserList,
            cascade: true
            }))
        //catch errors
        .on('error', gutil.log)
        //the final filename of our combined css file
        .pipe(concat('styles.css'))
        //get our sources via sourceMaps
        .pipe(sourceMaps.write())
        //where to save our final, compressed css file
        .pipe(gulp.dest('src/assets/styles'))

        });

//compiling our SCSS files for deployment
gulp.task('styles-deploy', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('src/assets/styles/scss/init.scss')
    .pipe(plumber())
        //include SCSS includes folder
        .pipe(sass({
            includePaths: [
            'src/assets/styles/scss',
            ]
            }))
        .pipe(autoprefixer({
            browsers: autoPrefixBrowserList,
            cascade: true
            }))
        //the final filename of our combined css file
        .pipe(concat('styles.css'))
        .pipe(minifyCSS())
        //where to save our final, compressed css file
        .pipe(gulp.dest('dist/assets/styles'));
        });



//migrating over all HTML files for deployment
gulp.task('html-deploy', function() {
   
    //grab any hidden files too
    gulp.src('src/assets/.*')
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets'));

        gulp.src('src/assets/fonts/**/*')
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/fonts'));

    //grab all of the styles
    gulp.src(['src/assets/styles/*.css', '!src/assets/styles/styles.css'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/styles'));
        });

//cleans our dist directory in case things got deleted
gulp.task('clean', function() {
    return shell.task([
        'rm -rf dist'
        ]);
    });

//create folders using shell
gulp.task('scaffold', function() {
    return shell.task([
        'rm -rf dist',
        'mkdir dist/assets',
        'mkdir dist/assets/fonts',
        'mkdir dist/assets/images',
        'mkdir dist/assets/scripts',
        'mkdir dist/assets/styles'
        ]);
    });

//this is our master task when you run `gulp` in CLI / Terminal
//this is the main watcher to use when in active development
//  this will:
//  compress all scripts and SCSS files
gulp.task('default', ['scripts', 'styles'], function() {
    //a list of watchers, so it will watch all of the following files waiting for changes
    gulp.watch('src/assets/scripts/src/**', ['scripts']);
    gulp.watch('src/assets/styles/scss/**', ['styles']);
    gulp.watch('src/assets/images/**', ['images']);
    gulp.watch('src/assets/*.html', ['html']);
    });

//this is our deployment task, it will set everything for deployment-ready files
gulp.task('deploy', gulpSequence('clean', 'scaffold', ['scripts-deploy', 'styles-deploy', 'images-deploy'], 'html-deploy'));