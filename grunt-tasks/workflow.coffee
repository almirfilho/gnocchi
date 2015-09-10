module.exports = (grunt) ->
  # aliases
  grunt.registerTask 'run', 'watch'
  grunt.registerTask 'build', 'dist'
  grunt.registerTask 'server', 'concurrent'

  # general --------------------------------------------------------------------

  grunt.registerTask 'dev', [
    'scripts:dev'
    'styles:dev'
  ]

  grunt.registerTask 'dist', [
    'scripts:dist'
    'styles:dist'
  ]

  # scripts --------------------------------------------------------------------

  grunt.registerTask 'scripts:dev', [
    'eslint:source'
    'mochaTest'
  ]

  grunt.registerTask 'scripts:test', [
    'eslint:test'
    'mochaTest'
  ]

  grunt.registerTask 'scripts:dist', [
    'eslint'
    'mochaTest'
    'babel'
    'browserify'
    'uglify'
    'clean'
  ]

  # styles ---------------------------------------------------------------------

  grunt.registerTask 'styles:dev', [
    'stylus'
    'concat:styles'
    'newer:postcss'
  ]

  grunt.registerTask 'styles:dist', [
    'stylus'
    'concat:styles'
    'postcss'
    'cssmin'
  ]
