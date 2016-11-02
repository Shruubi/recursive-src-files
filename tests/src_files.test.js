var chai = require('chai');
var expect = chai.expect;
var getSrcFiles = require('./../src/src_files');

describe('getSrcFiles', function () {
	it('should have two results for folder a', function () {
		var counter = 0;
		getSrcFiles('./tests/test_src', function (files) {
			if(counter === 0) {
				expect(files.length).to.equal(2);
			}

			counter += 1;
		});
	});

	it('should have one result for folder b', function () {
		var counter = 0;
		getSrcFiles('./tests/test_src', function (files) {
			if(counter === 1) {
				expect(files.length).to.equal(1);
			}

			counter += 1;
		});
	});

	it('should have one result for folder c', function () {
		getSrcFiles('./tests/test_src/b', function (files) {
			expect(files.length).to.equal(1);
		});
	});

	it('should have no results for folder d', function () {
		getSrcFiles('./tests/test_src/a', function (files) {
			expect(files.length).to.equal(0);
		});
	});
});