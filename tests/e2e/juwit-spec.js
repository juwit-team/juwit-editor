describe('juwit-editor', function() {
  var downloadButton = element(by.name('downloadButton'));
  var editorText = element(by.model('html'));
  var filename = 'server/_texFiles/template.pdf';
  var filesystem = require('fs');
  var TIMEOUT = 10000; // timeout in ms

  beforeEach(function() {
    browser.get('http://localhost:1338');
  });

  it('template.pdf should exist.', function() {
    editorText.clear();
    editorText.sendKeys("Test.", protractor.Key.ENTER);

    if (filesystem.existsSync(filename)) {
      // Delete file if it already exists.
      filesystem.unlinkSync(filename);
    }

    downloadButton.click();
    
    /**
     * Wait until the file is created.
     * This call will time out after <timeout> seconds.
     */
    browser.driver.wait(function() {
      return filesystem.existsSync(filename);
    }, TIMEOUT).then(function() {
      expect(filesystem.existsSync(filename)).toBeTruthy(); 
    });
  });
});
