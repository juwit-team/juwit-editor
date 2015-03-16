exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  suites: {
//    TODO: just one test atm, bundle them to suites later
//    <suite-name>: '<dir><specname>-spec.js',
  },

  specs: ['juwit-spec.js'],

  multiCapabilities: [
    {'browserName' : 'firefox'},
//    TODO: add more browsers to test
//    {'browserName' : 'chrome'}, 
//    {'browserName' : 'safari'} 
  ],

  jasmineNodeOpts: {
    showColors: true
  }
};
