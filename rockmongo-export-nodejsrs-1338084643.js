
/** comments indexes **/
db.getCollection("comments").ensureIndex({
  "_id": 1
},[
  
]);

/** emails indexes **/
db.getCollection("emails").ensureIndex({
  "_id": 1
},[
  
]);

/** internalerrors indexes **/
db.getCollection("internalerrors").ensureIndex({
  "_id": 1
},[
  
]);

/** pictures indexes **/
db.getCollection("pictures").ensureIndex({
  "_id": 1
},[
  
]);

/** posts indexes **/
db.getCollection("posts").ensureIndex({
  "_id": 1
},[
  
]);

/** posts indexes **/
db.getCollection("posts").ensureIndex({
  "titleUrl": 1
},{
  "unique": true
});

/** posts indexes **/
db.getCollection("posts").ensureIndex({
  "_owner": 1
},[
  
]);

/** sessions indexes **/
db.getCollection("sessions").ensureIndex({
  "_id": 1
},[
  
]);

/** sessions indexes **/
db.getCollection("sessions").ensureIndex({
  "sid": 1
},{
  "unique": true
});

/** sessions indexes **/
db.getCollection("sessions").ensureIndex({
  "expires": 1
},[
  
]);

/** users indexes **/
db.getCollection("users").ensureIndex({
  "_id": 1
},[
  
]);

/** users indexes **/
db.getCollection("users").ensureIndex({
  "name.username": 1
},{
  "unique": true
});

/** users indexes **/
db.getCollection("users").ensureIndex({
  "email": 1
},{
  "unique": true
});

/** comments records **/
db.getCollection("comments").insert({
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "text": "sdf",
  "_id": ObjectId("4fc01ccc56907e9512000003"),
  "createdAt": ISODate("2012-05-25T23:59:08.657Z")
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4fbeba84617d7f80390000ab"),
  "text": "sdfa",
  "_id": ObjectId("4fc021627c4438d213000052"),
  "createdAt": ISODate("2012-05-26T00:18:42.698Z")
});

/** emails records **/
db.getCollection("emails").insert({
  "_id": ObjectId("4fbeba84617d7f80390000ac"),
  "body": "Dobrodosli na Node.js Srbija\nKliknite ovde za aktivaciju:<br \/>\nOva poruka je poslata na pera@pera.com",
  "sendingCounter": 0,
  "priority": 1,
  "type": 1,
  "createdAt": ISODate("2012-05-24T22:47:31.730Z"),
  "sent": false,
  "message": {
    "subject": "Registracija na nodejs.rs",
    "to": [
      "pera@pera.com"
    ],
    "from": "register@nodejs.rs"
  }
});
db.getCollection("emails").insert({
  "_id": ObjectId("4fbebbb5617d7f803900056b"),
  "body": "Dobrodosli na Node.js Srbija\nKliknite ovde za aktivaciju:<br \/>\nOva poruka je poslata na mika@mika.com",
  "sendingCounter": 0,
  "priority": 1,
  "type": 1,
  "createdAt": ISODate("2012-05-24T22:52:37.389Z"),
  "sent": false,
  "message": {
    "subject": "Registracija na nodejs.rs",
    "to": [
      "mika@mika.com"
    ],
    "from": "register@nodejs.rs"
  }
});

/** internalerrors records **/
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error?page=3",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1773f19b9b91719000115"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T00:37:19.488Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error?page=3",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1774919b9b917190001a6"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T00:37:29.48Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error?page=3",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1774919b9b917190001bf"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T00:37:29.323Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error?page=3",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1774919b9b917190001d8"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T00:37:29.602Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error?page=3",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1774919b9b917190001f1"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T00:37:29.810Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error?page=3",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1774a19b9b91719000208"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T00:37:30.77Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error?page=3",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1775319b9b91719000221"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T00:37:39.311Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error?page=3",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1775319b9b9171900023a"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T00:37:39.931Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error?page=3",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1775419b9b91719000253"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T00:37:40.382Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850a495637c42100000a"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:10.926Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850c495637c421000023"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:12.847Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850d495637c42100003c"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:13.56Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850d495637c42100005a"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:13.256Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850d495637c42100005f"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:13.260Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850d495637c421000077"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:13.402Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850d495637c421000090"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:13.586Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850d495637c4210000a9"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:13.794Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850d495637c4210000b3"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:13.818Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850d495637c4210000cc"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:13.991Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850e495637c4210000e5"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:14.157Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850e495637c4210000f4"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:14.289Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850e495637c42100010d"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:14.466Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850e495637c421000123"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:14.672Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850e495637c421000132"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:14.811Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850e495637c421000148"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:14.939Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850f495637c42100015c"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:15.124Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850f495637c421000171"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:15.261Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850f495637c421000186"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:15.417Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850f495637c42100019c"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:15.582Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850f495637c4210001b2"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:15.738Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850f495637c4210001bc"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:15.829Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc1850f495637c4210001d2"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:15.958Z")
});
db.getCollection("internalerrors").insert({
  "name": "Error",
  "message": "ahahah",
  "stack": "Error: ahahah\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:108:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:160:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/about",
  "referrer": "http:\/\/localhost:3000\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc18510495637c4210001e8"),
  "viewed": true,
  "createdAt": ISODate("2012-05-27T01:36:16.172Z")
});

