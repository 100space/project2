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
select A.boardIdx, B.tag from Hash A JOIN HASHTAG B On (A.hashTagIdx = B.hashTagIdx) where A.boardIdx = 145
```