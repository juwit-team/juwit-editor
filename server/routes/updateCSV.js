module.exports = function(app) {
  app.post('/:group/:document/updateCSV', function(request, response) {
    // TODO: save file
    console.log(request.headers);
    console.log(request)
    response.json({"status": "File uploaded."});
  });
};
