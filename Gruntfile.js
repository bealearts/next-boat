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
  grunt.loadNpmTasks('grunt-contrib-less');


  // Temp dir
  var TempDir = require('temporary/lib/dir');
  var tempDir = new TempDir().path;


  // Project configuration.
  grunt.initConfig(
  {
    packkage: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ['build']
      }
    },
    less: {
      build: {
        files: {
          src: ['src/next-boat/**/*.less']
        }
      }
    },
    ngtemplates: {
      build: {
        options: {
          module: 'next-boat',
          concat: 'buildJS',
          base: 'src'
        },
        src: 'src/next-boat/**/**.html',
        dest: tempDir + '/templates.js'
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
            src: ['**/.htaccess', 'next-boat/assets/**/*.*', '*.*', 'lib/**/*.*'], 
            dest: 'build/'
          }
        ]
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
    manifest: {
      build: 
      {
        options: 
        {
          basePath: "./build",
          network: ["http://*", "https://*"],
          fallback: [],
          exclude: [],
          preferOnline: true,
          timestamp: true
        },
        src: ["**/*.*"],
        dest: "./build/manifest.appcache"
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
        'less',
        'ngtemplates',
        'copy',
        'bower',
        'concat',
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