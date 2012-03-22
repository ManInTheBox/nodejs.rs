
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

/** users indexes **/
db.getCollection("users").ensureIndex({
  "_id": 1
},[
  
]);

/** users indexes **/
db.getCollection("users").ensureIndex({
  "email": 1
},{
  "unique": true
});

/** users indexes **/
db.getCollection("users").ensureIndex({
  "name.username": 1
},{
  "unique": true
});

/** comments records **/
db.getCollection("comments").insert({
  "_owner": ObjectId("4f5f612b09110bc711000002"),
  "text": "kug",
  "_id": ObjectId("4f6b4e924d413cc46900001d"),
  "createdAt": ISODate("2012-03-22T16:08:50.809Z")
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4f69e5a68cc3dfbe56000016"),
  "text": "ahahah",
  "_id": ObjectId("4f6b7d154d413cc4690000a0"),
  "createdAt": ISODate("2012-03-22T19:27:17.614Z")
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4f5f612b09110bc711000002"),
  "text": "asd sdsd dfs",
  "_id": ObjectId("4f6b7de84d413cc4690000cf"),
  "createdAt": ISODate("2012-03-22T19:30:48.491Z")
});

/** emails records **/
db.getCollection("emails").insert({
  "_id": ObjectId("4f5f612b09110bc711000003"),
  "body": "Dobrodosli na Node.js Srbija\nKliknite ovde za aktivaciju:<br \/>\nOva poruka je poslata na zarko.stankovic@itsmyplay.com",
  "createdAt": ISODate("2012-03-13T15:00:59.957Z"),
  "message": {
    "subject": "Registracija na nodejs.rs",
    "to": [
      "zarko.stankovic@itsmyplay.com"
    ],
    "from": "register@nodejs.rs"
  },
  "priority": 1,
  "sendingCounter": 1,
  "sent": false,
  "sentAt": ISODate("2012-03-13T17:17:30.230Z"),
  "type": 1
});
db.getCollection("emails").insert({
  "body": "Dobrodosli na Node.js Srbija\nKliknite ovde za aktivaciju:<br \/>\nOva poruka je poslata na test1@test.com",
  "_id": ObjectId("4f69e5a68cc3dfbe56000017"),
  "sendingCounter": 0,
  "priority": 1,
  "type": 1,
  "createdAt": ISODate("2012-03-21T14:28:54.849Z"),
  "sent": false,
  "message": {
    "subject": "Registracija na nodejs.rs",
    "to": [
      "test1@test.com"
    ],
    "from": "register@nodejs.rs"
  }
});

/** pictures records **/
db.getCollection("pictures").insert({
  "path": "\/tmp\/31afc469d18097b53ac8ba55320baf7f",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b4c081155046765000003")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/f8f98aa29d41dc622e556b3ecbe418bb",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b4c3997950afb65000003")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/18d36b538456f59b8c015f63d033cccc",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b4c61ea923e6166000003")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/55cbd02909fbd571f881a9bd7787eeaf",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b4cc529d07d6367000004")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/425da64d3e844500a3ca3e2f2f9c78e6",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b4df64d413cc469000006")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/7ef806e9989274a57922a6c18aa2146c",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b4e204d413cc46900000b")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/0c7e8f92071e0f9e7fb123874196d6da",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b4e354d413cc469000010")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/86c39a909026a873be398c606beb95b9",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b4e544d413cc469000015")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/4645cd1c864988b54e73b4576a3a1279",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b4fff4d413cc46900005c")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/a98f095577a2dfd2848b822dd5318641",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b54c44d413cc46900006c")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/4ea07fc740e0730fbb995ccd9bbcb3cf",
  "name": "test1",
  "_id": ObjectId("4f6b7d2c4d413cc4690000a9")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/9373e1018c1f61e404fc73d94309e46e",
  "name": "test1",
  "_id": ObjectId("4f6b7d434d413cc4690000b8")
});
db.getCollection("pictures").insert({
  "path": "\/tmp\/bfbd84c4d7f3a0aa306234cc2003c134",
  "name": "ManInTheBox",
  "_id": ObjectId("4f6b84314d413cc469000111")
});

