var gulp = require('gulp');
var run = require('gulp-run-command').default;
var path = {
    docs_build_src: './website/build/**/*',
    sdk_build_src: './sdk/website/build/**/*',
    api_build_src: './api/build/**/*',
    docs_build_dest: './build-root',
    sdk_build_dest: './build-root/sdk',
    api_build_dest: './build-root/api'
};

var docusaurus_build_cmd = 'yarn run build';
var slate_build_cmd = 'bundle exec middleman build';

gulp.task('build-docs', run(docusaurus_build_cmd, {cwd: './website'}));

gulp.task('build-sdk', run(docusaurus_build_cmd, {cwd: './sdk/website'}));

gulp.task('build-api', run(slate_build_cmd, {cwd: './api'}));

gulp.task('copy-docs-build', function() {
    return gulp.src(path.docs_build_src).pipe(gulp.dest(path.docs_build_dest));
});

gulp.task('copy-sdk-build', function() {
    return gulp.src(path.sdk_build_src).pipe(gulp.dest(path.sdk_build_dest));
});

gulp.task('copy-api-build', function() {
    return gulp.src(path.api_build_src).pipe(gulp.dest(path.api_build_dest));
});

gulp.task('build', gulp.parallel('build-docs', 'build-sdk', 'build-api'));

gulp.task('copy', gulp.series('copy-docs-build', 'copy-sdk-build', 'copy-api-build'));

gulp.task('generate-html', gulp.series('build', 'copy'));