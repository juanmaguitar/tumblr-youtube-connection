module.exports = function(grunt) {

  grunt.initConfig({
    baseFolder: 'www',
    buildFolder: '<%= baseFolder %>/build',
    devFolder: '<%= baseFolder %>/src',
    testsFolder: '<%= baseFolder %>/test',
    tplFolder: '<%= baseFolder %>/templates',
    pkg: grunt.file.readJSON('package.json')
  });

  // jasmine
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.config('jasmine', {
    pivotal: {
      src: [
          '<%= devFolder %>/js/plugins/*.js',
          '<%= devFolder %>/js/config.*.js',
          '<%= devFolder %>/js/{auth|tumblr|youtube|main}.js',
      ],
      options: {
        specs: '<%= testsFolder %>/specs/*spec.js',
        vendor: [
          '<%= devFolder %>/bower_components/jquery/dist/jquery.js',
          '<%= devFolder %>/bower_components/bluebird/js/browser/bluebird.js',
          '<%= devFolder %>/modernizr/modernizr.custom.js',
          '<%= devFolder %>/modernizr/details/details-test.js'
        ]
      }
    }
  });

  // compass
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.config('compass', {
    dev: {
      options: {
        sassDir: '<%= devFolder %>/scss',
        cssDir: '<%= devFolder %>/css',
        outputStyle : 'nested',
        environment: 'development'
      }
    },
    prod: {
      options: {
       sassDir: '<%= devFolder %>/scss',
       cssDir: '<%= buildFolder %>',
       outputStyle : 'compressed',
       environment: 'production'
      }
    }
  });

  // targethtml
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.config('targethtml', {
    dev: {
      files: {
        '<%= baseFolder %>/index.html' : '<%= tplFolder %>/index.html.tpl'
      }
    },
    prod: {
      files: {
        '<%= baseFolder %>/index.html' : '<%= tplFolder %>/index.html.tpl'
      }
    },
    prod_debug: {
      files: {
        '<%= baseFolder %>/index.html' : '<%= tplFolder %>/index.html.tpl'
      }
    }
  });

  // jshint
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.config('jshint', {
		files: [
			'Gruntfile.js',
			'<%= devFolder %>/modernizr/details/*.js',
			'<%= devFolder %>/js/plugins/*.js',
			'<%= devFolder %>/js/*'
		],
		options: {
			// options here to override JSHint defaults
			expr : true,
			debug: true,
			globals: {
				jQuery: true,
				console: true,
				module: true,
				document: true
			}
		}
  });

  /* concat */
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.config('concat', {
      options: {
       separator: ';'
      },
      dist: {
        src: [
          '<%= devFolder %>/bower_components/jquery/dist/jquery.js',
          '<%= devFolder %>/bower_components/bluebird/js/browser/bluebird.js',
          '<%= devFolder %>/modernizr/modernizr.custom.js',
          '<%= devFolder %>/modernizr/details/details-test.js',
          '<%= devFolder %>/js/plugins/*.js',
          '<%= devFolder %>/js/config.prod.js',
          '<%= devFolder %>/js/{auth|tumblr|youtube|main}.js',
        ],
        dest: '<%= devFolder %>/tmp/<%= pkg.name %>.js'
      }
  });

   /* uglify */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= buildFolder %>/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>' ],
          '<%= buildFolder %>/details-pollyfill.min.js': ['<%= devFolder %>/modernizr/details/details-pollyfill.js' ]
        }
      }
  });

  /* watch */
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
      options: {
        livereload: '<%= connect.options.livereload %>',
      },
      all : {
        files: ['<%= jshint.files %>', '<%= devFolder %>/scss/*', '<%= tplFolder%>/* '],
        tasks: ['jshint', 'compass:dev', 'targethtml:dev']
      },
      sass : {
        files: [ '<%= devFolder %>/scss/*', '<%= tplFolder%>/* ' ],
        tasks: [ 'compass:dev', 'targethtml:dev' ]
      }
  });

  /* connect */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.config('connect', {
    options: {
        port: 8080,
        livereload: 35729,
        hostname: 'localhost'
    },
    livereload: {
        options: {
            open: true,
            base: '<%= baseFolder %>'
        }
    }
  });

 // Creates the `server` task
  grunt.registerTask('serve', ['connect:livereload','watch:all']);

  grunt.registerTask('dev', ['jshint', 'jasmine', 'targethtml:dev', 'compass:dev']);
  grunt.registerTask('prod', ['jshint', 'jasmine', 'targethtml:prod', 'concat',  'uglify', 'compass:prod']);
  grunt.registerTask('prod_debug', [ 'targethtml:prod_debug', 'concat', 'compass:dev']);
  grunt.registerTask('default', ['dev'] );

};