const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

const signUpButton = document.getElementById("signUp")
const signInButton = document.getElementById("signIn")
const container = document.getElementById("container")
const idcheck = document.querySelector("input[name='userPw']")
console.log(idcheck)


signUpButton.addEventListener("click", () => container.classList.add("right-panel-active"))

signInButton.addEventListener("click", () => container.classList.remove("right-panel-active"))

