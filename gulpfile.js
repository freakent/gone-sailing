const {src, dest, series, parallel} = require('gulp')
const changed = require('gulp-changed')
const debug = require('gulp-debug')
const imageResize = require('gulp-image-resize')
const rename = require('gulp-rename')
const del = require('del')
const { exec } = require('child_process')

const studio_originals = './studio/**/originals/*.{jpg,jpeg,png}'
const studio_dest = './studio'

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
      "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.*",
      "./node_modules/jquery/dist/jquery.slim.*",
      "./node_modules/popper.js/dist/umd/popper.min.*",
      "./node_modules/holderjs/holder.min.*",
    ])
    .pipe(debug({title:'boostrap:js'}))
    .pipe(dest("./assets/vendor"))
}

function bootstrap_scss() {
  let sccs = "./_sass/bootstrap/"
  del.sync(sccs)
  return src([
    "./node_modules/bootstrap/scss/**/*"
  ])
  .pipe(debug({title:'boostrap:scss'}))
  .pipe(dest(sccs))
}

function bootstrap_assets(done) {
  return parallel(bootstrap_js, bootstrap_scss)(done)
}

function fontawesome_scss() {
  return src([
    "./node_modules/@fortawesome/fontawesome-free/scss/**/*"
  ])
  .pipe(dest("./_sass/fontawesome/"))
}

function fontawesome_fonts() {
    return src([
      "./node_modules/@fortawesome/fontawesome-free/webfonts/**/*"
    ])
    .pipe(dest("./assets/vendor/fontawesome"))
}

function fontawesome_assets(done) {
    return parallel(fontawesome_scss, fontawesome_fonts)(done)
}
  

function generateThumbs() {
  const local_thumbs = "./assets/thumbs/"
  return src('./images/**/*.{jpg,png}')
    .pipe(changed(local_thumbs))
    .pipe(imageResize({ imageMagick: true, height: 150, width: 150, crop:true, noProfile:true }))
    .pipe(dest(local_thumbs))
    .pipe(debug({title: 'New thumbnail'}))
}

function generate500x500() {
  const local_thumbs = "./assets/500x500/"
  return src('./images/**/*.{jpg,png}')
    .pipe(changed(local_thumbs))
    .pipe(imageResize({ imageMagick: true, height: 500, width: 500, crop:true, noProfile:true }))
    .pipe(dest(local_thumbs))
    .pipe(debug({title: 'New 500x500'}))
}

function generateStudioThumbs() {
  return src(studio_originals)
    .pipe(rename( (path) => { path.dirname = path.dirname.replace('/originals', '/thumbs') }))
    .pipe(changed(studio_dest))
    .pipe(imageResize({ imageMagick: true, height: 150, width: 150, crop:true, noProfile:true }))
    .pipe(dest(studio_dest))
    .pipe(debug({title: 'New thumbnail'}))
}

function generateStudio250x250() {
  return src(studio_originals)
    .pipe(rename( (path) => { path.dirname = path.dirname.replace('/originals', '/250x250') }))
    .pipe(changed(studio_dest))
    .pipe(imageResize({ imageMagick: true, height: 250, width: 250, crop:true, noProfile:true }))
    .pipe(dest(studio_dest))
    .pipe(debug({title: 'New 250x250'}))
}

function generateStudio500x500() {
  return src(studio_originals)
    .pipe(rename( (path) => { path.dirname = path.dirname.replace('/originals', '/500x500') }))
    .pipe(changed(studio_dest))
    .pipe(imageResize({ imageMagick: true, height: 500, width: 500, crop:true, noProfile:true }))
    .pipe(dest(studio_dest))
    .pipe(debug({title: 'New 500x500'}))
}

//module.exports.default = series(parallel(generateThumbs, jekyllBuild), publishSite)
module.exports.thumbs = parallel(generateThumbs, generate500x500)
module.exports.build = parallel(jekyllBuild, generateThumbs)
module.exports.assets = parallel(bootstrap_assets, fontawesome_assets)
module.exports.default = module.exports.assets
module.exports.test = fontawesome_assets
module.exports.studio = parallel(generateStudioThumbs, generateStudio250x250, generateStudio500x500)
module.exports.studio_thumbs = generateStudioThumbs