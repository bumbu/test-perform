// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import expect from 'expect'

global.expect = expect

// ---------------------------------------
// Require Tests
// ---------------------------------------
var context = require.context('./src', true, /\.test\.js$/);
context.keys().forEach(context);
