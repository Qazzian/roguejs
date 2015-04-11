
module.exports = function(grunt) {
	grunt.initConfig({
		connect: {
			dev: {
				options: {
					port: 7000,
					base: './',
					hostname: '*',
					keepalive: true
				}
			}

		},
		copy: {
			install: {
				files: {
					'js/lib/seedrandom.js': 'node_modules/seedrandom/seedrandom.js'
				}
			}
		},
		qunit: {
			all:['tests/index.html']
		},

		watch: {
			tests: {
				files: ['js/**/*.js', 'tests/js/t_*.js', 'tests/index.html', 'tests/mock/*.js'],
				tasks: ['qunit']
			}
		}

	});


	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('postInstall', ['copy:install']);


};

