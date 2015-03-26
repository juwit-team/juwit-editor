module.exports = function(app) {
  // Return a list of available node types
  app.post('/:group/:document/info', function(request, response){
    var filename = request.params.document.split('.')[0];
    response.json({"sender": request.body.sender, "recepient": request.body.recepient, "variballs": true);
  });
};