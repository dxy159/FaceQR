var https = require('https');

function getData(callback, arg) {

  var options = {
    host: "us-central1-faceqr-80d9c.cloudfunctions.net",
    path: "/helloWorld",
    method: "GET"
  }

  var body = "";
  var request = https.request(options, function(response) {

    response.on('data', function(chunk) {
      body += chunk.toString('utf8');
    });

    response.on('end', function(chunk) {
      callback(body);
    });
  });
  request.end();
}

getData(function(data) {
  console.log(data);
});
