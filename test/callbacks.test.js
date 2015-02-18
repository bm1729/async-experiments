/* globals describe, it */

'use strict';

var expect = require('chai').expect;
var winston = require('winston');

describe('callbacks', function () {
    it('callbacks', function (done) {
        
        var process1 = function(message, callback) {
            setTimeout(function() {
                winston.info('process1 executing');
                callback(message);
            }, 10);
        };
        
        var process2 = function(message, callback) {
            setTimeout(function() {
                winston.info('process2 executing');
                callback(message);
            }, 10);
        };
        
        var process3 = function(message, callback) {
            setTimeout(function() {
                winston.info('process3 executing');
                callback(message);
            }, 10);
        };
        
        process1('Hello world!', function(message) {
            process2(message, function(message) {
                process3(message, function(message) {
                    expect(message).to.equal('Hello world!');
                    done();
                });
            });
        });
    });
});
