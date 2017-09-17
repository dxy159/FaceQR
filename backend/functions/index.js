const functions = require('firebase-functions');
const cognitiveServices = require('cognitive-services');
const admin = require('firebase-admin');
var https = require('https');

admin.initializeApp(functions.config().firebase);
const subscriptionKey = 'c922f4a50301484ca34e5fd372f6932c';


// We need this to build our post string
var querystring = require('querystring');
var fs = require('fs');

function DetectImage(imageURL, callback) {
  // Build the post string from an object
  var post_data = JSON.stringify({
        'url' : imageURL
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'westus.api.cognitive.microsoft.com',
      path: '/face/v1.0/detect',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': subscriptionKey
      }
  };

  //var reh = new Promise(function(resolve, reject) {
    var body = "";
    // Set up the request
    var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk.toString('utf8');
        });
        res.on('end', function(chunk) {
            callback(body);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

}


function VerifyImage(imageID1, imageID2, callback) {
  // Build the post string from an object
  var post_data = JSON.stringify({
        'faceId1' : imageID1,
        'faceId2' : imageID2
  });
  //console.log('Post_data : ', post_data)

  // An object of options to indicate where to post to
  var post_options = {
      host: 'westus.api.cognitive.microsoft.com',
      path: '/face/v1.0/verify',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': subscriptionKey
      }
  };

    var body = "";
    // Set up the request
    var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk.toString('utf8');
        });
        res.on('end', function(chunk) {
            callback(body);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

}




// Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((req, res) => {
    //var sourceImageUrl ='https://firebasestorage.googleapis.com/v0/b/faceqr-80d9c.appspot.com/o/Connor?alt=media&token=a9d11848-96e3-41ab-9482-ded6d46eba6c';
    var sourceImageUrl =  req.body.imageURL


    DetectImage(sourceImageUrl,  function(body) {
       var refID = JSON.parse(body)[0]["faceId"];
       return admin.database().ref('/users').once('value', (snapshot) => {
          var name = "";
          var foundMatch = 0;
           snapshot.forEach(function(image) {
             console.log(image.val())
             var imageName = image.key;
             var imageURL = image.val()["imgDownloadLink"];
             DetectImage(imageURL, function(body2) {
               console.log(body2)
                var verID = JSON.parse(body2)[0]["faceId"];
                VerifyImage(refID, verID, function(message) {
                  console.log('Here', message)
              //    console.log('Name', imageName)
                var isIdentical = JSON.parse(message)["isIdentical"];
                var confidence = JSON.parse(message)["confidence"];
                if (isIdentical === true) {
                  name = imageName;
                  foundMatch = 1;
                  console.log('TRUE', name)
                  res.send(name)
                }
              })
            })
          })
          return ({name, foundMatch})
        }).then(function({name, foundMatch}) {
          console.log('HERE', name)
          console.log(foundMatch)
          if (foundMatch === 0) {
            console.log('THERE')
            res.send("None")
          } else {
            console.log('FUCK')
            res.send(name)
          }
        }, function(err) {
           res.send(err)
        })

     });



});
