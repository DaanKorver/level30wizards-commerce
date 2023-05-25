module.exports = {
	plugins: {
		'postcss-nested': {},
		'postcss-utilities': {},
		'postcss-custom-media': {},
		'@csstools/postcss-global-data': {
			files: ['src/styles/media.css'],
		},

		'postcss-preset-env': {
			stage: 4,
			features: {
				'nesting-rules': true,
				'custom-media-queries': true,
				'media-query-ranges': true,
			},
			browsers: 'last 2 versions',
		},
	},
}
