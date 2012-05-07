
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

/** pictures records **/

/** posts records **/
db.getCollection("posts").insert({
  "titleUrl": "newproba",
  "_owner": ObjectId("4f9c7141ddcebc7022000022"),
  "title": "New\/proba",
  "_id": ObjectId("4fa723967d5d172740000e10"),
  "comments": [
    
  ],
  "updatedAt": ISODate("2012-05-07T01:21:26.70Z"),
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

/** sessions records **/
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa6e42d93b2d65239982f3b"),
  "data": "{\"lastAccess\":1336357405785,\"cookie\":{\"originalMaxAge\":14399981,\"expires\":\"2012-05-07T06:23:25.786Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"z07zrnoR8QwSFnQ1zY13HTYB\",\"flash\":{},\"user\":{\"_id\":\"4f9c7141ddcebc7022000022\",\"email\":\"stankovic.zarko@gmail.com\",\"password\":\"5101d9d94c8cae583027f9279171d83d\",\"createdAt\":\"2012-04-28T22:37:53.460Z\",\"salt\":\"95d3e293492509d083c7a027b0195ef5\",\"bio\":{\"company\":\"Max My Play, LLC\",\"github\":\"http:\/\/github.com\/ManInTheBox\",\"location\":\"Beograd, Srbija\",\"twitter\":\"http:\/\/twitter.com\/zarkostankovic\",\"website\":\"http:\/\/www.zarkostankovic.com\"},\"name\":{\"first\":\"Žarko\",\"last\":\"Stanković\",\"username\":\"ManInTheBox\"}}}",
  "expires": ISODate("2012-05-07T06:23:25.786Z"),
  "sid": "9wjBNyn5opMeaArDJEkuQn1M.4ZI4rpx3fVZ5+yKiq7GZaKD5ci983lpdZv6jjiLM324"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71b8093b2d65239982f3c"),
  "data": "{\"lastAccess\":1336351616166,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:46:56.179Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"ClGPMZwu4Gh5PGIUgb9lDGjA\"}",
  "expires": ISODate("2012-05-07T04:46:56.179Z"),
  "sid": "DIbMwuWxoXTicHaWXiUGhgaf.9xT4KmgHkWPavuq1y2pBswEmDWLPW8gAnNRAzYdc6YI"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71b9793b2d65239982f3d"),
  "data": "{\"lastAccess\":1336351639147,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:47:19.160Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"vNG8L8IHphS3eHwg5SuM9vu5\"}",
  "expires": ISODate("2012-05-07T04:47:19.160Z"),
  "sid": "CRzH6C6hLPaWtlr7R3wHyUfq.44sN3pGHq+CEnG\/r\/Ufpk72zHaAX+cVuju341gKqUW4"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71bbb93b2d65239982f3e"),
  "data": "{\"lastAccess\":1336351675542,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:47:55.553Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"Ax21ikZ0F3U3kmWwd30Wy83A\"}",
  "expires": ISODate("2012-05-07T04:47:55.553Z"),
  "sid": "qfJeEgPrM4THy92mtdyiB8J9.xkpq0FB5LjR4yTDQl\/0Gvx7bD56u0co0KSSaAlqLbcc"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71bbd93b2d65239982f3f"),
  "data": "{\"lastAccess\":1336351677700,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:47:57.716Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"jFqnNbdGXA0w4R2uoBDOR741\"}",
  "expires": ISODate("2012-05-07T04:47:57.716Z"),
  "sid": "NQwRdido8vRTm1A43ydG6q9X.fOxxzagZYzyaBAGGbC+XzvSsycFcIc\/fvMVH\/hmMVvs"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71bd593b2d65239982f40"),
  "data": "{\"lastAccess\":1336351701883,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:48:21.894Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"Qmmd2TkbZa474egCGMe85XdC\"}",
  "expires": ISODate("2012-05-07T04:48:21.894Z"),
  "sid": "XfFHPQji1d5r4N1rdjEipL8z.iqDwMIU8f++YoMx5BQ8HEpu4xJjd8SddcjKlZJ4TO14"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71bd593b2d65239982f41"),
  "data": "{\"lastAccess\":1336351701898,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:48:21.901Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"EAyDodiXrOZU2H0SZ2BRwrrj\"}",
  "expires": ISODate("2012-05-07T04:48:21.901Z"),
  "sid": "OnvYyBP0xne76EcM9MBfxITH.r2VmocEdTaNdok7ct8jDU0OIrOPEwO7eO\/ab3Sj08OE"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71bd593b2d65239982f42"),
  "data": "{\"lastAccess\":1336351701903,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:48:21.906Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"NiFEILffC45Pqio21IhYV9V1\"}",
  "expires": ISODate("2012-05-07T04:48:21.906Z"),
  "sid": "O1vBEHKyy5P1BT1GST9L9usN.BG3oPHkRwkqOnAKS8ywgyIQKjOxKPCG0R3htwmrjU2M"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71bd593b2d65239982f43"),
  "data": "{\"lastAccess\":1336351701907,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:48:21.910Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"dW4vVF7mZkt7NOK0uwGx0AZG\"}",
  "expires": ISODate("2012-05-07T04:48:21.910Z"),
  "sid": "T0oJkCHVXMKyblyzsjeyUX9G.ddEo24j\/m+\/XQ+zXUsrDfvylHByTcQMHVYpZdjAAEic"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71bd593b2d65239982f44"),
  "data": "{\"lastAccess\":1336351701911,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:48:21.913Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"VT0NzlZlDC81VIRH81qt40hm\"}",
  "expires": ISODate("2012-05-07T04:48:21.913Z"),
  "sid": "JaaNhJ5H64IbJ4CqPsdrMhGb.D\/mAq7q1sztPQJLlpz71tXQRIuPWrXpEWvlzgGVCpJ8"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c0c93b2d65239982f45"),
  "data": "{\"lastAccess\":1336351756964,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:49:16.976Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"SNBAepo4BX6iyR0G2cNBzjiX\"}",
  "expires": ISODate("2012-05-07T04:49:16.976Z"),
  "sid": "aQYtph5INYUEznxIJpKbthCl.VKoQ5nFwGOBhv33PsP1ge3R1kbJqdujjSVsxYW11puk"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c0c93b2d65239982f46"),
  "data": "{\"lastAccess\":1336351756980,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:49:16.983Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"pEFCLs5I3LzRYHrbhwcqI6ql\"}",
  "expires": ISODate("2012-05-07T04:49:16.983Z"),
  "sid": "OHs880SoRujMkTZFKfibQq2z.TYX3oXkGOVfHHmsgQvr51kCHaoVEbyPszflZ3dmwvhU"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c0c93b2d65239982f47"),
  "data": "{\"lastAccess\":1336351756986,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:49:16.989Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"9pcz6rdTxMOzw1KsilRQ0SBV\"}",
  "expires": ISODate("2012-05-07T04:49:16.989Z"),
  "sid": "Fz3xEuWUJWQuH9DfZp39jLlU.oSC2JBVNSU0nnvaTlqbJyPdO+quYdupQBDJnYeqQyqw"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c0c93b2d65239982f48"),
  "data": "{\"lastAccess\":1336351756991,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:49:16.993Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"m9RlYv9Xb7lDWCU8PX1WCEez\"}",
  "expires": ISODate("2012-05-07T04:49:16.993Z"),
  "sid": "izFh0LJMP3b559wwpDwwIu3i.wQBS8EgMYNNz3ZHib6q8JFr6trCaziPdcyUmrvclfQ4"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c0c93b2d65239982f49"),
  "data": "{\"lastAccess\":1336351756995,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:49:16.997Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"6mqH9FEwN6HKNa63DCZMoVe5\"}",
  "expires": ISODate("2012-05-07T04:49:16.997Z"),
  "sid": "b1DAduZGk79ASxIKuQbJfdcX.37y7Z6Rc1WIQoCy1A+xgX3mKOEXZBM4DKgDiPwazAK8"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c7a93b2d65239982f4a"),
  "data": "{\"lastAccess\":1336351866395,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:51:06.406Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"kEmm4bpLPCygPWVtjSDM3Kjl\"}",
  "expires": ISODate("2012-05-07T04:51:06.406Z"),
  "sid": "0915snlXcfMKcJeeNHHTXhql.oxd9riJGSk9EKcSoaaSYN4KJkqdbfNQTtlp2IcNwxbY"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c8c93b2d65239982f4b"),
  "data": "{\"lastAccess\":1336351884021,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:51:24.034Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"LPTSp9539QNOG8YQNAmRzXHP\"}",
  "expires": ISODate("2012-05-07T04:51:24.34Z"),
  "sid": "t75wtL2VcCVcSiJUkK5GEQ5E.ODeGx8WOYSKh1k3TIyYD2LoHCGOAQy6HY2pKV+hfS3M"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c8c93b2d65239982f4c"),
  "data": "{\"lastAccess\":1336351884038,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:51:24.042Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"xVO9Id2lSKxCDJYsGYYiGJe9\"}",
  "expires": ISODate("2012-05-07T04:51:24.42Z"),
  "sid": "OVumZiLrnSwiohzO9ChbZEgo.qZR4j31SwdSBRT9OPp+dX\/t5qBPT+Nd0ERxnln+AAJ0"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c8c93b2d65239982f4d"),
  "data": "{\"lastAccess\":1336351884045,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:51:24.047Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"9gZGgecxuCc26EYya9LxWAMG\"}",
  "expires": ISODate("2012-05-07T04:51:24.47Z"),
  "sid": "VzamJPRl4xzqhfw5QMGIuhjC.cgLYMK+pPol7UMOw\/8f6CLZRsQGne8JaB+hh+VaOwqQ"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c8c93b2d65239982f4e"),
  "data": "{\"lastAccess\":1336351884049,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:51:24.053Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"Mn0KoPu77lLpXLHC7Z4cFkHa\"}",
  "expires": ISODate("2012-05-07T04:51:24.53Z"),
  "sid": "6g6pZ51DPiSZkRNgzpMr32pM.nOqr5Q9twOEA74udUggTtPOVoN7IKSTMYGSUoFPMHc8"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c8c93b2d65239982f4f"),
  "data": "{\"lastAccess\":1336351884054,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:51:24.056Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"6q8GK8TzVafc4L1bCZIPkA9v\"}",
  "expires": ISODate("2012-05-07T04:51:24.56Z"),
  "sid": "l1vmPHrD7vhM2HeSnF7Dn6O1.CsDZesYi2GJmERYdkcWpJGLeh67KOecisZNbCB++6b0"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71c9693b2d65239982f50"),
  "data": "{\"lastAccess\":1336351894118,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:51:34.132Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"fePhyLYSQi5vZg3RUICCKeOi\"}",
  "expires": ISODate("2012-05-07T04:51:34.132Z"),
  "sid": "EntlkWQVrkSV10iaLKsvXcco.T6Ixz\/tN9OE6z8LToTN+BroogbiMkLoPUzF6MUATOe8"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71cdf93b2d65239982f51"),
  "data": "{\"lastAccess\":1336351967336,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:52:47.353Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"BLrpsP4rtU4W4suORoMzm369\"}",
  "expires": ISODate("2012-05-07T04:52:47.353Z"),
  "sid": "vE0bJhgOtsMnpfTUswpcuDop.HGG8TghUGKIOc7ImKxFD710k+JYbJ3B+aQ7LE3z1ZwM"
});
db.getCollection("sessions").insert({
  "_id": ObjectId("4fa71ceb93b2d65239982f52"),
  "data": "{\"lastAccess\":1336351979040,\"cookie\":{\"originalMaxAge\":14400000,\"expires\":\"2012-05-07T04:52:59.053Z\",\"httpOnly\":true,\"path\":\"\/\"},\"_csrf\":\"MJy5lBZwTuYsfKaiwF6Fqreq\"}",
  "expires": ISODate("2012-05-07T04:52:59.53Z"),
  "sid": "8DkE3fwjxH6mni3cFjtLRcbn.khYlBOF2wWKwDCx8c82al6oR8XbBcTnjl4\/fDAxnTYc"
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
  "salt": "95d3e293492509d083c7a027b0195ef5"
});
