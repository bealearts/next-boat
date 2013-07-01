module.exports = function(grunt) {

  // Libs
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ftp-deploy');


  // Project configuration.
  grunt.initConfig(
  {
    packkage: grunt.file.readJSON('package.json'),
    manifest: grunt.file.readJSON('manifest.json'),
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['.htaccess', '**/*.*'], 
            dest: 'build/'
          }
        ]
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
    }
  });



  // Tasks
  grunt.registerTask('build', [
        'copy',
        'manifest'
  ]);

  grunt.registerTask('deploy', [
        'build',
        'ftp-deploy'
  ]);

  grunt.registerTask('default', [
        'build'
  ]);


};