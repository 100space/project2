// const files = {
//     upload1: [{
//         files: 123
//     }],
//     upload2: [{
//         originalname: "asdasd",
//         files: 123
//     }]
// }

const { randomBytes } = require('crypto')

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
SELECT A.userId, A.subject, A.viewCount, A.liked, A.boardIdx, A.cateCd, MIN(B.picture) AS picture
FROM (
  SELECT userId, subject, viewCount, liked, content, boardIdx, cateCd 
  FROM Board 
  ORDER BY RAND() LIMIT 7
) A 
JOIN Picture B ON A.boardIdx = B.boardIdx 
GROUP BY A.userId, A.subject, A.viewCount, A.liked, A.boardIdx, A.cateCd; 


```


```sql
SELECT  A.userId, A.subject, A.viewCount, A.liked, A.boardIdx, A.cateCd, B.picture FROM (SELECT userId, subject, viewCount, liked, content, boardIdx, cateCd From Board ORDER BY RAND() LIMIT 7) A JOIN Picture B ON A.boardIdx = B.boardIdx GROUP BY A.boardIdx
(SELECT userId, subject, viewCount, liked, content, boardIdx, cateCd From Board ORDER BY RAND() LIMIT 7)
```

