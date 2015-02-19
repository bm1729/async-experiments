/* globals describe, it */

'use strict';

var expect = require('chai').expect;
var q = require('q');
var winston = require('winston');

describe('promises', function () {
    it('waterfall', function (done) {
        
        var process1 = function(message) {
            var deferred = q.defer();
            setTimeout(function() {
                winston.info('process1 executing');
                deferred.resolve(message);
            }, 10);
            
            return deferred.promise;
        };
        
        var process2 = function(message) {
            var deferred = q.defer();
            setTimeout(function() {
                winston.info('process2 executing');
                deferred.resolve(message);
            }, 10);
            
            return deferred.promise;
        };
        
        var process3 = function(message) {
            var deferred = q.defer();
            setTimeout(function() {
                winston.info('process3 executing');
                deferred.resolve(message);
            }, 10);
            
            return deferred.promise;
        };
        
        process1('Hello world!')
            .then(process2)
            .then(process3)
            .then(function(message) {
                expect(message).to.equal('Hello world!');
                done();
            });
    });
});