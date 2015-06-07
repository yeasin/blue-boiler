module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

      // Basic http server for development perpose only
     'http-server': { 
        'dev': {
 
            // the server root directory 
            root: './', 
            // the server port 
            // can also be written as a function, e.g. 
            // port: function() { return 8282; } 
            port: 8000,            
 
            // the host ip address 
            // If specified to, for example, "127.0.0.1" the server will  
            // only be available on that ip. 
            // Specify "0.0.0.0" to be available everywhere 
            host: "0.0.0.0",
 
            // cache: <sec>,
            showDir : true,
            autoIndex: true,
 
            // server default file extension 
            ext: "html",
 
            // run in parallel with other tasks 
            runInBackground: false,
 
            // specify a logger function. By default the requests are 
            // sent to stdout. 
            logFn: function(req, res, error) { }
 
        }
      },


      // Wires up the bower dependencies
      'wiredep': {
        task: {
          // Point to the files that should be updated when
          // you run `grunt wiredep`
          src: [
            'index.html'
          ],          
        }
      },

      //  Includes all the js files inside scripts folder to index.html automatically
      'injector': {
        options: {},
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
            spawn: false,
            livereload: true,
          },
        },
      }
    
  });  

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  // Loading dependencies
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-http-server'); 


  /*
  *   grunt tasks
  */

  // Default task(s).
  grunt.registerTask('default', ['wiredep', 'injector', 'http-server', 'watch']);

};