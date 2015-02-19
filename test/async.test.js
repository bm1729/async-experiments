/* globals describe, it */

'use strict';

var async = require('async');
var expect = require('chai').expect;
var winston = require('winston');

describe('async', function () {
    it('waterfall', function (done) {
        
        var starter = function(message) {
            return function(callback) {
                callback(null, message);
            };
        };
        
        var process1 = function(message, callback) {
            setTimeout(function() {
                winston.info('process1 executing');
                callback(null, message);
            }, 10);
        };
        
        var process2 = function(message, callback) {
            setTimeout(function() {
                winston.info('process2 executing');
                callback(null, message);
            }, 10);
        };
        
        var process3 = function(message, callback) {
            setTimeout(function() {
                winston.info('process3 executing');
                callback(null, message);
            }, 10);
        };
        
        async.waterfall([
            starter('Hello world!'),
            process1,
            process2,
            process3,
            function(message) {
                expect(message).to.equal('Hello world!');
                done();
            }
        ]);
    });
});