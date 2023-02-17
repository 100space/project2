const request = axios.create({
    baseURL : "http://13.209.76.244:3000",
    withCredentials : true,
})
const dailyGraph = document.querySelector('#dailyGraph');
const timeGraph = document.querySelector('#TimeGraph');
const likedGraph = document.querySelector('#likedGraph');
const hashtagGraph = document.querySelector('#hashtagGraph');
const likedByGenderGraph = document.querySelector('#likedByGenderGraph');
const graph = document.querySelector('.graph');
const chart = document.getElementById("chart");

const data = {};

    

dailyGraph.addEventListener('click', async (e) => {
    console.log(e);
    const response = await request.get("/board/board.repository.js", {data})
    console.log(response);
    const today = new Date();
    const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const filteredData = data.filter(({ date }) => new Date(date) >= oneWeekAgo);

})