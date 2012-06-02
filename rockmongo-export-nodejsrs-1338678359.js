
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

/** emails records **/

/** internalerrors records **/
db.getCollection("internalerrors").insert({
  "_id": ObjectId("4fc2dc29bf11087554000025"),
  "_user": ObjectId("4f9c7141ddcebc7022000022"),
  "name": "HttpError",
  "message": "Sorry, we couldn't process your request.",
  "stack": "HttpError: Sorry, we couldn't process your request.\n    at Object.error (\/home\/zarko\/Development\/node\/nodejs.rs\/routes\/post.js:585:33)\n    at IncomingMessage.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/pdfcrowd\/lib\/pdfcrowd.js:171:27)\n    at IncomingMessage.emit (events.js:88:20)\n    at HTTPParser.onMessageComplete (http.js:137:23)\n    at Socket.ondata (http.js:1137:24)\n    at TCP.onread (net.js:354:27)",
  "url": "\/test",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "viewed": true,
  "createdAt": ISODate("2012-05-28T02:00:09.320Z")
});
db.getCollection("internalerrors").insert({
  "_id": ObjectId("4fc2dd155f7f69215500004a"),
  "_user": ObjectId("4f9c7141ddcebc7022000022"),
  "name": "HttpError",
  "message": "(502) Sorry, we couldn't process your request.",
  "stack": "HttpError: (502) Sorry, we couldn't process your request.\n    at Object.error (\/home\/zarko\/Development\/node\/nodejs.rs\/routes\/post.js:585:33)\n    at IncomingMessage.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/pdfcrowd\/lib\/pdfcrowd.js:171:27)\n    at IncomingMessage.emit (events.js:88:20)\n    at HTTPParser.onMessageComplete (http.js:137:23)\n    at Socket.ondata (http.js:1137:24)\n    at TCP.onread (net.js:354:27)",
  "url": "\/test",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "viewed": true,
  "createdAt": ISODate("2012-05-28T02:04:05.576Z")
});
db.getCollection("internalerrors").insert({
  "_id": ObjectId("4fc3bc0a0c4b8cc41700000c"),
  "_user": ObjectId("4f9c7141ddcebc7022000022"),
  "name": "HttpError",
  "message": "Sorry, we couldn't process your request.",
  "status": 502,
  "stack": "HttpError: Sorry, we couldn't process your request.\n    at Object.error (\/home\/zarkos\/Development\/nodedev\/nodejs.rs\/routes\/post.js:585:33)\n    at IncomingMessage.<anonymous> (\/home\/zarkos\/Development\/nodedev\/nodejs.rs\/node_modules\/pdfcrowd\/lib\/pdfcrowd.js:171:27)\n    at IncomingMessage.emit (events.js:88:20)\n    at HTTPParser.onMessageComplete (http.js:137:23)\n    at Socket.ondata (http.js:1137:24)\n    at TCP.onread (net.js:354:27)",
  "url": "\/test",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/536.5 (KHTML, like Gecko) Chrome\/19.0.1084.52 Safari\/536.5",
  "method": "GET",
  "viewed": true,
  "createdAt": ISODate("2012-05-28T17:55:22.758Z")
});
db.getCollection("internalerrors").insert({
  "_user": ObjectId("4f9c7141ddcebc7022000022"),
  "name": "Error",
  "message": "ENOENT, no such file or directory '\/home\/zarko\/Development\/node\/nodejs.rs\/public\/articles\/aaaa.html'",
  "stack": "Error: ENOENT, no such file or directory '\/home\/zarko\/Development\/node\/nodejs.rs\/public\/articles\/aaaa.html'",
  "url": "\/post\/aaaa\/download",
  "referrer": "http:\/\/localhost:3000\/post\/aaaa",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc95236ab895b5e1600000c"),
  "viewed": true,
  "createdAt": ISODate("2012-06-01T23:37:26.812Z")
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

/** posts records **/
db.getCollection("posts").insert({
  "_id": ObjectId("4faef290118a08be140007d7"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "createdAt": ISODate("2012-05-12T23:30:24.769Z"),
  "downloadCount": 9,
  "shouldGenerateHtml": true,
  "shouldGeneratePdf": true,
  "tags": [
    "markdown",
    "text",
    "html"
  ],
  "title": "Generalni priručnik za Markdown sintaksu",
  "titleUrl": "generalni-prirucnik-za-markdown-sintaksu",
  "updatedAt": ISODate("2012-06-02T22:48:07.178Z"),
  "viewCount": 21
});

/** sessions records **/
db.getCollection("sessions").insert({
  "_id": ObjectId("4fca9c297c88412e94542b86"),
  "data": "{\"lastAccess\":1338678316291,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-06-03T03:05:16.291Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"swDvUaN751uAbiW1DtkhsL6U\",\"flash\":{}}",
  "expires": ISODate("2012-06-03T03:05:16.291Z"),
  "sid": "cAdOz6n2TYk8SeeFTtWV1Nd0.d81wgcT7vLayPtmogBCAzqqxgDOjm2+TuZmoejnc6Y8"
});

/** system.indexes records **/
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
    "email": 1
  },
  "unique": true,
  "ns": "nodejsrs.users",
  "name": "email_1"
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
  "ns": "nodejsrs.internalerrors",
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
    "_owner": 1
  },
  "ns": "nodejsrs.posts",
  "name": "_owner_1"
});

/** users records **/
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
