describe('Test Parser: ', function () {

	beforeEach( function() {
    module('textAngular');
		module('LatexEditor');
    inject(function($controller) {
      buttonController = $controller('EditorButtonController');
    });
	});

	it('Controller should be defined.', function() {
		expect(buttonController).toBeDefined();
	});

	it('Parsing an empty string should return an empty string.',function() {
    expect(buttonController.tokenize('')).toEqual('');
  });

	it('Tokenizing an h1 tag should return the right LaTeX command.',function() {
    expect(buttonController.tokenize('<h1></h1>')).toEqual(' \\section*{\\raggedright{}} ');
  });

});
