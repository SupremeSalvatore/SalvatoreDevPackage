// Require paths for task runners

const gulp = require("gulp");
const imagemin = require('gulp-imagemin');
// const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
// const autoprefixer = require("gulp-autoprefixer");
const browserSync= require("browser-sync").create();


// Top level functions

//gulp.task - defining tasks
//gulp.src - input
//gulp.dest - output
//gulp.watch - updating


// Copy all HTML Files

gulp.task("copyHtml", function () {
      gulp.src("source/*.html")
            .pipe(gulp.dest("public"))
            .pipe(browserSync.stream());
})

// Include necessary javascript in source and public

gulp.task("copyJs", function () {
      gulp.src(["node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", "node_modules/jquery/dist/jquery.slim.min.js", "node_modules/wowjs/dist/wow.min.js"])
            .pipe(gulp.dest("public/js"));
})

gulp.task("copyMyJs", function(){
      gulp.src("source/js/*.js")
      .pipe(gulp.dest("public/js"))
      .pipe(browserSync.stream());
})

// Copy CSS

gulp.task("copyCss", function(){
      gulp.src(["node_modules/font-awesome/css/font-awesome.min.css","node_modules/animate.css/animate.min.css"])
            .pipe(gulp.dest("public/css"));
})


// MINIFY JS

// gulp.task("uglifyJs", function () {
//       gulp.src("source/js/*.js")
//             .pipe(uglify())
//             .pipe(gulp.dest("../public/js"))
// })

// MINIFY IMAGE

gulp.task("imageMin", function () {
      gulp.src("source/images/*")
            .pipe(imagemin())
            .pipe(gulp.dest("public/images"));
})

// Adding Icons

gulp.task("copyIcons", function(){
      gulp.src(["source/icons/*"])
      .pipe(gulp.dest("public/icons"));
})

gulp.task("copyIconsW", function(){
      gulp.src(["source/icons/weather/*"])
      .pipe(gulp.dest("public/icons/weather"));
})


// UPDATE SASS

gulp.task("sass", function () {
      gulp.src(["source/scss/*.scss","source/scss/hoverButtons/*.scss"])
      
            .pipe(sass())
            // .pipe(autoprefixer())
            .pipe(sass().on("error", sass.logError))
            .pipe(gulp.dest("public/css"))
            .pipe(browserSync.stream());

})

gulp.task("server",["copyHtml", "copyJs", "copyMyJs", "sass", "imageMin", "copyCss", "copyIcons", "copyIconsW"], function(){
      browserSync.init({
            server:"./public"
      });
      gulp.watch("source/images/*", ["imageMin"]);
      gulp.watch("source/icons/*", ["copyIcons"]);
      gulp.watch("source/icons/weather/*", ["copyIconsW"]);
      gulp.watch("source/scss/*.scss", ["sass"]);
      gulp.watch("source/*.html", ["copyHtml"]);
      gulp.watch("source/js/*.js", ["copyMyJs"]);
      gulp.watch("public/*.html").on("change", browserSync.reload);
      gulp.watch("public/css/*.css").on("change", browserSync.reload);
      gulp.watch("public/js/*.js").on("change", browserSync.reload);
});


// WATCHING AND UPDATING ALL CHANGES 

// gulp.task("watch", function () {
//       //    gulp.watch("source/js/*.js", ["minify"]);
//       gulp.watch("source/images/*", ["imageMin"]);
//       gulp.watch("source/sass/*.scss", ["sass"]);
//       // gulp.watch("source/sass/*.sass", ["sass"]);
//       gulp.watch("source/*.html", ["copyHtml"]);
//       gulp.watch("source/js/*.js", ["copyAllJs"]);
//       gulp.watch("public/*.html").on("change", browserSync.reload);
//       gulp.watch("source/sass/*.scss").on("change", browserSync.reload);
// })

// PERFORM ALL TASK RUNNERS USING GULP ON CMD 
// copyHtml, copyAllJs, copyCss, uglifyJs, imageMin, sass, autoprefixer, server, watch, copyIcons

gulp.task("default", ["server"]);