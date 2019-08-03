const path = require('path'),
	root = path.resolve(__dirname),
	src = path.resolve(root, 'src'),
	dist = path.resolve(root, 'dist'),
	node_modules = path.resolve(root, 'node_modules');
module.exports = {
	path,
	root,
	src,
	dist,
	node_modules
};
