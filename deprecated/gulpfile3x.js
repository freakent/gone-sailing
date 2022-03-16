var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('vendor', function() {
  gulp.src([
    "./node_modules/bootstrap/dist/js/bootstrap.min.*",
    "./node_modules/jquery/dist/jquery.slim.*",
    "./node_modules/popper.js/dist/umd/popper.min.*",
    "./node_modules/holderjs/holder.min.*",
  ])
    .pipe(gulp.dest("./assets/vendor"))

  gulp.src([
    "./node_modules/@fortawesome/fontawesome-free/scss/*",
  ])
    .pipe(gulp.dest("./_sass/fontawesome"))

  gulp.src([
    "./node_modules/@fortawesome/fontawesome-free/webfonts/*",
  ])
    .pipe(gulp.dest("./assets/vendor/fontawesome"))
});
