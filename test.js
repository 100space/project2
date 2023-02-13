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


// async findCategory(mainCd, subCd) {
//     try {
//         // select * from Category where name='notice' and subCd='0000'; mainName
//         // select * from Category where name='sub1' and not subCd in('0000'); subName

//         /*
//             select count(*) as length from (
//                 select * from Category where name='notice' and subCd='0000' 
//                 union all 
//                 select * from Category where name='sub1' and not subCd in('0000')
//             ) as A;
//         */

//         // subcd undefiend 
//         const where = {
//             name: mainCd,
//         }

//         const response = await this.sequeluze.query(`
//             select count(*) as length from (
//                 select * from Category where name='${mainCd}' and subCd='0000' 
//                 ${!subCd && `union all 
//                 select * from Category where name='${subCd}' and not subCd in('0000')`}
//             ) as A;
//         `)

//         return response
//         // const response = await this.category.findAll({ where, raw: true })
//         // return response
//     } catch (e) {
//         throw new Error('err')
//     }
// }