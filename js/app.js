var container = document.getElementById('container');
'use strict';
var firstImg = document.getElementById('firstImg');
var secondImg = document.getElementById('secondImg');
var thiredImg = document.getElementById('thiredImg');
var finalImg = document.getElementById('finalImg');
var result = document.getElementById('result');

var imgPaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg'];

//Creating a constructor for buss mall
function Mall(name) {
    this.name = name;
    this.imgPath = (`img/assets/${name}`);
    this.clicks = 0;
    this.views=0;
    Mall.all.push(this);
};
Mall.all = [];

for (var i = 0; i < imgPaths.length; i++) {
    new Mall(imgPaths[i]);
};


function randomImg(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var first, second, final;
function render() {
    first = Mall.all[randomImg(0, imgPaths.length - 1)];
    
    do {
        second = Mall.all[randomImg(0, imgPaths.length - 1)];
        
    } while (first === second);

    do {
        
        final = Mall.all[randomImg(0, imgPaths.length - 1)];
    } while (first === final || second === final);
    
    
    firstImg.src = first.imgPath;
    first.views++;
    secondImg.src = second.imgPath;
    second.views++;
    finalImg.src = final.imgPath;
    final.views++;
    // var third=Mall.all[randomImg(0,imgPaths.length)-1];
    // console.log(third.imgPath+' :catchError')
    // thiredImg.src=third.imgPath;
};


var ulEl = document.createElement('ul');
result.append(ulEl);

function resultVote() {
    for (var i = 0; i < imgPaths.length; i++) {

        var liEl = document.createElement('li');
        ulEl.append(liEl);
        // Banana Slicer had 3 votes and was shown 5 times
        liEl.textContent = `${Mall.all[i].name} had ${Mall.all[i].clicks} votes and was shown ${Mall.all[i].views} times`;
        console.log('HERE');
    }


};

var countClicks = 0;

container.addEventListener('click', function (event) {
    if (countClicks < 5) {
        countClicks++;
        if (event.target.id !== 'container') {

            if (event.target.id === 'firstImg') {
                first.clicks++;
            };
            if (event.target.id === 'secondImg') {
                second.clicks++;
            };
            if (event.target.id === 'finalImg') {
                final.clicks++;
            };

            render();


            // console.log(countFirst,countSecond,countFinal);
        }

    } else {

        resultVote();
    }

});
render();


