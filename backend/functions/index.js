const functions = require('firebase-functions');
const MSCSFACEAPI = require("mscs-face-api");
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const key = '1caec07977834dcbbf6ea8cf79eda922';
var fa = new MSCSFACEAPI(key,"WCUS");

var serviceAccount = require('~/faceqr-80d9c-firebase-adminsdk-ly8ts-73c855b8bf.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://faceqr-80d9c.firebaseio.com"
});


// // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, res) => {
  console.log('Hi');
  //res.send("Hello from Firebase!");

  var ref = admin.database.ref("/users");
  res.send('Hi')
  /*var emptyArray = [];

  ref.once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(image) {
        var imageObject = image.val();
        var key = imageObject.key;
        var url = imageObject[key];
        emptyArray.push(url);
      })
  })
  res.send(emptyArray); */
});


/* exports.testFunc = functions.database.ref('/Something').onCreate(event => {

  //var place = admin.database().ref('/Something');
  console.log('wot');
  response.send("True");
  return event.data;
}); */

//This is the function to be used for verification
//exports.addFace = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  //var name = req.query.text;

//});
