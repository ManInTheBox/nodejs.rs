
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
  "_id": ObjectId("4fbebc61617d7f8039000c65"),
  "_owner": ObjectId("4fbebbb4617d7f8039000569"),
  "createdAt": ISODate("2012-05-24T22:55:29.976Z"),
  "text": "mikin komentar ojha"
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4fbeba84617d7f80390000ab"),
  "text": "pera 3",
  "_id": ObjectId("4fbfb2219a4542b73c000009"),
  "createdAt": ISODate("2012-05-25T16:24:01.459Z")
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "text": "zarko 2",
  "_id": ObjectId("4fbfb2919a4542b73c00069b"),
  "createdAt": ISODate("2012-05-25T16:25:53.301Z")
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "text": "fsd",
  "_id": ObjectId("4fbfd5ce09640b974c001f7b"),
  "createdAt": ISODate("2012-05-25T18:56:14.847Z")
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "text": "asdf",
  "_id": ObjectId("4fbfd5d009640b974c002009"),
  "createdAt": ISODate("2012-05-25T18:56:16.695Z")
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "text": "asdf",
  "_id": ObjectId("4fbfd5d209640b974c002098"),
  "createdAt": ISODate("2012-05-25T18:56:18.304Z")
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "text": "adfs",
  "_id": ObjectId("4fbfd5d309640b974c002128"),
  "createdAt": ISODate("2012-05-25T18:56:19.767Z")
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "text": "afsd",
  "_id": ObjectId("4fbfd5d509640b974c0021b9"),
  "createdAt": ISODate("2012-05-25T18:56:21.793Z")
});
db.getCollection("comments").insert({
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "text": "sfad",
  "_id": ObjectId("4fbfd5d709640b974c00224b"),
  "createdAt": ISODate("2012-05-25T18:56:23.695Z")
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
  "name": "mika",
  "size": 1896383,
  "type": "image\/jpeg",
  "ext": "jpg",
  "_id": ObjectId("4fbfb0a8d1efdc1b390001f7")
});

/** posts records **/
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
  "_id": ObjectId("4fbee314dd1f0fa7120028e8"),
  "titleUrl": "perin-post",
  "_owner": ObjectId("4fbeba84617d7f80390000ab"),
  "title": "Perin post",
  "tags": [
    
  ],
  "comments": [
    
  ],
  "updatedAt": ISODate("2012-05-25T01:40:36.370Z"),
  "createdAt": ISODate("2012-05-25T01:40:36.370Z")
});
db.getCollection("posts").insert({
  "_id": ObjectId("4fbee17bdd1f0fa712001582"),
  "_owner": ObjectId("4fbebbb4617d7f8039000569"),
  "comments": [
    ObjectId("4fbfb2219a4542b73c000009"),
    ObjectId("4fbfb2919a4542b73c00069b"),
    ObjectId("4fbfd5ce09640b974c001f7b"),
    ObjectId("4fbfd5d009640b974c002009"),
    ObjectId("4fbfd5d209640b974c002098"),
    ObjectId("4fbfd5d309640b974c002128"),
    ObjectId("4fbfd5d509640b974c0021b9"),
    ObjectId("4fbfd5d709640b974c00224b")
  ],
  "createdAt": ISODate("2012-05-25T01:33:47.999Z"),
  "tags": [
    
  ],
  "title": "Mikin clanak",
  "titleUrl": "mikin-clanak",
  "updatedAt": ISODate("2012-05-25T19:25:33.277Z")
});

/** sessions records **/
db.getCollection("sessions").insert({
  "_id": ObjectId("4fbfa78f8bef6dfce483eba7"),
  "data": "{\"lastAccess\":1337974158000,\"cookie\":{\"originalMaxAge\":14399982,\"expires\":\"2012-05-25T23:29:17.994Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"Z5Xjd6OntURG1Xq0WMnSOeTQ\",\"flash\":{},\"user\":{\"_id\":\"4f9c7141ddcebc7022000022\",\"email\":\"stankovic.zarko@gmail.com\",\"password\":\"5101d9d94c8cae583027f9279171d83d\",\"createdAt\":\"2012-04-28T22:37:53.460Z\",\"salt\":\"95d3e293492509d083c7a027b0195ef5\",\"bio\":{\"about\":\"Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst... uskoro...Ovo je o meni tekst...\",\"company\":\"Max My Play, LLC\",\"github\":\"http:\/\/github.com\/ManInTheBox\",\"location\":\"Beograd, Srbija\",\"twitter\":\"http:\/\/twitter.com\/zarkostankovic\",\"website\":\"http:\/\/www.zarkostankovic.com\"},\"photo\":{\"_id\":\"4fbeb6524757f93d2d000f8b\",\"name\":\"ManInTheBox\",\"size\":168291,\"type\":\"image\/jpeg\",\"ext\":\"jpg\"},\"name\":{\"first\":\"Žarko\",\"last\":\"Stanković\",\"username\":\"ManInTheBox\"}}}",
  "expires": ISODate("2012-05-25T23:29:17.994Z"),
  "sid": "6bzLqH0osF4GTssKflNC3RrJ.hqFyrDqXuskz3YJAOykiW0uKK09wYIGe\/6prVW38L64"
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
