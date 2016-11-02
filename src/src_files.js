/*
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var fs = require('fs');
var path = require('path');
var process = require('process');

/**
 * @callback processorCallback
 * @param {Array.<string>} files
 */

/**
 * @param {string} srcpath
 * @returns {Array.<string>}
 */
function getDirectories(srcpath) {
	var normalizedPath = path.resolve(process.cwd(), srcpath);
	return fs.readdirSync(normalizedPath).filter(function(file) {
		return fs.statSync(path.join(normalizedPath, file)).isDirectory();
	});
}

/**
 * @param {string} srcpath
 * @returns {Array.<string>}
 */
function getFiles(srcpath) {
	var normalizedPath = path.resolve(process.cwd(), srcpath);
	return fs.readdirSync(normalizedPath).filter(function(file) {
		return !fs.statSync(path.join(normalizedPath, file)).isDirectory();
	});
}

/**
 * @param {string} srcpath
 * @param {processorCallback} processorCallback
 */
function getSrcFiles(srcpath, processorCallback) {
	var tld = process.cwd();
	var normalizedPath = path.resolve(process.cwd(), srcpath);
	var subDirs = getDirectories(normalizedPath);

	//get subdir children
	subDirs.forEach(function (subdir) {
		process.chdir(path.resolve(normalizedPath, subdir));
		var cwd = process.cwd();

		//get all files and remove any dot-files
		var files = getFiles(cwd).filter(function (file) {
			return file[0] !== '.';
		});

		//apply callback
		processorCallback(files);
		
		process.chdir(tld);
	});
}

module.exports = getSrcFiles;