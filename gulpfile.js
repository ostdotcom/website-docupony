var gulp = require('gulp');
var replace = require('gulp-replace');
var run = require('gulp-run-command').default;
var del = require('del');
var bs = require('browser-sync').create(); 

var path = {
    // KYC PATHS
    kyc_docs_build_src: './kyc/website/build/**/*',
    kyc_sdk_build_src: './kyc/sdk/website/build/**/*',
    kyc_api_build_src: './kyc/api/build/**/*',

    kyc_docs_build_dest: './build-root',
    kyc_sdk_build_dest: './build-root/kyc/docs/',
    kyc_api_build_dest: './build-root/kyc/docs/api',
    
    kyc_sdk_docs_src: './build-root/kyc/docs/sdk/docs/**/*',
    kyc_sdk_docs_dest: './build-root/kyc/docs/sdk',

    //KIT PATHS
    platform_docs_build_src: './platform/website/build/**/*',
    platform_sdk_build_src: './platform/sdk/website/build/**/*',
    platform_api_build_src: './platform/api/build/**/*',

    platform_docs_build_dest: './build-root',
    platform_sdk_build_dest: './build-root/platform/docs/',
    platform_api_build_dest: './build-root/platform/docs/api',
    
    platform_sdk_docs_src: './build-root/platform/docs/sdk/docs/**/*',
    platform_sdk_docs_dest: './build-root/platform/docs/sdk'
};

var docusaurus_build_cmd_with_setup = ['npm install', 'npm run build'];
var slate_build_cmd_with_setup = ['bundle install', 'bundle exec middleman build --clean'];

var docusaurus_build_cmd = ['npm run build'];
var slate_build_cmd = ['bundle exec middleman build --clean'];





// =================================== KYC TASKS =============================================

gulp.task('clean-kyc', function() {
    return  del('./kyc/sdk/website/build/**', {force: true}) &&
    del('./kyc/api/build/**', {force: true}) &&
    del('./kyc/website/build/**', {force: true});
 });

// Building docs, sdk, api
gulp.task('build-kyc-docs-with-setup', run(docusaurus_build_cmd_with_setup, {cwd: './kyc/website'}));

gulp.task('build-kyc-sdk-with-setup', run(docusaurus_build_cmd_with_setup, {cwd: './kyc/sdk/website'}));

gulp.task('build-kyc-api-with-setup', run(slate_build_cmd_with_setup, {cwd: './kyc/api'}));


// Building docs, sdk, api
gulp.task('build-kyc-docs', run(docusaurus_build_cmd, {cwd: './kyc/website'}));

gulp.task('build-kyc-sdk', run(docusaurus_build_cmd, {cwd: './kyc/sdk/website'}));

gulp.task('build-kyc-api', run(slate_build_cmd, {cwd: './kyc/api'}));





// copying docs, sdk, api
gulp.task('copy-kyc-docs-build', function() {
    return gulp.src(path.kyc_docs_build_src).pipe(gulp.dest(path.kyc_docs_build_dest));
});

gulp.task('copy-kyc-sdk-build', function() {
    return gulp.src(path.kyc_sdk_build_src).pipe(gulp.dest(path.kyc_sdk_build_dest));
});

gulp.task('copy-kyc-api-build', function() {
    return gulp.src(path.kyc_api_build_src).pipe(gulp.dest(path.kyc_api_build_dest));
});



// additional tasks for sdk
gulp.task('clean-kyc-sdk-build', function() {
    return del('./build-root/kyc/docs/sdk/docs/**', {force: true});
});

gulp.task('change-kyc-sdk-build-links', function() {
    return gulp.src(path.kyc_sdk_docs_src).pipe(replace( /(\/kyc\/docs\/sdk\/docs)/g, function(match) {
        return '/kyc/docs/sdk';
    })).pipe(gulp.dest(path.kyc_sdk_docs_dest));
});



gulp.task('kyc-build-with-setup', gulp.parallel('build-kyc-sdk-with-setup', 'build-kyc-docs-with-setup', 'build-kyc-api-with-setup'));
gulp.task('kyc-build', gulp.parallel('build-kyc-sdk', 'build-kyc-docs', 'build-kyc-api'));

gulp.task('kyc-copy', gulp.series('copy-kyc-docs-build', 'copy-kyc-sdk-build', 'copy-kyc-api-build', 'change-kyc-sdk-build-links', 'clean-kyc-sdk-build'));

gulp.task('generate-kyc-docs', gulp.series('clean-kyc','kyc-build-with-setup', 'kyc-copy'));
gulp.task('generate-kyc-docs-local', gulp.series('clean-kyc','kyc-build', 'kyc-copy'));



// =================================== OST PLatform TASKS =============================================

gulp.task('clean-platform', function() {
    return  del('./platform/sdk/website/build/**', {force: true}) && 
     del('./platform/api/build/**', {force: true}) &&
     del('./platform/website/build/**', {force: true});
 });
 

// Building docs, sdk, api
gulp.task('build-platform-docs-with-setup', run(docusaurus_build_cmd_with_setup, {cwd: './platform/website'}));

gulp.task('build-platform-sdk-with-setup', run(docusaurus_build_cmd_with_setup, {cwd: './platform/sdk/website'}));

