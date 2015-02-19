/* globals describe, it */

'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var winston = require('winston');

describe('generators', function () {
    it('generator functions, generators and generator results', function () {
        function * generatorFunction() {
            winston.info('Generator function started');
            for (var i = 0; i < 3; i++) {
                yield i;
            }
            winston.info('Generator function finished. Nothing left to yield');
        }
        
        var generator = generatorFunction();
        
        var result0 = generator.next();
        expect(result0.value).to.equal(0);
        expect(result0.done).to.equal(false);
        
        var result1 = generator.next();
        expect(result1.value).to.equal(1);
        expect(result1.done).to.equal(false);
        
        var result2 = generator.next();
        expect(result2.value).to.equal(2);
        expect(result2.done).to.equal(false);
        
        var anotherResult = generator.next();
        assert.isUndefined(anotherResult.value);
        expect(anotherResult.done).to.equal(true);
    });
});