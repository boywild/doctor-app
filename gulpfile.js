var gulp = require("gulp");
var watch = require("gulp-watch");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var pxtorem = require("postcss-pxtorem");
var webserver = require("gulp-webserver");
sass.compiler = require("node-sass");

gulp.task("sass", function () {
  var processors = [
    autoprefixer({
      overrideBrowserslist: ["defaults"],
    }),
    pxtorem({
      propList: ["*"],
      replace: true,
    }),
  ];
  gulp
    .src("./src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest("./src/css"));
});

gulp.task("webserver", function () {
  gulp.src("./src").pipe(
    webserver({
      livereload: true,
      directoryListing: true,
      path: "/",
      open: 'home.html',
      port: 3003,
      selectorBlackList: ['van-']
    })
  );
});
gulp.task("sass:watch", function () {
  watch(["./src/scss/", "./src/scss/*.scss"], gulp.series("sass"));
});
gulp.task("start", gulp.parallel("webserver", "sass:watch"));
