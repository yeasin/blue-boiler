module.exports = function(grunt) {

  // Loading dependencies
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),    

    //  Includes all the js files inside scripts folder to index.html automatically
    'injector': {
      dev_injector: {
        files: {
          'index.html': ['bower.json', 'scripts/**/*.js', 'assets/**/*.css'],
        }
      },
      prod_injector: {
        files: {
          'dist/index.html': ['dist/assets/*.js', 'dist/assets/*.css'],
          options: {
            relative: false
          }
        }
      }      
    },

    'concat': {
      dist: {
        src: ['scripts/**/*.js'],
        dest: 'dist/assets/<%= pkg.name %>-<%= pkg.version %>.js',
      },
    },

    'uglify': {
      'application_files': {
        files: {
          'dist/assets/<%= pkg.name %>-<%= pkg.version %>.js': ['scripts/**/*.js']
        }
      },
      'vendor_files': {
        files: {
          'dist/assets/vendor-<%= pkg.version %>.js': ['dist/assets/vendor-<%= pkg.version %>.js']
        }
      }
    },

    'bower_concat': {
      all: {
        dest: 'dist/assets/vendor-<%= pkg.version %>.js',
        cssDest: 'dist/assets/vendor-<%= pkg.version %>.css',                
        bowerOptions: {
          relative: false
        }
      }
    },

    'copy': {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['index.html', ], dest: 'dist/', filter: 'isFile'}
        ]
      },
    },

    'clean': {
      build: ["dist/"]
    },

    // Basic http server for development perpose only
    'express': {
      server: {
        options: {
          port: 8000,
          hostname: '0.0.0.0',
          bases: ['./'],
          open: true,
          livereload: true
        }
      }
    },
    'connect': {
      all: {
        options: {
          base: './',
          port: 8000,
          hostname: '0.0.0.0',
          open: true,
          livereload: true,
          middleware: function (connect) {
            return [
              require('connect-livereload')(),
              connect.static('./'),    
              connect.directory('./')
            ];
          }
        }
      }
    },
    //  Watcher on files
    'watch': {
      scripts: {
        files: ['./scripts/**/*.js', './assets/**/*.css', './bower_components/**/*.js', './bower_components/**/*.css'],
        tasks: ['wiredep', 'injector'],
        options: {            
          livereload: true,
          spawn: false,
          event: ['added', 'deleted'],
        }
      }
    }
    
  }); 

  /*
  *   grunt tasks
  */

  // Default task
  grunt.registerTask('default', ['injector:dev_injector', 'connect', 'watch']);

  // Deploy application
  grunt.registerTask('deploy', ['clean', 'bower_concat', 'uglify', 'copy', 'injector:prod_injector']);

};