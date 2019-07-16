/*
 * grunt-po2mo
 * https://github.com/MicheleBertoli/grunt-po2mo
 *
 * Copyright (c) 2013 Michele Bertoli
 * Licensed under the MIT license.
 */

'use strict';

const exec = require('child_process').spawnSync;

module.exports = function(grunt) {

  grunt.registerMultiTask('po2mo', 'Compile .po files into binary .mo files with msgfmt.', function() {

    const options = this.options({
      deleteSrc: false,
    });

    this.files.forEach(function(file) {

      const src = file.src[0];
      let dest = file.dest;
      if (dest.indexOf('.po') > -1) {
        dest = dest.replace('.po', '.mo');
      }
      grunt.file.write(dest);

      const command = 'msgfmt -o ' + dest + ' ' + src;

      grunt.verbose.writeln('Executing: ' + command);
      const result = exec('msgfmt', ['-o', dest, src]);
      grunt.verbose.writeln('Executed with status: ' + result.status);

      if (result.status !== 0) {
        grunt.log.error(result.output);
      }

      if (options.deleteSrc) {
        grunt.file.delete(src);
      }

    });

  });

};
