var bodyParser = require('body-parser');
var multer = require('multer');

module.exports = function(app, express) {
  // Server Client-Assets the dirty way:
  app.use('/assets/js', express.static(__client + 'js'));
  app.use('/css', express.static(__client + 'css'));
  app.use('/node_modules', express.static('node_modules'));
  app.use('/bower_components', express.static('bower_components'));
  app.use('/js', express.static(__client + 'js'));

  // Serve templates
  app.use('/templates', express.static(__client + 'templates'));


  // Serve static assets from the app folder. This enables things like javascript
  // and stylesheets to be loaded as expected. You would normally use something like
  // nginx for this, but this makes for a simpler demo app to just let express do it.
  // app.use("/", express.static(__client));

  // Serve compiled PDFs via this static route
  app.use('/dl', express.static(__server + '_texFiles'));

  // Set the view directory, this enables us to use the .render method inside routes
  //app.set('views', __dirname + '../../app/views');

  // parse application/x-www-form-urlencoded
  //app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // use multer for handling multipart/form-data
  app.use(multer({
    dest: __server + 'uploads/',
    rename: function (fieldname, filename, req, res) {
      return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
    },
    onFileUploadComplete: function (file, req, res) {
      console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
  }));
}
