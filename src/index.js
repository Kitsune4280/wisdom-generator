const container = document.querySelector('.container');
const motivation = document.querySelector('.motivation-msg');
const author = document.querySelector('.motivation-author');
const welcome = document.querySelector('.welcome-msg')
const button = document.querySelector('.btn');
const footer = document.querySelector('.footer');
const loadText = document.querySelector('.load-text');
let load = 0;
let int;

const backupQuotes = [
    {
        quote: 'The fool doth think he is wise, but the wise man knows himself to be a fool.',
        author: 'William Shakespeare'
    },
    {
        quote: 'Whenever you find yourself on the side of the majority, it is time to reform (or pause and reflect).',
        author: 'Mark Twain'
    },
    {
        quote: 'Knowing yourself is the beginning of all wisdom.',
        author: 'Aristotle'
    },
    {
        quote: 'May you live every day of your life.',
        author: 'Jonathan Swift'
    },
    {
        quote: 'Any fool can know. The point is to understand.',
        author: 'Albert Einstein'
    },
    {
        quote: 'Never let your sense of morals prevent you from doing what is right.',
        author: 'Isaac Asimov'
    },
    {
        quote: 'Angry people are not always wise.',
        author: 'Jane Austen'
    },
    {
        quote: 'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.',
        author: 'Rumi'
    },
    {
        quote: 'The simple things are also the most extraordinary things, and only the wise can see them.',
        author: 'Paulo Coelho'
    },
    {
        quote: 'The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom.',
        author: 'Isaac Asimov'
    },
];


const api = 'https://api.quotable.io/random';

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * 
    (out_max - out_min) / (in_max - in_min)
     + out_min;
}

const bgs = ['butterflies.jpg', 'coffee.jpg', 'forest.jpg', 'milky-way.jpg', 'pebbles.jpg',
'skyline.jpg', 'balance.jpg', 'trees.jpg', 'water.jpg', 'wave.jpg'];

function getBackupQuote(){
    const r = Math.floor(Math.random() * backupQuotes.length);
    motivation.innerHTML = backupQuotes[r].quote;
    author.innerHTML = backupQuotes[r].author;
}

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

getBackupQuote();
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



