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
  var post_data = querystring.stringify({
        'faceId1' : imageID1,
        'faceId2' : imageID2
  });

//  console.log('Post_data : ', post_data)

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
            callback(chunk);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

}




// Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((req, res) => {
    var sourceImageUrl ='https://firebasestorage.googleapis.com/v0/b/faceqr-80d9c.appspot.com/o/14918967_1417370714957463_8883527504144697316_o.jpg?alt=media&token=9eeb7b8c-71cb-41a2-9581-716f10d5632e';

  //  var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    var input = req;
    try {
    //  console.log(JSON.stringify(input))
    }
    catch (err) {
    //  console.log(input);
    }



    // Request parameters.
  /*  var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,facialHair,glasses,hair,makeup,"
    }; */
    DetectImage(sourceImageUrl,  function(body) {
       //console.log(body, body[0]["faceId"])
       var refID = body[0]["faceId"];
       return admin.database().ref('/Something').once('value', (snapshot, refID) => {
           console.log(refID)
           snapshot.forEach(function(image) {
             var imageName = image.key;
             var imageURL = image.val();
             var matched = 0;
             DetectImage(imageURL, function(body2) {
                var verID = body2[0]["faceId"];
            //  console.log(body2, body2[0]["faceId"])
            //  console.log(refID, verID)
                VerifyImage(refID, verID, function(message) {
                var isIdentical = message[0]["isIdentical"];
                var confidence = message[0]["confidence"];
                if (isIdentical === True) {
                  console.log('Fuckin got him boiz')
                  matched = 1;
                }

              })


            })
          })

        })

     });

    res.send('Fkjb')

});
