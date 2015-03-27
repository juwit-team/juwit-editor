module.exports = function(app) {
  app.post('/:group/:document/updateLetterInfo', function(request, response){
    response.json({"sender": request.body.sender, "recepient": request.body.recepient, "variballs": true});
  });
};
