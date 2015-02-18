/* globals describe, it */

'use strict';

var expect = require('chai').expect;
// var target = require('../src/async-experiments.js');

describe('async-experiments', function () {
    it('callback', function (done) {
        expect(1729).to.equal(1729);
        done();
    });
});
