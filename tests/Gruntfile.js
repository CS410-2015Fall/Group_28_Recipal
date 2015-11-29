module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    simplemocha: {
      backend: {
        src: ['node_modules/deepcopy/deepcopy.js',
              'spec/server/**/*.js']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['simplemocha', 'karma']);
};