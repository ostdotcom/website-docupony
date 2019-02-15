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
    kit_docs_build_src: './kit/website/build/**/*',
    kit_sdk_build_src: './kit/sdk/website/build/**/*',
    kit_api_build_src: './kit/api/build/**/*',

    kit_docs_build_dest: './build-root',
    kit_sdk_build_dest: './build-root/kit/docs/',
    kit_api_build_dest: './build-root/kit/docs/api',
    
    kit_sdk_docs_src: './build-root/kit/docs/sdk/docs/**/*',
    kit_sdk_docs_dest: './build-root/kit/docs/sdk'
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



// =================================== KIT TASKS =============================================

gulp.task('clean-kit', function() {
    return  del('./kit/sdk/website/build/**', {force: true}) && 
     del('./kit/api/build/**', {force: true}) &&
     del('./kit/website/build/**', {force: true});
 });
 

// Building docs, sdk, api
gulp.task('build-kit-docs-with-setup', run(docusaurus_build_cmd_with_setup, {cwd: './kit/website'}));

gulp.task('build-kit-sdk-with-setup', run(docusaurus_build_cmd_with_setup, {cwd: './kit/sdk/website'}));

gulp.task('build-kit-api-with-setup', run(slate_build_cmd_with_setup, {cwd: './kit/api'}));


gulp.task('build-kit-docs', run(docusaurus_build_cmd, {cwd: './kit/website'}));

gulp.task('build-kit-sdk', run(docusaurus_build_cmd, {cwd: './kit/sdk/website'}));

gulp.task('build-kit-api', run(slate_build_cmd, {cwd: './kit/api'}));

// copying docs, sdk, api
gulp.task('copy-kit-docs-build', function() {
    return gulp.src(path.kit_docs_build_src).pipe(gulp.dest(path.kit_docs_build_dest));
});

gulp.task('copy-kit-sdk-build', function() {
    return gulp.src(path.kit_sdk_build_src).pipe(gulp.dest(path.kit_sdk_build_dest));
});

gulp.task('copy-kit-api-build', function() {
    return gulp.src(path.kit_api_build_src).pipe(gulp.dest(path.kit_api_build_dest));
});

// additional tasks for sdk
gulp.task('clean-kit-sdk-build', function() {
    return del('./build-root/kit/docs/sdk/docs/**', {force: true});
});

gulp.task('change-kit-sdk-build-links', function() {
    return gulp.src(path.kit_sdk_docs_src).pipe(replace( /(\/kit\/docs\/sdk\/docs)/g, function(match) {
        return '/kit/docs/sdk';
    })).pipe(gulp.dest(path.kit_sdk_docs_dest));
});


gulp.task('kit-build-with-setup', gulp.parallel( 'build-kit-sdk-with-setup','build-kit-docs-with-setup', 'build-kit-api-with-setup'));
gulp.task('kit-build', gulp.parallel( 'build-kit-sdk','build-kit-docs', 'build-kit-api'));

gulp.task('kit-copy', gulp.series('copy-kit-docs-build', 'copy-kit-sdk-build', 'copy-kit-api-build', 'change-kit-sdk-build-links', 'clean-kit-sdk-build'));

gulp.task('generate-kit-docs', gulp.series('clean-kit', 'kit-build-with-setup', 'kit-copy'));
gulp.task('generate-kit-docs-local', gulp.series('clean-kit', 'kit-build', 'kit-copy'));


gulp.task('clean-all', gulp.parallel('clean-kit', 'clean-kyc'));

gulp.task('generate-all-docs', gulp.parallel('generate-kit-docs', 'generate-kyc-docs'));


gulp.task('generate-all-docs-local', gulp.parallel('generate-kit-docs-local', 'generate-kyc-docs-local'))



// ================================== LOCAL DEV TASKS =======================================

var buildAndReload = function(path) {
    var paths = path.split('/');

    if(paths[0] == 'kit' && paths[1] == 'sdk') {
        return gulp.series('build-kit-sdk', 'kit-copy', 'reload')();
    }
    else if (paths[0] == 'kyc' && paths[1] == 'sdk') {
        return gulp.series('build-kyc-sdk', 'kyc-copy','reload')();

    }
    else if(paths[0] == 'kit' && paths[1] == 'api') {
        return gulp.series('build-kit-api', 'kit-copy','reload')();

    }
    else if(paths[0] == 'kyc' && paths[1] == 'api') {
        return gulp.series('build-kyc-api', 'kyc-copy','reload')();

    }
    else if (paths[0] == 'kit' && (paths[1] == 'docs' || paths[1] == 'website') ) {
        return gulp.series('build-kit-docs','kit-copy', 'reload')();

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
        'kyc/website/sidebar.json',
        'kyc/website/siteConfig.js', 
        'kyc/sdk/docs/**/*',
        'kyc/sdk/website/static/**/*',
        'kyc/sdk/website/sidebar.json',
        'kyc/sdk/website/siteConfig.js',
        
        'kyc/api/source/**/*',
        'kit/docs/**/*',
        'kit/website/static/**/*',
        'kit/website/sidebar.json',
        'kit/website/siteConfig.js', 
        'kit/sdk/docs/**/*',
        'kit/sdk/website/static/**/*',
        'kit/sdk/website/sidebar.json',
        'kit/sdk/website/siteConfig.js',
        'kit/api/source/**/*'
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
