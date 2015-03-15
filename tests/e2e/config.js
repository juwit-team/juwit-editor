exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

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
