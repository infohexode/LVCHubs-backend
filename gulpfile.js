var gulp = require('gulp');
let babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var del = require('del');
var zip = require('gulp-zip');

var build_files_paths = {
        root_path: ['*.js', '!gulpfile.js'],
        user_path: ['./user/*.js'],
        activities_path: ['./activities/*.js'],
        enlistPartner_path: ['./enlistPartner/*.js'],
        flightActivities_path: ['./flightActivities/*.js'],
        vacationActivities_path: ['./vacationActivities/*.js'],
        loyaltyReward_path: ['./loyaltyReward/*.js'],
        myWallet_path: ['./myWallet/*.js'],
        adminWallet_path: ['./adminWallet/*.js'],
        savingsWallet_path: ['./savingsWallet/*.js'],
        transactionHistory_path: ['./transactionHistory/*.js'],
        test_path: ['./test/*.js'],
        helper_path: ['./helper/*.js'],
        public_js_path: ['./public/**/*.js'],
        public_image_path: ['./public/img/*'],
        nonJs: ['package.json'],
        config: ['./config/*'],
        envCopy: ['./config/.env.production', './config/.env.development', './config/.env.test'],
        ssl: ['./ssl/*'],
        paymentProof_path: ['./paymentProof/*.js'],
        profile_path: ['./profile/*.js'],
};

gulp.task('clean', function () {
        return del('dist/**', { force: true });
});

gulp.task('copynojs', function () {
        return gulp.src(build_files_paths.nonJs)
                .pipe(gulp.dest('dist'));
});

gulp.task('copyimage', function () {
        return gulp.src(build_files_paths.public_image_path)
                .pipe(gulp.dest('dist/public/img'));
});

gulp.task('minifypublicjs', function () {
        return gulp.src(build_files_paths.public_js_path)
                .pipe(uglify())
                .pipe(gulp.dest('dist/public'));
});

gulp.task('minifyuser', function () {
        return gulp.src(build_files_paths.user_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/user'));
});

gulp.task('minifyactivities', function () {
        return gulp.src(build_files_paths.activities_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/activities'));
});
gulp.task('minifyenlistPartner', function () {
        return gulp.src(build_files_paths.enlistPartner_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/enlistPartner'));
});

gulp.task('minifyflightActivities', function () {
        return gulp.src(build_files_paths.flightActivities_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/flightActivities'));
});
gulp.task('minifyvacationActivities', function () {
        return gulp.src(build_files_paths.vacationActivities_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/vacationActivities'));
});

gulp.task('minifyloyaltyReward', function () {
        return gulp.src(build_files_paths.loyaltyReward_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/loyaltyReward'));
});

gulp.task('minifytest', function () {
        return gulp.src(build_files_paths.test_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/test'));
});


gulp.task('minifyhelper', function () {
        return gulp.src(build_files_paths.helper_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/helper'));
});

gulp.task('minifyroot', function () {
        return gulp.src(build_files_paths.root_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist'));
});

gulp.task('copyEnv', function () {
        return gulp.src(build_files_paths.envCopy)
                .pipe(gulp.dest('dist/config'));
});

gulp.task('minifyconfig', function () {
        return gulp.src(build_files_paths.config)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/config'));
});

gulp.task('zip', function () {
        return gulp.src('dist/**')
                .pipe(zip('artifact.zip'))
                .pipe(gulp.dest('dist'));
});

gulp.task('copySsl', function () {
        return gulp.src(build_files_paths.ssl)
                .pipe(gulp.dest('dist/ssl'));
});

gulp.task('minifyadminWallet', function () {
        return gulp.src(build_files_paths.adminWallet_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/adminWallet'));
});

gulp.task('minifysavingsWallet', function () {
        return gulp.src(build_files_paths.savingsWallet_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/savingsWallet'));
});

gulp.task('minifytransactionHistory', function () {
        return gulp.src(build_files_paths.transactionHistory_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/transactionHistory'));
});

gulp.task('minifymyWallet', function () {
        return gulp.src(build_files_paths.myWallet_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/myWallet'));
});

gulp.task('minifypaymentProof', function () {
        return gulp.src(build_files_paths.paymentProof_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/paymentProof'));
});

gulp.task('minifyprofile', function () {
        return gulp.src(build_files_paths.profile_path)
                .pipe(babel({
                        presets: ['@babel/preset-env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/profile'));
});

gulp.task('build', gulp.series('clean', 'copynojs', 'copyimage',
        'minifypublicjs', 'minifyuser', 'minifyhelper',
        'minifyroot', 'minifyconfig', 'copyEnv', 'minifyprofile',
        'minifypaymentProof', 'minifytest', 'minifymyWallet', 'minifyloyaltyReward',
        'minifyvacationActivities','copySsl', 'minifyflightActivities','minifyenlistPartner',
        'minifyactivities','minifytransactionHistory','minifysavingsWallet','minifyadminWallet'));