module.exports = function(grunt) {

  // Libs
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-bake');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Project configuration.
  grunt.initConfig(
  {
    packkage: grunt.file.readJSON('package.json'),
    manifest: grunt.file.readJSON('manifest.json'),
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['.htaccess', '**/*.*', 'service/.htaccess', '!next-boat/**/*.js'], 
            dest: 'build/'
          }
        ]
      }
    },
    bake: {
      build: {
        files: {
          'build/next-boat/next-boat.js' : 'src/next-boat/next-boat.js'
        }
      }
    },
    'ftp-deploy': {
      build: {  
        auth: {
          host: 'ftp.bealearts.co.uk',
          port: 21,
          authKey: 'upload'
        },
        src: 'build/',
        dest: '/html/bealearts.co.uk/next-boat'
      }
    },
    watch: {
      bake: {
          files: [ "src/**" ],
          tasks: "bake:build"
      }
}
  });



  // Tasks
  grunt.registerTask('build', [
        'copy',
        'manifest',
        'bake'
  ]);

  grunt.registerTask('deploy', [
        'build',
        'ftp-deploy'
  ]);

  grunt.registerTask('default', [
        'build'
  ]);


};