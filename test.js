const files = {
    upload1: [{
        files: 123
    }],
    upload2: [{
        originalname: "asdasd",
        files: 123
    }]
}

const array = Object.values(files).map((v) => v[0].files)

console.log(array)