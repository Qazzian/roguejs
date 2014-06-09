
module.exports = function(grunt) {
	grunt.initConfig({
		connect: {
			dev: {
				options: {
					port: 7000,
					base: '/',
					hostname: '*'
				}
			}

		},
		qunit: {
			all:['tests/index.html']
		},

		watch: {
			js: {
				files: ['js/**/*.js', 'tests/t_*.js'],
				tasks: ['qunit']
			}
		}

	});


	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
};

