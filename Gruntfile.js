module.exports = function(grunt) {

  // Tasks
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-copy');

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
    }
  });

  grunt.registerTask('default', [
        'copy',
        'manifest'
  ]);

};