
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
  "body": "Dobrodosli na Node.js Srbija\nKliknite ovde za aktivaciju:<br \/>\nOva poruka je poslata na stankovic.zarko@gmail.com",
  "_id": ObjectId("4f9c7141ddcebc7022000023"),
  "sendingCounter": 0,
  "priority": 1,
  "type": 1,
  "createdAt": ISODate("2012-04-28T22:37:53.467Z"),
  "sent": false,
  "message": {
    "subject": "Registracija na nodejs.rs",
    "to": [
      "stankovic.zarko@gmail.com"
    ],
    "from": "register@nodejs.rs"
  }
});

/** pictures records **/

/** posts records **/
db.getCollection("posts").insert({
  "titleUrl": "prvi-test-clanak",
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "title": "Prvi test clanak",
  "_id": ObjectId("4f9c716f4f5ddf7622000084"),
  "tags": [
    "test",
    "clanak"
  ],
  "comments": [
    
  ],
  "updatedAt": ISODate("2012-04-29T04:14:31.362Z"),
  "createdAt": ISODate("2012-04-28T22:38:39.417Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4f9d7c72aeceb743180002e9"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "comments": [
    
  ],
  "createdAt": ISODate("2012-04-29T17:37:54.432Z"),
  "tags": [
    "test"
  ],
  "title": "Sdfaa",
  "titleUrl": "sdfaa",
  "updatedAt": ISODate("2012-04-29T21:47:58.903Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4f9d7c76aeceb743180003c7"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "createdAt": ISODate("2012-04-29T17:37:58.150Z"),
  "title": "Bbb",
  "titleUrl": "bbb",
  "updatedAt": ISODate("2012-04-30T03:50:45.993Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4f9d7c7aaeceb743180004ef"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "comments": [
    
  ],
  "createdAt": ISODate("2012-04-29T17:38:02.199Z"),
  "tags": [
    "test"
  ],
  "title": "Ccc",
  "titleUrl": "ccc",
  "updatedAt": ISODate("2012-04-29T21:47:48.237Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4f9dbee5cce2460c460002a3"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "createdAt": ISODate("2012-04-29T22:21:25.534Z"),
  "tags": [
    "test",
    "node"
  ],
  "title": "Dfasddas",
  "titleUrl": "dfasddas",
  "updatedAt": ISODate("2012-04-30T00:35:49.74Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4f9e11050a880ce97900562f"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "comments": [
    
  ],
  "createdAt": ISODate("2012-04-30T04:11:49.322Z"),
  "tags": [
    "asdf",
    "dfs'==sfddfs",
    "324-?xcsdsdsd",
    "sdfp3``f__=-",
    "<script>document.write(5.tostring())<\/script>"
  ],
  "title": "Asdf",
  "titleUrl": "asdf",
  "updatedAt": ISODate("2012-04-30T04:15:59.662Z")
});

/** sessions records **/
db.getCollection("sessions").insert({
  "_id": ObjectId("4f9d7c355da5620914f1d0ec"),
  "data": "{\"lastAccess\":1335763834263,\"cookie\":{\"originalMaxAge\":14399896,\"expires\":\"2012-04-30T09:30:34.179Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"wgUA3H6j1dXQHjtlgiT0NOt9\",\"flash\":{},\"user\":{\"password\":\"5101d9d94c8cae583027f9279171d83d\",\"email\":\"stankovic.zarko@gmail.com\",\"_id\":\"4f9c7141ddcebc7022000022\",\"createdAt\":\"2012-04-28T22:37:53.460Z\",\"salt\":\"95d3e293492509d083c7a027b0195ef5\",\"bio\":{},\"name\":{\"username\":\"ManInTheBox\"}}}",
  "expires": ISODate("2012-04-30T09:30:34.179Z"),
  "sid": "cZ2MDCzoHfHEhLyJHORyZAtF.gAScorC4GrXWxkRtup6319SLRHp798rfahilZyml4ko"
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
    "email": 1
  },
  "unique": true,
  "ns": "nodejsrs.users",
  "name": "email_1"
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
  "ns": "nodejsrs.comments",
  "name": "_id_"
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

/** users records **/
db.getCollection("users").insert({
  "password": "5101d9d94c8cae583027f9279171d83d",
  "email": "stankovic.zarko@gmail.com",
  "_id": ObjectId("4f9c7141ddcebc7022000022"),
  "createdAt": ISODate("2012-04-28T22:37:53.460Z"),
  "salt": "95d3e293492509d083c7a027b0195ef5",
  "name": {
    "username": "ManInTheBox"
  }
});
