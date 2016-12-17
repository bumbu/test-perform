// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import expect, { createSpy, spyOn, isSpy } from 'expect'

global.expect = expect
global.createSpy = createSpy
global.spyOn = spyOn
global.isSpy = isSpy

// ---------------------------------------
// Require Tests
// ---------------------------------------
var context = require.context('./src', true, /\.test\.js$/);
context.keys().forEach(context);
