const container = document.querySelector('.container');
const motivation = document.querySelector('.motivation-msg');
const author = document.querySelector('.motivation-author');
const welcome = document.querySelector('.welcome-msg')
const button = document.querySelector('.btn');
const footer = document.querySelector('.footer');
const loadText = document.querySelector('.load-text');
let load = 0;
let int;


const api = 'https://api.quotable.io/random';

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * 
    (out_max - out_min) / (in_max - in_min)
     + out_min;
}

const bgs = ['butterflies.jpg', 'coffee.jpg', 'forest.jpg', 'milky-way.jpg', 'pebbles.jpg',
'skyline.jpg', 'balance.jpg', 'trees.jpg', 'water.jpg', 'wave.jpg'];

function getQuote(){
    fetch(api)
    .then(response => response.json())
    .then(data => {
        motivation.innerHTML = data.content;
        author.innerHTML = data.author;
    }).catch(error =>{
        console.error(error);
    })
}

getQuote();

function blurring(){
    load++;
    if(load > 99){
        clearInterval(int);
    }

    container.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
    motivation.style.filter = `blur(${scale(load, 0, 100, 1, 0)}px)`;
    author.style.filter = `blur(${scale(load, 0, 100, 1, 0)}px)`;
}

button.addEventListener('click', () =>{
    const random = Math.floor(Math.random() * bgs.length);
    welcome.style.display = 'none';
    button.style.display = 'none';

    footer.style.display = 'none';
    motivation.style.display = 'block';
    author.style.display = 'block';
    
    container.style.backgroundImage = `url("images/${bgs[random]}")`;
    container.style.height = '100vh';

    int = setInterval(blurring, 30);
})