/** pictures records **/
db.getCollection("pictures").insert({
  "_id": ObjectId("4fbeb036b65eb1c21f0003e3"),
  "ext": "jpg",
  "name": "Bouncer - OCTOCATS!",
  "size": 58353,
  "type": "image\/jpeg"
});
db.getCollection("pictures").insert({
  "_id": ObjectId("4fbeb6524757f93d2d000f8b"),
  "name": "ManInTheBox",
  "size": 168291,
  "type": "image\/jpeg",
  "ext": "jpg"
});
db.getCollection("pictures").insert({
  "_id": ObjectId("4fbfb0a8d1efdc1b390001f7"),
  "name": "mika",
  "size": 1896383,
  "type": "image\/jpeg",
  "ext": "jpg"
});

/** posts records **/
db.getCollection("posts").insert({
  "_id": ObjectId("4faef290118a08be140007d7"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "createdAt": ISODate("2012-05-12T23:30:24.769Z"),
  "tags": [
    "markdown",
    "text",
    "html"
  ],
  "title": "Generalni priručnik za Markdown sintaksu",
  "titleUrl": "generalni-prirucnik-za-markdown-sintaksu",
  "updatedAt": ISODate("2012-05-26T01:25:19.557Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4fbee17bdd1f0fa712001582"),
  "_owner": ObjectId("4fbebbb4617d7f8039000569"),
  "comments": [
    ObjectId("4fc021627c4438d213000052")
  ],
  "createdAt": ISODate("2012-05-25T01:33:47.999Z"),
  "tags": [
    
  ],
  "title": "Mikin clanak",
  "titleUrl": "mikin-clanak",
  "updatedAt": ISODate("2012-05-26T01:25:34.424Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4fbee314dd1f0fa7120028e8"),
  "_owner": ObjectId("4fbeba84617d7f80390000ab"),
  "comments": [
    ObjectId("4fc01ccc56907e9512000003")
  ],
  "createdAt": ISODate("2012-05-25T01:40:36.370Z"),
  "tags": [
    
  ],
  "title": "Perin post",
  "titleUrl": "perin-post",
  "updatedAt": ISODate("2012-05-26T01:25:26.864Z")
});
db.getCollection("posts").insert({
  "titleUrl": "zarkov-post",
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "title": "Zarkov post",
  "_id": ObjectId("4fc033b16866612719000d9d"),
  "tags": [
    
  ],
  "comments": [
    
  ],
  "updatedAt": ISODate("2012-05-26T01:36:49.169Z"),
  "createdAt": ISODate("2012-05-26T01:36:49.169Z")
});

/** sessions records **/
db.getCollection("sessions").insert({
  "_id": ObjectId("4fc15abf72ddb844b655a18c"),
  "data": "{\"lastAccess\":1338071918993,\"cookie\":{\"originalMaxAge\":14399999,\"expires\":\"2012-05-27T02:38:39.005Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"q8mDChI0TpE3Bx1p2gsHWYaP\"}",
  "expires": ISODate("2012-05-27T02:38:39.5Z"),
  "sid": "SvKS2JWdeEbFSnPfOdElQMzH.R0liQ7E3id6zeFZyf8o+DnrIuJYYKvKF4roXkMaKe2c"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fc1446c72ddb844b655a18b"),
  "data": "{\"lastAccess\":1338084567540,\"cookie\":{\"originalMaxAge\":14399974,\"expires\":\"2012-05-27T06:09:27.517Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"ZzeCdbpoyfmn3dPWpIaKJrPR\",\"flash\":{},\"user\":{\"_id\":\"4f9c7141ddcebc7022000022\",\"email\":\"stankovic.zarko@gmail.com\",\"password\":\"5101d9d94c8cae583027f9279171d83d\",\"createdAt\":\"2012-04-28T22:37:53.460Z\",\"salt\":\"95d3e293492509d083c7a027b0195ef5\",\"bio\":{\"about\":\"Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst...\",\"company\":\"Max My Play, LLC\",\"github\":\"http:\/\/github.com\/ManInTheBox\",\"location\":\"Beograd, Srbija\",\"twitter\":\"http:\/\/twitter.com\/zarkostankovic\",\"website\":\"http:\/\/www.zarkostankovic.com\"},\"photo\":\"4fbeb6524757f93d2d000f8b\",\"name\":{\"first\":\"Žarko\",\"last\":\"Stanković\",\"username\":\"ManInTheBox\"}}}",
  "expires": ISODate("2012-05-27T06:09:27.517Z"),
  "sid": "ZgTgRLHmoKzq1qB0Ambdf3dj.SxvD5RlCt10At\/SXUYhWf1GY4r7YPs+6C5M\/JK\/hWkM"
});

/** system.indexes records **/
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_id": 1
  },
  "ns": "nodejsrs.comments",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_id": 1
  },
  "ns": "nodejsrs.emails",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_id": 1
  },
  "ns": "nodejsrs.pictures",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_id": 1
  },
  "ns": "nodejsrs.posts",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "titleUrl": 1
  },
  "unique": true,
  "ns": "nodejsrs.posts",
  "name": "titleUrl_1"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_id": 1
  },
  "ns": "nodejsrs.sessions",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "sid": 1
  },
  "unique": true,
  "ns": "nodejsrs.sessions",
  "name": "sid_1"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "expires": 1
  },
  "ns": "nodejsrs.sessions",
  "name": "expires_1"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_id": 1
  },
  "ns": "nodejsrs.users",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "name.username": 1
  },
  "unique": true,
  "ns": "nodejsrs.users",
  "name": "name.username_1"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "email": 1
  },
  "unique": true,
  "ns": "nodejsrs.users",
  "name": "email_1"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_owner": 1
  },
  "ns": "nodejsrs.posts",
  "name": "_owner_1"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_id": 1
  },
  "ns": "nodejsrs.internalerrors",
  "name": "_id_"
});

