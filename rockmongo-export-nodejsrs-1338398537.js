
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
  "createdAt": ISODate("2012-05-25T01:40:36.370Z"),
  "tags": [
    
  ],
  "title": "Perin post",
  "titleUrl": "perin-post",
  "updatedAt": ISODate("2012-05-27T03:45:28.480Z")
});
db.getCollection("posts").insert({
  "titleUrl": "zarkov-post",
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "title": "Zarkov post",
  "_id": ObjectId("4fc656ff4d72bae6090001db"),
  "tags": [
    
  ],
  "comments": [
    
  ],
  "updatedAt": ISODate("2012-05-30T17:21:03.160Z"),
  "createdAt": ISODate("2012-05-30T17:21:03.160Z")
});

/** sessions records **/
db.getCollection("sessions").insert({
  "_id": ObjectId("4fc62232377b3e220a850579"),
  "data": "{\"lastAccess\":1338398472858,\"cookie\":{\"originalMaxAge\":14399987,\"expires\":\"2012-05-30T21:21:12.846Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"zx8yw2lN5H97egY6Z49Tkv8a\",\"flash\":{},\"user\":{\"_id\":\"4f9c7141ddcebc7022000022\",\"email\":\"stankovic.zarko@gmail.com\",\"password\":\"5101d9d94c8cae583027f9279171d83d\",\"createdAt\":\"2012-04-28T22:37:53.460Z\",\"salt\":\"95d3e293492509d083c7a027b0195ef5\",\"bio\":{\"about\":\"Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst...\",\"company\":\"Max My Play, LLC\",\"github\":\"http:\/\/github.com\/ManInTheBox\",\"location\":\"Beograd, Srbija\",\"twitter\":\"http:\/\/twitter.com\/zarkostankovic\",\"website\":\"http:\/\/www.zarkostankovic.com\"},\"photo\":\"4fbeb6524757f93d2d000f8b\",\"name\":{\"first\":\"Žarko\",\"last\":\"Stanković\",\"username\":\"ManInTheBox\"}}}",
  "expires": ISODate("2012-05-30T21:21:12.846Z"),
  "sid": "WrinDLwXYM9kiV6TOoMRYBWX.m6jcl8DLG3ib9eDCAZDA4lrFG7TDDwmDMInzpkGXzsA"
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