gulp.task('build-platform-api-with-setup', run(slate_build_cmd_with_setup, {cwd: './platform/api'}));


gulp.task('build-platform-docs', run(docusaurus_build_cmd, {cwd: './platform/website'}));

gulp.task('build-platform-sdk', run(docusaurus_build_cmd, {cwd: './platform/sdk/website'}));

gulp.task('build-platform-api', run(slate_build_cmd, {cwd: './platform/api'}));

// copying docs, sdk, api
gulp.task('copy-platform-docs-build', function() {
    return gulp.src(path.platform_docs_build_src).pipe(gulp.dest(path.platform_docs_build_dest));
});

gulp.task('copy-platform-sdk-build', function() {
    return gulp.src(path.platform_sdk_build_src).pipe(gulp.dest(path.platform_sdk_build_dest));
});

gulp.task('copy-platform-api-build', function() {
    return gulp.src(path.platform_api_build_src).pipe(gulp.dest(path.platform_api_build_dest));
});

// additional tasks for sdk
gulp.task('clean-platform-sdk-build', function() {
    return del('./build-root/platform/docs/sdk/docs/**', {force: true});
});

gulp.task('change-platform-sdk-build-links', function() {
    return gulp.src(path.platform_sdk_docs_src).pipe(replace( /(\/platform\/docs\/sdk\/docs)/g, function(match) {
        return '/platform/docs/sdk';
    })).pipe(gulp.dest(path.platform_sdk_docs_dest));
});


gulp.task('platform-build-with-setup', gulp.parallel( 'build-platform-sdk-with-setup','build-platform-docs-with-setup', 'build-platform-api-with-setup'));
gulp.task('platform-build', gulp.parallel( 'build-platform-sdk','build-platform-docs', 'build-platform-api'));

gulp.task('platform-copy', gulp.series('copy-platform-docs-build', 'copy-platform-sdk-build', 'copy-platform-api-build', 'change-platform-sdk-build-links', 'clean-platform-sdk-build'));

gulp.task('generate-platform-docs', gulp.series('clean-platform', 'platform-build-with-setup', 'platform-copy'));
gulp.task('generate-platform-docs-local', gulp.series('clean-platform', 'platform-build', 'platform-copy'));


gulp.task('clean-all', gulp.parallel('clean-platform', 'clean-kyc'));

gulp.task('generate-all-docs', gulp.parallel('generate-platform-docs', 'generate-kyc-docs'));


gulp.task('generate-all-docs-local', gulp.parallel('generate-platform-docs-local', 'generate-kyc-docs-local'))



// ================================== LOCAL DEV TASKS =======================================

var buildAndReload = function(path) {
    var paths = path.split('/');

    if(paths[0] == 'platform' && paths[1] == 'sdk') {
        return gulp.series('build-platform-sdk', 'platform-copy', 'reload')();
    }
    else if (paths[0] == 'kyc' && paths[1] == 'sdk') {
        return gulp.series('build-kyc-sdk', 'kyc-copy','reload')();

    }
    else if(paths[0] == 'platform' && paths[1] == 'api') {
        return gulp.series('build-platform-api', 'platform-copy','reload')();

    }
    else if(paths[0] == 'kyc' && paths[1] == 'api') {
        return gulp.series('build-kyc-api', 'kyc-copy','reload')();

    }
    else if (paths[0] == 'platform' && (paths[1] == 'docs' || paths[1] == 'website') ) {
        return gulp.series('build-platform-docs','platform-copy', 'reload')();

    }
    else if(paths[0] == 'kyc' && (paths[1] == 'docs' || paths[1] == 'website')) {
        return gulp.series('build-kyc-docs', 'kyc-copy','reload')();
    }
}

gulp.task('reload', function(){
    return bs.reload();
})


gulp.task('serve-dev', function() {
    bs.init({
        server: {
            baseDir: "./build-root"
        }
    });
    var watcher = gulp.watch([
        'kyc/docs/**/*',
        'kyc/website/static/**/*',
        'kyc/website/sidebars.json',
        'kyc/website/siteConfig.js', 
        'kyc/sdk/docs/**/*',
        'kyc/sdk/website/static/**/*',
        'kyc/sdk/website/sidebars.json',
        'kyc/sdk/website/siteConfig.js',
        
        'kyc/api/source/**/*',
        'platform/docs/**/*',
        'platform/website/static/**/*',
        'platform/website/sidebars.json',
        'platform/website/siteConfig.js', 
        'platform/sdk/docs/**/*',
        'platform/sdk/website/static/**/*',
        'platform/sdk/website/sidebars.json',
        'platform/sdk/website/siteConfig.js',
        'platform/api/source/**/*'
    ]);


    watcher.on('change', function(path) {
        console.log(path);
        return buildAndReload(path);        
    });
    // watcher.on('change', function(path) {
    //     console.log(path);
    //     return buildAndReload(path);        
    // });
    // watcher.on('change', function(path) {
    //     console.log(path);
    //     return buildAndReload(path);        
    // });
})

gulp.task('generate-all-docs-local-server', gulp.series('generate-all-docs-local', 'serve-dev'));
