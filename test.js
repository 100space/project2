// const files = {
//     upload1: [{
//         files: 123
//     }],
//     upload2: [{
//         originalname: "asdasd",
//         files: 123
//     }]
// }

// const array = Object.values(files).map((v) => v[0].files)

// console.log(array)

// Hash용
// ```sql
// SELECT B.hashtagIdx FROM Board A JOIN Hash B ON A.boardIdx =B.boardIdx

// (SELECT hashTagIdx, tag FROM Hashtag)
// qqq

;```sql
SELECT A.tag FROM Hashtag A JOIN Hash B ON A.hashTagIdx = B.hashTagIdx WHERE B.boardIdx =136
``````sql
SELECT A.* FROM Board A JOIN (SELECT A.boardIdx From Liked A JOIN User B ON A.userId = B.userId WHERE A.userId = "admin1") B ON A.boardIdx = B.boardIdx;
``````sql
    
    SELECT A.cmdIdx, A.recmdContent, A.userId FROM Recomment A JOIN (SELECT A.cmdIdx FROM Comment A JOIN Board B ON A.boardIdx = B.boardIdx WHERE A.boardIdx = 1) B ON A.cmdIdx = B.cmdIdx ORDER BY DESC

```

```

```sql
SELECT A.* From Board A JOIN Comment B ON A.boardIdx = B.boardIdx Where B.userId = "admin1"
```

