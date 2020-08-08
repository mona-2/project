var
    gulp=require("gulp"),
    autoprefixer=require("gulp-autoprefixer"),
    concat=require("gulp-concat"),
    livereload=require("gulp-livereload"),
    minify=require("gulp-minify"),
    notify=require ("gulp-notify"),
    pug=require("gulp-pug"),
    sass=require("gulp-sass"),
    sourcemaps=require("gulp-sourcemaps");



gulp.task('html',async function(){
     return gulp.src('stage/html/*.pug')
                .pipe(pug({pretty:true}))
                .pipe(gulp.dest('dist'))
                .pipe(livereload());
})


gulp.task('css',async function(){
     return gulp.src(["stage/css/**/*.css","stage/css/**/*.scss"])
                .pipe(sourcemaps.init())
                .pipe(sass({outputStyle:"compressed"}))
                .pipe(autoprefixer('last 10 versions'))
                .pipe(concat('main.css'))
                .pipe(sourcemaps.write("."))
                .pipe(gulp.dest('dist/css'))
                .pipe(livereload())
})


//
gulp.task('js',async function(){
     return gulp.src("stage/js/*.js")
                .pipe(concat('main.js'))
                .pipe(minify())
                .pipe(gulp.dest('dist/js'))
                .pipe(livereload());
})

gulp.task("watch",async function(){
    require('./server.js');
    livereload.listen();
    gulp.watch('stage/html/**/*.pug',gulp.series('html')) 
    gulp.watch(["stage/css/**/*.css","stage/css/**/*.scss"],gulp.series('css')) 
    gulp.watch('stage/js/*.js',gulp.series('js')) 
})
    