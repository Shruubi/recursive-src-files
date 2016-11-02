# recursiveSrcFiles

Simple node package that allows you to iterate over each sub-directory
in a given directory and apply a callback to an array of files in the
given sub-directory.

## Example

Given the following file structure

```
|- src
|---- module_a
|-------- source_file.js
|-------- source_file_two.js
|---- module_b
|-------- source_file_three.js
|-------- source_file_four.js
```

When you call `getSrcFiles()` passing in the parameter `'./src'` like so:

```
var getSrcFiles = require('recursive-src-files');
getSrcFiles('./src', function (files) {
    console.log(files);
});
```

you will get as your output:

```
// console output will be:
['source_file.js', 'source_file_two.js'] // result one
['source_file_three.js', 'source_file_four.js'] // result two
```

## API

#### getSrcFiles(scanDirectory, callback)

* `scanDirectory` String
* `callback` Function

iterate over each sub-directory in a given directory and apply a 
callback to an array of files in the given sub-directory.