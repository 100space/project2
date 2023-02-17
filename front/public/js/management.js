const request = axios.create({
    baseURL : "http://127.0.0.1:3000",
    withCredentials : true,
})
const dailyGraph = document.querySelector('#dailyGraph')
const timeGraph = document.querySelector('#TimeGraph')
const likedGraph = document.querySelector('#likedGraph')
const hashtagGraph = document.querySelector('#hashtagGraph')
const graph = document.querySelector('.graph')
const chart = document.getElementById("chart")
const bars = document.querySelectorAll('.bar')
for (let i = 0; i <bars.length; i++){
    const bar = bars[i]
}

dailyGraph.addEventListener('click', () =>{
    bars[0].style.height = '20%'
    bars[1].style.height = '38%'
    bars[2].style.height = '92%'
    bars[3].style.height = '89%'
    bars[4].style.height = '32%'
    bars[5].style.height = '44%'
})

timeGraph.addEventListener('click', () =>{
    bar3.style.height = '200px'
})

likedGraph.addEventListener('click', () =>{
    bar6.style.height = '200px'
})

hashtagGraph.addEventListener('click', () =>{
    bar2.style.height = '200px'
})