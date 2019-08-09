const {src, dest, series, parallel} = require('gulp')
const changed = require('gulp-changed')
const debug = require('gulp-debug')
const imageResize = require('gulp-image-resize')
const { exec } = require('child_process')

function jekyllBuild(cb) {
  exec('jekyll build', (error, stdout, stderr) => {
    if (error) {
      //console.error(`exec error: ${error}\n${stderr}`);
      cb(error, stdout, stderr)
    }
    console.log(stdout);
    console.log(`stderr: ${stderr}`);
    cb(error, stdout, stderr)
  })
}

function bootstrap_js() {
    return src([
      "./node_modules/bootstrap/dist/js/bootstrap.min.*",
      "./node_modules/jquery/dist/jquery.slim.*",
      "./node_modules/popper.js/dist/umd/popper.min.*",
      "./node_modules/holderjs/holder.min.*",
    ])
    .pipe(debug({title:'boostrap:js'}))
    .pipe(dest("./assets/vendor"))
}

function bootstrap_scss() {
  return src([
    "./node_modules/bootstrap/scss/*",
  ])
  .pipe(debug({title:'boostrap:scss'}))
  .pipe(dest("./_sass/bootstrap"))
}

function bootstrap_assets(done) {
  return parallel(bootstrap_js, bootstrap_scss)(done)
}

function fontawesom_scss() {
  return src([
    "./node_modules/@fortawesome/fontawesome-free/scss/*",
  ])
  .pipe(dest("./_sass/fontawesome"))
}

function fontawesome_fonts() {
    return src([
      "./node_modules/@fortawesome/fontawesome-free/webfonts/*",
    ])
    .pipe(dest("./assets/vendor/fontawesome"))
}

function fontawesome_assets(done) {
    return parallel(fontawesom_scss, fontawesome_fonts)(done)
}
  

function generateThumbs() {
  const local_thumbs = "./thumbs/"
  return src('img/**/*.{jpg,png}')
    .pipe(changed(local_thumbs))
    .pipe(imageResize({ imageMagick: true, height: 150 }))
    .pipe(dest(local_thumbs))
    .pipe(debug({title: 'New thumbnail'}))
}

//module.exports.default = series(parallel(generateThumbs, jekyllBuild), publishSite)
module.exports.thumbs = generateThumbs
module.exports.build = parallel(jekyllBuild, generateThumbs)
module.exports.assets = parallel(bootstrap_assets, fontawesome_assets)
module.exports.default = module.exports.assets
module.exports.test = fontawesome_assets