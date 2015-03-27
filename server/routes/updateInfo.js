module.exports = function(app) {
  // Return a list of available node types
  app.post('/:group/:document/info', function(request, response){
    response.json({"sender": request.body.sender, "recepient": request.body.recepient, "variballs": true);
  });
};
