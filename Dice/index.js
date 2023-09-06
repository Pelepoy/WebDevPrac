
var randomNumber1 = Math.floor(Math.random()*6) + 1; //1-6
var randomSourceImage = "images/dice"+ randomNumber1 + ".png"; //random dice 1-6 images/dice1.png - images/dice6.png

document.querySelectorAll("img")[0].setAttribute("src",randomSourceImage);



var randomNumber2 = Math.floor(Math.random()*6) + 1;
var randomSourceImage2 = "images/dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src",randomSourceImage2);


if (randomNumber1 > randomNumber2 ){

    document.querySelector("h1").innerHTML = "🎉PLAYER 1 WINS";

}else if(randomNumber2 > randomNumber1){

    document.querySelector("h1").innerHTML = "🎉PLAYER 2 WINS";
}else{

    document.querySelector("h1").innerHTML = "DRAW😝";
}
   
   

