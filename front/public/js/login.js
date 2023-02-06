const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

const signUpButton = document.getElementById("signUp")
const signInButton = document.getElementById("signIn")
const container = document.getElementById("container")
const form = document.querySelector("#form")
const idCheck = document.querySelector("input[name='userId']")
const idFocus = document.querySelector("input[name='userPw']")
const nickCheck = document.querySelector("input[name='nickName']")
const nickFocus = document.querySelector("input[name='address1']")
const address = document.querySelector("wrap_tf_keyword > input")

const joinFrm = document.querySelector("#userinfo")

const termsCheckbox = document.getElementById("termsCheckbox");
const iFrameContainer = document.getElementById("iFrameContainer");
const agreeBtn = document.getElementById("agreeBtn");
const cancelBtn = document.getElementById("cancelBtn");
const agreeText = document.getElementById("agreetext");

joinFrm.addEventListener("input", async (e) => {
    const valueFocus = e.target
    const check = e.target.name
    const checkValue = e.target.value
    if (check === "userId") {
        const response = await request.post(
            "/user/check",
            {
                userid: checkValue,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const { data } = response
        if (data) {
            let pmakeForm = valueFocus.parentNode
            let p = document.createElement("p")
            p.innerHTML = "중복된 아이디가 존재합니다."
            p.style.display = "block"
            pmakeForm.appendChild(p)
        } else {
            let pmakeForm = valueFocus.parentNode
            let [p] = pmakeForm.getElementsByTagName("p")
            pmakeForm.removeChild(p)
        }
    } else if (check === "nickName") {
        const response = await request.post(
            "/user/checkNick",
            {
                nickName: checkValue,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const { data } = response

        if (data) {
            let pmakeForm = valueFocus.parentNode
            let p = document.createElement("p")
            p.innerHTML = "중복된 닉네임이 존재합니다."
            p.style.display = "block"
            pmakeForm.appendChild(p)
        } else {
            let pmakeForm = valueFocus.parentNode
            let [p] = pmakeForm.getElementsByTagName("p")
            pmakeForm.removeChild(p)
        }
    }
})

idFocus.addEventListener("focus", (e) => {
    let idOver = idFocus.parentNode.previousSibling.previousSibling
    let overValue = idOver.lastChild.innerHTML
    let checkVal = "중복된 아이디가 존재합니다."
    if (overValue === checkVal) {
        idCheck.focus()
    }
})

nickFocus.addEventListener("focus", (e) => {
    let nickOver = nickFocus.parentNode.previousSibling.previousSibling
    let overValue = nickOver.lastChild.innerHTML
    let checkVal = "중복된 닉네임이 존재합니다."
    if (overValue === checkVal) {
        nickCheck.focus()
    }
    address.addEventListener("click", (e) => {
        e.target.focus()
    })
})

form.addEventListener("submit", async (e) => {
    try {
        e.preventDefault()
        const { userId, userPw } = e.target
        const response = await request.post("/auth", {
            userId: userId.value,
            userPw: userPw.value,
        })


        if (response.status === 200) {
            document.cookie = `token=${response.data.token}; path=/`
            document.cookie = `userId=${response.data.userId}; path=/`
            location.href = "/"
        }
    } catch (e) {
        alert("아이디와 패스워드가 다름")
    }
})




signUpButton.addEventListener("click", () => container.classList.add("right-panel-active"))
signInButton.addEventListener("click", () => container.classList.remove("right-panel-active"))

// const termsCheckbox = document.getElementById("termsCheckbox");
// const iFrameContainer = document.getElementById("iFrameContainer");
// const agreeBtn = document.getElementById("agreeBtn");
// const cancelBtn = document.getElementById("cancelBtn");
// const agreeText = document.getElementById("agreetext");



termsCheckbox.addEventListener("click", function () {
    initLayerPosition();
    if (termsCheckbox.checked) {
        iFrameContainer.style.display = "none";
    } else {
        iFrameContainer.style.display = "block";
    }
});

agreeText.addEventListener('scroll', function () {
    if (textarea.scrollTop === textarea.scrollHeight - textarea.offsetHeight) {
        agreeBtn.disabled = false;
    } else {
        agreeBtn.disabled = true;
    }
});

agreeBtn.addEventListener("click", function () {
    termsCheckbox.checked = true;
    iFrameContainer.style.display = "none";
});

cancelBtn.addEventListener("click", function (){
    termsCheckbox.checked = false;
    iFrameContainer.style.display = "none";
});

function initLayerPosition(){
    const width = 500;
    const height = 600;
    const borderWidth = 1;

    iFrameContainer.style.width = width + 'px';
    iFrameContainer.style.height = height + 'px';
    iFrameContainer.style.border = borderWidth + 'px solid';
    iFrameContainer.style.backgroundColor.white;
    iFrameContainer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/1.5 - borderWidth) + 'px';
    iFrameContainer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
}

function checkAcceptance() {
    if (!termsCheckbox.checked) {
        e.preventDefault()
        alert("이용약관을 읽고 동의를 해주세요");
    } 
  }