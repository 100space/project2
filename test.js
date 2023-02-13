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

```sql
SELECT A.tag FROM Hashtag A JOIN Hash B ON A.hashTagIdx = B.hashTagIdx WHERE B.boardIdx =136
```