/** posts records **/
db.getCollection("posts").insert({
  "_id": ObjectId("4f6b2c7139a2909f0a000005"),
  "comments": [
    ObjectId("4f6b4e924d413cc46900001d"),
    ObjectId("4f6b7d154d413cc4690000a0"),
    ObjectId("4f6b7de84d413cc4690000cf")
  ],
  "createdAt": ISODate("2012-03-22T13:43:13.359Z"),
  "owner": ObjectId("4f5f612b09110bc711000002"),
  "tags": [
    "coffeescript",
    "node.js",
    "npm",
    "search-engine",
    "c++"
  ],
  "title": "Testing Private State and Mocking Dependencies test test asd",
  "titleUrl": "testing-private-state-and-mocking-dependencies-test-test-asd",
  "updatedAt": ISODate("2012-03-22T22:00:12.456Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4f6b8cf7d97396807100007a"),
  "comments": [
    
  ],
  "createdAt": ISODate("2012-03-22T20:35:03.195Z"),
  "owner": ObjectId("4f5f612b09110bc711000002"),
  "tags": [
    "aasdf",
    "asdf"
  ],
  "title": "Ovo je neki najnoviji post",
  "titleUrl": "ovo-je-neki-najnoviji-post",
  "updatedAt": ISODate("2012-03-22T22:16:32.201Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4f6b8ea0d9739680710000c7"),
  "comments": [
    
  ],
  "createdAt": ISODate("2012-03-22T20:42:08.536Z"),
  "owner": ObjectId("4f5f612b09110bc711000002"),
  "tags": [
    "sdf",
    "asdf",
    "asdf",
    "asdf"
  ],
  "title": "Asdfasdf",
  "titleUrl": "asdfasdf",
  "updatedAt": ISODate("2012-03-22T22:20:17.257Z")
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
    "email": 1
  },
  "unique": true,
  "ns": "nodejsrs.users",
  "name": "email_1",
  "sparse": false,
  "background": false
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
    "name.username": 1
  },
  "unique": true,
  "ns": "nodejsrs.users",
  "name": "name.username_1"
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
  "ns": "nodejsrs.pictures",
  "name": "_id_"
});

/** users records **/
db.getCollection("users").insert({
  "_id": ObjectId("4f69e5a68cc3dfbe56000016"),
  "createdAt": ISODate("2012-03-21T14:28:54.840Z"),
  "email": "test1@test.com",
  "name": {
    "username": "test1"
  },
  "password": "a3e26565a23160938b6e94f0d0d080b6",
  "photo": ObjectId("4f6b7d434d413cc4690000b8"),
  "salt": "afca01c1d5e9fc352d94e076f05a5d7f"
});
db.getCollection("users").insert({
  "_id": ObjectId("4f5f612b09110bc711000002"),
  "bio": {
    "about": "Aaasdf asdfsdf\r\nsdsdfdfs sdf\r\n\r\n\r\n**adsfasdf**",
    "github": "http:\/\/www.github.com\/ManInTheBox",
    "location": "Beograd, Srbija",
    "twitter": "http:\/\/twitter.com\/zarkostankovic",
    "website": "http:\/\/zarkostankovic.com"
  },
  "createdAt": ISODate("2012-03-13T15:00:59.931Z"),
  "email": "zarko.stankovic@itsmyplay.com",
  "name": {
    "first": "Zarko",
    "last": "Stankovic",
    "username": "ManInTheBox"
  },
  "password": "f9a09a43eab22bf1ea487f1dd864798a",
  "photo": ObjectId("4f6b84314d413cc469000111"),
  "salt": "6d99da9454ea0c5342c88faded3ccd5f"
});
