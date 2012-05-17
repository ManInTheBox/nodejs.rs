
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
db.getCollection("comments").insert({
  "_id": ObjectId("4faef814812b1c3e16000d8a"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "createdAt": ISODate("2012-05-12T23:53:56.109Z"),
  "text": "*ovo je **cool** bas*"
});
db.getCollection("comments").insert({
  "_id": ObjectId("4faf1a5605db2d561d004872"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "createdAt": ISODate("2012-05-13T02:20:06.677Z"),
  "text": "**dfafasd**"
});
db.getCollection("comments").insert({
  "_id": ObjectId("4faf1c4d9e0c09cb23000cb2"),
  "_owner": ObjectId("4faf0053c623fb1b1a000314"),
  "createdAt": ISODate("2012-05-13T02:28:29.649Z"),
  "text": "*Ovo je **cool** website*\n\n> bas je mocno\n\n```javascript\nalert('strava :D');\n```"
});

/** emails records **/
db.getCollection("emails").insert({
  "body": "Dobrodosli na Node.js Srbija\nKliknite ovde za aktivaciju:<br \/>\nOva poruka je poslata na mika@mika.com",
  "_id": ObjectId("4faf0053c623fb1b1a000315"),
  "sendingCounter": 0,
  "priority": 1,
  "type": 1,
  "createdAt": ISODate("2012-05-13T00:29:07.184Z"),
  "sent": false,
  "message": {
    "subject": "Registracija na nodejs.rs",
    "to": [
      "mika@mika.com"
    ],
    "from": "register@nodejs.rs"
  }
});
db.getCollection("emails").insert({
  "body": "Dobrodosli na Node.js Srbija\nKliknite ovde za aktivaciju:<br \/>\nOva poruka je poslata na pera@pera.com",
  "_id": ObjectId("4faf007bc623fb1b1a0009ab"),
  "sendingCounter": 0,
  "priority": 1,
  "type": 1,
  "createdAt": ISODate("2012-05-13T00:29:47.801Z"),
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
  "body": "Dobrodosli na Node.js Srbija\nKliknite ovde za aktivaciju:<br \/>\nOva poruka je poslata na asdf@asfd.com",
  "_id": ObjectId("4fb448171289ad5915001c44"),
  "sendingCounter": 0,
  "priority": 1,
  "type": 1,
  "createdAt": ISODate("2012-05-17T00:36:39.195Z"),
  "sent": false,
  "message": {
    "subject": "Registracija na nodejs.rs",
    "to": [
      "asdf@asfd.com"
    ],
    "from": "register@nodejs.rs"
  }
});

/** pictures records **/
db.getCollection("pictures").insert({
  "name": "ManInTheBox",
  "size": 270187,
  "type": "image\/jpeg",
  "_id": ObjectId("4fb43939290017ed1300063a")
});
db.getCollection("pictures").insert({
  "_id": ObjectId("4fb448161289ad5915001c43"),
  "name": "Dojocat - OCTOCATS!",
  "size": 67687,
  "type": "image\/jpeg"
});
db.getCollection("pictures").insert({
  "size": 93245,
  "type": "image\/jpeg",
  "_id": ObjectId("4fb4496d1a7f533320000574")
});
db.getCollection("pictures").insert({
  "size": 42548,
  "type": "image\/jpeg",
  "_id": ObjectId("4fb449c91a7f533320000725")
});

/** posts records **/
db.getCollection("posts").insert({
  "titleUrl": "newproba",
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "title": "New\/proba",
  "_id": ObjectId("4fa723967d5d172740000e10"),
  "comments": [
    
  ],
  "updatedAt": ISODate("2012-05-10T23:37:27.993Z"),
  "createdAt": ISODate("2012-05-07T01:21:26.70Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4fa72801de899f5a460001b9"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "comments": [
    
  ],
  "createdAt": ISODate("2012-05-07T01:40:17.288Z"),
  "title": "Aaaaaaaaaaaa",
  "titleUrl": "aaaaaaaaaaaa",
  "updatedAt": ISODate("2012-05-07T01:42:02.864Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4faef290118a08be140007d7"),
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "comments": [
    ObjectId("4faef814812b1c3e16000d8a"),
    ObjectId("4faf1c4d9e0c09cb23000cb2")
  ],
  "createdAt": ISODate("2012-05-12T23:30:24.769Z"),
  "tags": [
    "markdown",
    "text",
    "html"
  ],
  "title": "Generalni priručnik za Markdown sintaksu",
  "titleUrl": "generalni-prirucnik-za-markdown-sintaksu",
  "updatedAt": ISODate("2012-05-12T23:53:05.756Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4faf0c6e05db2d561d0017fe"),
  "_owner": ObjectId("4faf0053c623fb1b1a000314"),
  "comments": [
    ObjectId("4faf1a5605db2d561d004872")
  ],
  "createdAt": ISODate("2012-05-13T01:20:46.684Z"),
  "tags": [
    
  ],
  "title": "Mikin post",
  "titleUrl": "mikin-post",
  "updatedAt": ISODate("2012-05-13T01:20:46.684Z")
});
db.getCollection("posts").insert({
  "titleUrl": "asdfasf",
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "title": "Asdfasf",
  "_id": ObjectId("4fb02f42a11e41286e001628"),
  "tags": [
    
  ],
  "comments": [
    
  ],
  "updatedAt": ISODate("2012-05-13T22:01:38.646Z"),
  "createdAt": ISODate("2012-05-13T22:01:38.646Z")
});

/** sessions records **/
db.getCollection("sessions").insert({
  "_id": ObjectId("4fb4367befc59cdf2a03df70"),
  "data": "{\"lastAccess\":1337216310409,\"cookie\":{\"originalMaxAge\":14399996,\"expires\":\"2012-05-17T04:58:30.449Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"NKK5LgoWuEtfkWBliQD6I8Wp\",\"flash\":{},\"user\":{\"_id\":\"4f9c7141ddcebc7022000022\",\"email\":\"stankovic.zarko@gmail.com\",\"password\":\"5101d9d94c8cae583027f9279171d83d\",\"photo\":\"4fb4496d1a7f533320000574\",\"createdAt\":\"2012-04-28T22:37:53.460Z\",\"salt\":\"95d3e293492509d083c7a027b0195ef5\",\"bio\":{\"about\":\"Ja sam programer.  \\r\\n\\r\\n\\r\\nOvo je cool site.  <br \/>\\r\\n\\r\\n\\r\\nJa sam ga napravio.\\r\\n\\r\\n<script>alert('ojha')<\/script>\",\"company\":\"Max My Play, LLC\",\"github\":\"http:\/\/github.com\/ManInTheBox\",\"location\":\"Beograd, Srbija\",\"twitter\":\"http:\/\/twitter.com\/zarkostankovic\",\"website\":\"http:\/\/www.zarkostankovic.com\"},\"name\":{\"first\":\"Žarko\",\"last\":\"Stanković\",\"username\":\"ManInTheBox\"}}}",
  "expires": ISODate("2012-05-17T04:58:30.449Z"),
  "sid": "MMqQrPwpN8hlGqHHiw0Mousw.T2maGjxRo2hPyZ7LF\/LUsFfBmhlsNwrxPQ9HL\/CUnjg"
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
  "_id": ObjectId("4f9c7141ddcebc7022000022"),
  "bio": {
    "about": "Ja sam programer.  \r\n\r\n\r\nOvo je cool site.  <br \/>\r\n\r\n\r\nJa sam ga napravio.\r\n\r\n<script>alert('ojha')<\/script>",
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
  "photo": ObjectId("4fb449c91a7f533320000725"),
  "salt": "95d3e293492509d083c7a027b0195ef5"
});
db.getCollection("users").insert({
  "password": "77e64507e4fe04dc034873eec46b10cd",
  "email": "mika@mika.com",
  "_id": ObjectId("4faf0053c623fb1b1a000314"),
  "createdAt": ISODate("2012-05-13T00:29:07.180Z"),
  "salt": "7ab13aa7cc914895308248662bfc89eb",
  "name": {
    "username": "mika"
  }
});
db.getCollection("users").insert({
  "password": "ad4e9325008f7e5f6ec1b2ea4d0d6cf4",
  "email": "pera@pera.com",
  "_id": ObjectId("4faf007bc623fb1b1a0009aa"),
  "createdAt": ISODate("2012-05-13T00:29:47.797Z"),
  "salt": "5fe1bfc73d6ed66a860251f0ccc1a8e6",
  "name": {
    "username": "pera"
  }
});
db.getCollection("users").insert({
  "_id": ObjectId("4fb448161289ad5915001c42"),
  "createdAt": ISODate("2012-05-17T00:36:38.989Z"),
  "email": "asdf@asfd.com",
  "name": {
    "username": "asdf"
  },
  "password": "369dc40fa549d44f7cbf51d884c5bb05",
  "photo": ObjectId("4fb448161289ad5915001c43"),
  "salt": "bb48d0734ffdb501e8e95bd42e81cc30"
});
