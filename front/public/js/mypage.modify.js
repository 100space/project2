const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})
const submitBtn = document.querySelector("#submitBtn")
const userPic = document.getElementById("userPic")
const fileInput = document.querySelectorAll("input[name='userPic']")[0]
const form = document.querySelector("#welcomeFrm");

userPic.addEventListener("click", (e) => {
    fileInput.click();
});

fileInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> {
      userPic.style.backgroundImage = `url(${reader.result})`;
    }
  });
  
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userId = e.target.action.split("/").pop();
    try {
        const response = await axios.post(`/profile/modify/${userId}`, formData);
        window.location.href = document.referrer
        } catch (error) {
        console.error(error);
    }
});