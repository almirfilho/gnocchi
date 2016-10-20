module.exports = (grunt) ->
  grunt.config 'mochaTest',
    test:
      src: 'test/**/*-test.js'
      options:
        reporter: 'nyan'
        require: 'babel-core/register'
