describe(':::JUWIT-EDITOR TEST SUITE:::', function() {
  describe('Sub-Suite: change text properties.', function() {
    browser.get('http://localhost:1338');

    var boldButton = element(by.name('bold'));
    var italicButton = element(by.name('italics'));
    var underlineButton = element(by.name('underline'));
    var orderedListButton = element(by.name('ol'));
    var unorderedListButton = element(by.name('ul'));
    var editorText = element(by.model('html'));

    function applyTool(tool) {
      browser.driver.actions().
      mouseDown(editorText).
      mouseMove(editorText, 100, 100).
      click(tool).
      mouseUp(editorText).
      perform();
    };

    function validateGeneratedHtml(validationString) {
      editorText.getInnerHtml().then(function(innerHtml) {
        expect(innerHtml).toContain(validationString);
      });
    };

    beforeEach(function() {
      editorText.clear();
    });

    it('Test: after clearing the editor there should be no tags inside.', function() {
      editorText.clear();
      validateGeneratedHtml(" "); // TODO: For some unkown reasons protractor adds a whitespace 
    });

    it('Test: bold button should make text bold.', function() {
      editorText.sendKeys('Bold text.');
      applyTool(boldButton);
      validateGeneratedHtml("<p><b>Bold text. </b></p>");
    });

    it('Test: italics button should make text italic.', function() {
      editorText.sendKeys("Italic text.");
      applyTool(italicButton);
      validateGeneratedHtml("<p><i>Italic text. </i></p>");
    });

    it('Test: underlined button should make text underlined.', function() {
      editorText.sendKeys("Underlined text.");
      applyTool(underlineButton);
      validateGeneratedHtml("<p><u>Underlined text. </u></p>");
    });

    xit('Test: ordered list button should create ordered list.', function() {
      editorText.sendKeys("List Item 1", protractor.Key.ENTER,
        "List Item 2", protractor.Key.ENTER,
        "List Item 3");
        applyTool(orderedListButton);
        validateGeneratedHtml("<p><ol><li>List Item 1</li><li>List Item 2</li><li>List Item 3</li></ol></p>");
    });

    xit('Test: unordered list button should create unordered list.', function() {
      editorText.sendKeys("List Item 1", protractor.Key.ENTER,
        "List Item 2", protractor.Key.ENTER,
        "List Item 3");
        applyTool(unorderedListButton);
        validateGeneratedHtml("<p><ul><li>List Item 1</li><li>List Item 2</li><li>List Item 3</li></ul></p>");
    });

    it('Test: apply a format-button two times should revert the effect.', function() {
      editorText.sendKeys("Test");

      applyTool(boldButton);
      applyTool(boldButton);
      validateGeneratedHtml("<p>Test </p>");

      applyTool(italicButton);
      applyTool(italicButton);
      validateGeneratedHtml("<p>Test </p>");

      applyTool(underlineButton);
      applyTool(underlineButton);
      validateGeneratedHtml("<p>Test </p>");

      applyTool(orderedListButton);
      applyTool(orderedListButton);
      validateGeneratedHtml("<p>Test </p>");

      applyTool(unorderedListButton);
      applyTool(unorderedListButton);
      validateGeneratedHtml("<p>Test </p>");
    });

  });

  describe('Sub-Suite: download pdf.', function() {
    browser.get('http://localhost:1338');

    var TIMEOUT = 10000; // timeout in ms
    var filesystem = require('fs');
    var filename = 'server/_texFiles/company/document/document.pdf'; // TODO: make filename a variable
    var downloadButton = element(by.name('downloadButton'));

    it('document.pdf document should exist.', function() {
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
