describe(':::JUWIT-EDITOR TEST SUITE:::', function() {
  describe('Sub-Suite: change text properties.', function() {
    browser.get('http://localhost:1338');

    var boldButton = element(by.name('bold'));
    var italicButton = element(by.name('italics'));
    var underlineButton = element(by.name('underline'));
    var editorText = element(by.model('html'));

    function applyTool(tool) {
      browser.driver.actions().
      mouseDown(editorText).
      mouseMove(editorText, 100, 100).
      click(tool).
      mouseUp(editorText).
      perform();
    };

    beforeEach(function() {
      editorText.clear();
    });

    it('Test: bold button should make text bold.', function() {
      editorText.sendKeys('Bold text.');
      applyTool(boldButton);
      editorText.getInnerHtml().then(function(innerHtml) {
        expect(innerHtml).toMatch("<p><b>Bold text. </b></p>");
      });
    });

    it('Test: italics button should make text italic.', function() {
      editorText.sendKeys("Italic text.");
      applyTool(italicButton);
      editorText.getInnerHtml().then(function(text) {
        expect(text).toContain("<p><i>Italic text. </i></p>");
      });
    });

    it('Test: underlined button should make text underlined.', function() {
      editorText.sendKeys("Underlined text.");
      applyTool(underlineButton);
      editorText.getInnerHtml().then(function(text) {
        expect(text).toContain("<p><u>Underlined text. </u></p>");
        console.log("\n\n\nD E B U G: " + text + "\n\n\n");
      });
    });
  });

  describe('Sub-Suite: download pdf.', function() {
    browser.get('http://localhost:1338');

    var TIMEOUT = 10000; // timeout in ms
    var filesystem = require('fs');
    var filename = 'server/_texFiles/template.pdf';
    var downloadButton = element(by.name('downloadButton'));

    it('template.pdf should exist.', function() {
      if (filesystem.existsSync(filename)) {
        // Delete file if it already exists.
        filesystem.unlinkSync(filename);
      }

      downloadButton.click();
      
      /**
       * Wait until the file is created.
       * This call will time out after <TIMEOUT> seconds.
       */
      browser.driver.wait(function() {
        return filesystem.existsSync(filename);
      }, TIMEOUT).then(function() {
        expect(filesystem.existsSync(filename)).toBeTruthy(); 
      });
    });
  });

});
