LIVERELOAD_PORT = 35729
lrSnippet = require("connect-livereload")(port: LIVERELOAD_PORT)
mountFolder = (connect, dir) -> connect.static require("path").resolve(dir)


# For performance reasons we're only matching one level down: 'test/spec/{,*/}*.js'
module.exports = (grunt) ->

  require("time-grunt") grunt # show elapsed time at the end
  require("load-grunt-tasks") grunt

  cfg =
    app: "app"
    dist: "dist"
    tmp: ".tmp"

  grunt.initConfig
    cfg: cfg
    env: grunt.file.readJSON('.env.json')

    watch:
      styles:
        files: ["<%= cfg.app %>/{,*/}*.css"]
        tasks: ["concat", "cssmin"]

      js:
        files: ["<%= cfg.app %>/{,*/}*.js"]
        tasks: ["copy:js"]

      livereload:
        options:
          livereload: LIVERELOAD_PORT

        files: [
          "<%= cfg.dist %>/*.html"
          "<%= cfg.dist %>/all-min.css"
#          "<%= cfg.app %>/*.html"
          "<%= cfg.dist %>/{,*/}*.js"
          "<%= cfg.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
        ]

    connect:
      options:
        port: 9000
        hostname: "localhost" # change this to '0.0.0.0' to access the server from outside
      livereload:
        options:
          middleware: (connect) ->
            [lrSnippet, mountFolder(connect, cfg.dist), mountFolder(connect, cfg.app)]
      dist:
        options:
          middleware: (connect) ->
            [mountFolder(connect, cfg.dist)]

    open:
      server:
        path: "http://localhost:<%= connect.options.port %>"

    clean:
      dist:
        files: [
          dot: true
          src: "<%= cfg.dist %>/*"
        ]
      temp: "<%= cfg.tmp %>"


    useminPrepare:
      html: "<%= cfg.app %>/index.html"
      options:
        dest: "<%= cfg.dist %>"
    usemin:
      options: dirs: ["<%= cfg.dist %>"]
      html: ["<%= cfg.dist %>/{,*/}*.html"]
      css: ["<%= cfg.app %>/{,*/}*.css"]


    copy:
      html:
        expand: true
        dot: true
        cwd: '<%= cfg.app %>'
        dest: '<%= cfg.dist %>'
        src: [
          "index.html"
          "*.{ico,png,txt}"
        ]
      js:
        expand: true
        dot: true
        cwd: '<%= cfg.app %>'
        dest: '<%= cfg.dist %>'
        src: [
          "**/*.js"
        ]

    replace:
      options:
        variables:
          client_id: "<%= env.client_id %>"
        prefix: '@@'
      html:
        files: [
          expand: true
          cwd: "<%= cfg.dist %>"
          src: "*.html"
          dest: "<%= cfg.dist %>"
        ]

    # https://github.com/jrburke/r.js/blob/master/build/example.build.js
#    requirejs:
#      oneForAll:
#        options:
#          baseUrl: "<%= cfg.app %>"
#          mainConfigFile: "<%= cfg.src.parent %>/_require_config.js"
#          skipDirOptimize: true # don't optimize non AMD files in the dir
#          name: 'core'
#          out: '<%= cfg.dist %>/all-min.js'
#          optimize: "uglify2"
#          generateSourceMaps: true
#          preserveLicenseComments: false
##          removeCombined: true # Does not accurately identify all files it has combined. Using a manual clean instead
#          skipPragmas: true # we don't use them, and they may slow the build

#    concurrent: server: ["copy:html"]

  grunt.registerTask "server", (target) ->
    return grunt.task.run(["build", "open", "connect:dist:keepalive"])  if target is "dist"
    grunt.task.run ["connect:livereload", "open", "watch"]

  grunt.registerTask "build", [
    "clean:dist"
    "useminPrepare"
    "copy:html"
    "copy:js"
    "concat"
#    "cssmin"
    "usemin"
    "replace"
  ]

  grunt.registerTask "default", ["clean", "build", "server"]
