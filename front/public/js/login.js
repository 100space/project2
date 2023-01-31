const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

//login
const loginForm = document.querySelector("#form")
const logininput = document.querySelectorAll("#form > label >input")

// join
const userInfo = document.querySelector("#userinfo")
const input = document.querySelectorAll("#userinfo > label > input")

signUpButton.addEventListener('click', () =>
    container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
    container.classList.remove('right-panel-active'));

// login
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let loginValue = []
    for (let i = 0; i < logininput.length; i++) {
        loginValue.push(logininput[i].value)
    }
    console.log(loginValue)
    const [userId, userPw] = loginValue

})

// join
userInfo.addEventListener("submit", async (e) => {
    e.preventDefault()
    let userValue = []
    for (let i = 0; i < input.length; i++) {
        userValue.push(input[i].value)
    }
    const [userId, userPw, userName, nickName, address, gender, phoneNum, userEmail, userIntro, userPic] = userValue
    const response = await axios.post("http://127.0.0.1:3000/user/join", {
        userId,
        userPw,
        userName,
        nickName,
        address,
        gender,
        phoneNum,
        userEmail,
        userIntro,
        userPic
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    for (let j = 0; j < userValue.length; j++) {
        document.cookie = `cookie${j}=${userValue[j]}`
    }

})
