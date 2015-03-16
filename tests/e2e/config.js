exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  suites: {
//    TODO: just one test atm, bundle them to suites later
//    <suite-name>: '<dir><specname>-spec.js',
  },

  specs: ['juwit-spec.js'],

  multiCapabilities: [
    {'browserName' : 'chrome'}, 
    {'browserName' : 'firefox'},
    {'browserName' : 'safari'} 
  ],

  jasmineNodeOpts: {
    showColors: true
  }
};
