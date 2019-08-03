const childProcess = require('child_process');

const npm_lifecycle_script = process.env.npm_lifecycle_script,
    cmds = npm_lifecycle_script.split(' '),
    script = cmds[cmds.length - 1];
let exec = '';
if (script === 'build') {
    exec = "rm -rf dist && webpack --config config/webpack.config.js --mode production";
} else if (script === 'start') {
    exec = "webpack-dev-server --config config/webpack.config.js --mode development";
}
childProcess.exec(exec);