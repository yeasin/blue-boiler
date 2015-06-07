module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
            //open: true,
            livereload: true            
          }
        }
      },


      // Wires up the bower dependencies
      'wiredep': {
        task: {          
          src: [
            'index.html'
          ],          
        }
      },

      //  Includes all the js files inside scripts folder to index.html automatically
      'injector': {        
        local_dependencies: {
          files: {
            'index.html': ['scripts/**/*.js', 'assets/**/*.css'],
          }
        }
      },

      'watch': {        
        scripts: {
          files: ['scripts/**/*.js', 'assets/**/*.css', 'bower_components/**/*.js', 'bower_components/**/*.css'],
          tasks: ['wiredep', 'injector'],
          options: {            
            livereload: true,
            spawn: false,
            event: ['added', 'deleted'],
          }
        }
      }
    
  });  

  // Loading dependencies
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-connect');


  /*
  *   grunt tasks
  */

  // Default task(s).
  grunt.registerTask('default', ['wiredep', 'injector', 'connect', /*'express',*/'watch']);

};