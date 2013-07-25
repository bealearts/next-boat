module.exports = function(grunt) {

  // Libs
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-angular-templates');


  // Project configuration.
  grunt.initConfig(
  {
    packkage: grunt.file.readJSON('package.json'),
    manifest: grunt.file.readJSON('manifest.json'),
    clean: {
      build: {
        src: ['build']
      }
    },
    bower: {
      build: {
        options: {
          targetDir: 'build/lib',
          copy: true,
          cleanBowerDir: true
        } 
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/.htaccess', '**/*.*', '!next-boat/**/*.js'], 
            dest: 'build/'
          }
        ]
      }
    },
    ngtemplates: {
      build: {
        module: 'next-boat',
        src: 'src/next-boat/view/**.html',
        dest: 'build/next-boat/templates.js'
      }
    },
    concat: {
      buildJS: {
        options: {
          banner: '(function(){\n\n"use strict";\n\nvar module = angular.module(\'next-boat\', []);\n\n',
          footer: '\n\n}.call({}));'
        },
        src: ['src/next-boat/**/*.js'],
        dest: 'build/next-boat/next-boat.js'
      },
      buildCSS: {
        src: ['src/next-boat/**/*.css'],
        dest: 'build/next-boat/next-boat.css'
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
      main: {
          files: ['*.*', 'src/**/*.*'],
          tasks: 'build'
      }
}
  });



  // Tasks
  grunt.registerTask('build', [
        'clean',
        'copy',
        'bower',
        'manifest',
        'ngtemplates',
        'concat'
  ]);

  grunt.registerTask('deploy', [
        'build',
        'ftp-deploy'
  ]);

  grunt.registerTask('default', [
        'build'
  ]);


};