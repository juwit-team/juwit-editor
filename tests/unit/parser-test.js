describe('Test Parser: ', function () {

//  TODO: Fix files to load in karma.conf.js 
//	beforeEach( function() {
//    module('textAngular');
//    module('pdfDelegate');
//		module('LatexEditor');
//    inject(function($controller) {
//      buttonController = $controller('EditorButtonController');
//    });
//	});

  it('Proof of concept.', function() {
		expect(true).toBeTruthy();
	});

	xit('Controller should be defined.', function() {
		expect(buttonController).toBeDefined();
	});

	xit('Parsing an empty string should return an empty string.',function() {
    expect(buttonController.tokenize('')).toEqual('');
  });

	xit('Tokenizing an h1 tag should return the right LaTeX command.',function() {
    expect(buttonController.tokenize('<h1></h1>')).toEqual('\\section*{\\raggedright{}}');
  });

});
