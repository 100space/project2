const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true
})

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const userInfo = document.querySelector("#userinfo")
const input = document.querySelectorAll("#userinfo > label > input")

signUpButton.addEventListener('click', () =>
    container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
    container.classList.remove('right-panel-active'));


userInfo.addEventListener("submit", async (e) => {
    e.preventDefault()
    let userValue = []
    for (let i = 0; i < input.length; i++) {
        userValue.push(input[i].value)
    }
    const [userid, userpw, userName, nickName, address, gender, phoneNum, email, introduce, userPic] = userValue
    const response = axios.post("http://127.0.0.1:3000/user/join", {
        userid,
        userpw,
        userName,
        nickName,
        address,
        gender,
        phoneNum,
        email,
        introduce,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
})