/** users records **/
db.getCollection("users").insert({
  "_id": ObjectId("4fbebbb4617d7f8039000569"),
  "password": "8e902c1c04f5f07a0c3ddeba16a0dea8",
  "email": "mika@mika.com",
  "createdAt": ISODate("2012-05-24T22:52:36.328Z"),
  "salt": "5d0d9ff91068ce00eb9f0fb4aad20742",
  "photo": ObjectId("4fbfb0a8d1efdc1b390001f7"),
  "name": {
    "username": "mika"
  }
});
db.getCollection("users").insert({
  "_id": ObjectId("4fbeba84617d7f80390000ab"),
  "bio": {
    "about": "Ovo je admin izmenio"
  },
  "createdAt": ISODate("2012-05-24T22:47:32.726Z"),
  "email": "pera@pera.com",
  "name": {
    "username": "pera"
  },
  "password": "d381915869faaba9f089acf9a3d4bc6d",
  "photo": ObjectId("4fbeb036b65eb1c21f0003e3"),
  "salt": "d75f5c509a53eedddb1f9f36db22f508"
});
db.getCollection("users").insert({
  "_id": ObjectId("4f9c7141ddcebc7022000022"),
  "bio": {
    "about": "Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst...",
    "company": "Max My Play, LLC",
    "github": "http:\/\/github.com\/ManInTheBox",
    "location": "Beograd, Srbija",
    "twitter": "http:\/\/twitter.com\/zarkostankovic",
    "website": "http:\/\/www.zarkostankovic.com"
  },
  "createdAt": ISODate("2012-04-28T22:37:53.460Z"),
  "email": "stankovic.zarko@gmail.com",
  "name": {
    "first": "Žarko",
    "last": "Stanković",
    "username": "ManInTheBox"
  },
  "password": "5101d9d94c8cae583027f9279171d83d",
  "photo": ObjectId("4fbeb6524757f93d2d000f8b"),
  "salt": "95d3e293492509d083c7a027b0195ef5"
});
