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
const hours = document.querySelectorAll(".bar2")
const likes = document.querySelectorAll(".bar3")
const countValue = document.querySelectorAll(".valueName")
for (let i = 0; i <bars.length; i++){
    const bar = bars[i]
}
let countArray = []
for(let i= 0 ;i<countValue.length; i++){
    countArray.push(Number(countValue[i].innerHTML))
}

let sumCount = countArray.reduce( (acc,cur, idx)=>{return acc += cur},0)

countArray = countArray.map(x =>{
    let result =(x/sumCount) * 100 
    return result
})
console.log(countArray[0])



dailyGraph.addEventListener('click', () =>{
    for(let i=0; i<bars.length; i++){
        bars[i].style.height = `${countArray[i]}%`
    }
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