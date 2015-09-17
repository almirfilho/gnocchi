module.exports = (grunt) ->
  require('load-grunt-tasks') grunt

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    banner: grunt.file.read 'grunt/banner.txt'

  grunt.loadTasks 'grunt'
