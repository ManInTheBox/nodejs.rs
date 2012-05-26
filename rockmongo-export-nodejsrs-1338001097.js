
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
  "_user": ObjectId("4fbeba84617d7f80390000ab"),
  "name": "HttpError",
  "stack": "HttpError: undefined\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:24:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/",
  "referrer": "http:\/\/localhost:3000\/user\/mika\/edit",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc043cd0272e6a31e00000a"),
  "createdAt": ISODate("2012-05-26T02:45:33.158Z")
});
db.getCollection("internalerrors").insert({
  "_user": ObjectId("4fbeba84617d7f80390000ab"),
  "name": "HttpError",
  "message": "nesto je crklo",
  "stack": "HttpError: nesto je crklo\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:24:9\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:272:11)\n    at param (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:246:11)\n    at pass (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:253:5)\n    at nextRoute (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:209:7)\n    at callbacks (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/router\/index.js:274:11)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/app.js:163:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)",
  "url": "\/",
  "referrer": "http:\/\/localhost:3000\/user\/mika\/edit",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc0441778f007af1e00000a"),
  "createdAt": ISODate("2012-05-26T02:46:47.856Z")
});
db.getCollection("internalerrors").insert({
  "_user": ObjectId("4fbeba84617d7f80390000ab"),
  "name": "Error",
  "message": "failed to locate view \"error\"",
  "stack": "Error: failed to locate view \"error\"\n    at Function.compile (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/view.js:61:15)\n    at ServerResponse._render (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/view.js:417:18)\n    at ServerResponse.render (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/express\/lib\/view.js:318:17)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/routes\/site.js:121:9)\n    at Promise.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:120:8)\n    at Promise.<anonymous> (events.js:67:17)\n    at Promise.emit (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:59:38)\n    at Promise.complete (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/promise.js:70:20)\n    at \/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/query.js:910:28\n    at model.<anonymous> (\/home\/zarko\/Development\/node\/nodejs.rs\/node_modules\/mongoose\/lib\/document.js:189:11)",
  "url": "\/error",
  "browser": "Mozilla\/5.0 (X11; Linux i686) AppleWebKit\/535.19 (KHTML, like Gecko) Chrome\/18.0.1025.151 Safari\/535.19",
  "method": "GET",
  "_id": ObjectId("4fc045921123b8121f00000c"),
  "createdAt": ISODate("2012-05-26T02:53:06.847Z")
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
  "_id": ObjectId("4fbff474f968afb842063351"),
  "data": "{\"lastAccess\":1338000970237,\"cookie\":{\"originalMaxAge\":14399965,\"expires\":\"2012-05-26T06:56:10.202Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"Nha61zn91prK4P3b735GWNgu\",\"flash\":{},\"user\":{\"_id\":\"4fbeba84617d7f80390000ab\",\"email\":\"pera@pera.com\",\"password\":\"d381915869faaba9f089acf9a3d4bc6d\",\"createdAt\":\"2012-05-24T22:47:32.726Z\",\"salt\":\"d75f5c509a53eedddb1f9f36db22f508\",\"bio\":{\"about\":\"Ovo je admin izmenio\"},\"photo\":\"4fbeb036b65eb1c21f0003e3\",\"name\":{\"username\":\"pera\"}}}",
  "expires": ISODate("2012-05-26T06:56:10.202Z"),
  "sid": "qnKTxc4mrfytCmOvoqh1nmYq.65pKOr8Ore4GjprEf0sWjL1wp\/s8aE83MjxpEQcxnyo"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fc02559f968afb842063352"),
  "data": "{\"lastAccess\":1337992538302,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-26T04:35:38.303Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"5CD3vgeQe3r0pW5QEo7jol8a\",\"flash\":{}}",
  "expires": ISODate("2012-05-26T04:35:38.303Z"),
  "sid": "8dCNKJ6uwWbReMSxsb4VoAZl.Iaid+amoAWypN9wX7Ne6Q3L9YP7Li344sIfa\/HPF9ds"
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
