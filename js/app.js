'use strict';
//creating variables for HTML elements
var container = document.getElementById('container');
var firstImg = document.getElementById('firstImg');
var secondImg = document.getElementById('secondImg');
var finalImg = document.getElementById('finalImg');
var result = document.getElementById('result');

var imgPaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg'
    , 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg'
    , 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

//Creating a constructor for buss mall
function Mall(name) {
    this.name = name.split('.')[0];
    this.imgPath = (`img/assets/${name}`);  // I will send {name} as parameter when I creat an object
    this.clicks = 0;                       // to count the event clicks
    this.views = 0;                         // to count how many time the img showed
    Mall.all.push(this);                 // every time the object created will be pushed to Mall array
};
Mall.all = [];       // this array will containes all object created by Mall constructor, so I can save the properties to access the data any time.
var clicksData = []; var viewsData = [];

// ---------------------------------------------->products objects<-----------------------

// the following loop creat objects for all imgPaths array, and I can go back to this objects br {Mall.all} array.
for (var i = 0; i < imgPaths.length; i++) {
    new Mall(imgPaths[i]);
};

getProduct();               //>> this call once, just at rendering the page or reload it

// ----------------------------------get and set ------------------------
function setProduct() {
    var products = JSON.stringify(Mall.all);
    localStorage.setItem('MallProducts', products);
};

function getProduct() {
    var productStored = localStorage.getItem('MallProducts');
    if (productStored) {
        Mall.all = JSON.parse(productStored);
        
        // resultVote();
    };
    render();
};


// ----------->Helper function/randome number<--------------------------------------------------------

// the following function creat randome number between max and min
function randomImg(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//-----------> rendering 3 unique imgs beside each other <----------------------------------------------

var first, second, final;                      //these value will save 3 objects which contain 3 img to show
function render() {
    
    do {
        first = Mall.all[randomImg(0, imgPaths.length - 1)];                 //pick random object and save it on first variable
        second = Mall.all[randomImg(0, imgPaths.length - 1)];                 //pick another randome object and save it on second variable
        final = Mall.all[randomImg(0, imgPaths.length - 1)];
        
        var productData = [];                      //To save and compar the products in the next round
        if (productData.includes(first)) {
            first = Mall.all[randomImg(0, imgPaths.length - 1)];
        };
        if (productData.includes(second)) {
            second = Mall.all[randomImg(0, imgPaths.length - 1)];
        };
        if (productData.includes(final)) {
            final = Mall.all[randomImg(0, imgPaths.length - 1)];
        };

        //check if any of the variables are equel, to avoid repeting. if there are go back and change the value
    } while (first === second || first === final || second === final);

    
    firstImg.src = first.imgPath;          //get the image path from saved object(first) using {imgPath} proparety, and assign it to source HTML attribut(src) which is in html element has {firstImg} id.
    first.views++;                         //incremnt (views) proparity value of the (first)object
    productData.push(first);               //send the value to array.

    secondImg.src = second.imgPath;        //and doing as first object for second and final objects
    second.views++;
    productData.push(second);

    finalImg.src = final.imgPath;
    final.views++;
    productData.push(final);
};

// --------------------------------->creating event on click accureing on imgs for 25 rounds<-----------------------------

var countClicks = 0;

container.addEventListener('click', function (event) {
    if (countClicks < 25) {
        if (event.target.id !== 'container') {           //>> check if the click was on imgs and not outside img elements
            countClicks++;

            if (event.target.id === 'firstImg') {        //>> in the next three if statment checks which img clicked on and incremint the (clicks) object properity
                first.clicks++;                          //>> the objects are allready chosen by up (render()) function
            };
            if (event.target.id === 'secondImg') {
                second.clicks++;
            };
            if (event.target.id === 'finalImg') {
                final.clicks++;
            };

            render();
        };

    } else if (countClicks === 25) {                     //>> After 25 rounds show the result of the votes by calling resultVote() function and increment the round counter to disable the event

        countClicks++;
        resultVote();
    };

    setProduct();

});
 
// -----------> dispaly the result of votes in unorder list, for every value in {imgPaths} array<-------------------------

var ulEl = document.createElement('ul');
result.append(ulEl);

function resultVote() {
    for (var i = 0; i < imgPaths.length; i++) {

        var liEl = document.createElement('li');
        ulEl.append(liEl);
        liEl.textContent = `${Mall.all[i].name} had ${Mall.all[i].clicks} votes and was shown ${Mall.all[i].views} times`;
        clicksData.push(Mall.all[i].clicks);
        viewsData.push(Mall.all[i].views);
        console.log(clicksData);

    };
    // ------------------> Add chart <------------------

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imgPaths,
            datasets: [{
                label: '# of Votes',
                data: clicksData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of Votes',
                data: viewsData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};