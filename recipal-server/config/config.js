
module.exports = function() {
	return {
		app: {
		  name: 'recipal'
		},
		db: 'mongodb://localhost/recipal',
		mode: 'development',
		host: '127.0.0.1',
		port: process.argv[2] || 3000,
		secret: 'secret',
	}
}
