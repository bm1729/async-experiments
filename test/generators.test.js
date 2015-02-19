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
    
    it('delegate to another generator function using yield*', function () {
        function* generator1() {
            winston.info('Generator1 started');
            yield 'generator1-1';
            yield 'generator1-2';
            yield 'generator1-3';
            winston.info('Generator1 exhausted');
        }
        
        function* generator2() {
            winston.info('Generator2 started');
            yield 'generator2-1';
            /*jshint -W030 */
            yield* generator1();
            yield 'generator2-2';
            winston.info('Generator2 exhausted');
        }
        
        var generator = generator2();
        
        var result0 = generator.next();
        expect(result0.value).to.equal('generator2-1');
        expect(result0.done).to.equal(false);
        
        var result1 = generator.next();
        expect(result1.value).to.equal('generator1-1');
        expect(result1.done).to.equal(false);
        
        var result2 = generator.next();
        expect(result2.value).to.equal('generator1-2');
        expect(result2.done).to.equal(false);
        
        var result3 = generator.next();
        expect(result3.value).to.equal('generator1-3');
        expect(result3.done).to.equal(false);
        
        var result4 = generator.next();
        expect(result4.value).to.equal('generator2-2');
        expect(result4.done).to.equal(false);
        
        var anotherResult = generator.next();
        assert.isUndefined(anotherResult.value);
        expect(anotherResult.done).to.equal(true);
    });
});