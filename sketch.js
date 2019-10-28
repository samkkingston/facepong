
let mobilenet;
let classifier;
let video;
let value = 350;
let happyButton;
let sadButton;
let addButton;
let trainButton;
let slider;
let predictor;
let titleimg;

var x=20;
var y=20;
var dx=5;
var dy=5;


function modelReady() {
	console.log('Model is ready!!!');
}


function videoReady() {
	console.log('Video is ready!!!');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	titleimg = loadImage('title.png');
	video = createCapture(VIDEO);
	video.hide();
	background(0);
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	predictor = mobilenet.regression(video, videoReady);
	slider = createSlider(0,1,0.5, 0.25);

	slider.input(function(){
		console.log(slider.value());
//predictor.addImage(slider.value());
});

	addButton = createButton('Add Image');
	addButton.mousePressed(function () {
		predictor.addImage(slider.value());
	});

	trainButton = createButton('train');
	trainButton.mousePressed(function () {
		predictor.train(whileTraining);
		video.hide();
	});

	saveButton = createButton('save');
	saveButton.mousePressed(function () {
		predictor.save();
	});

}


function draw() {
	background(100,50,50);
	imageMode(CORNER);
 // image(titleimg, windowWidth/2,windowHeight*0.2, titleimg.width/9, titleimg.height/9);
	  translate(width,0); // move to far corner
  	scale(-1.0,1.0);
		image(video, 0, 0, windowWidth, windowHeight);
		translate(width,0);
  scale(-1.0,1.0);
 imageMode(CENTER);
image(titleimg, (windowWidth/2),windowHeight*0.2, titleimg.width/5.5, titleimg.height/5.5);
	fill(255);
	textSize(16);
	text((round(value)), 10, height - 10);
	stroke(225,0,0);
	strokeWeight(10);
	line((value*windowWidth)-50, windowHeight-60,(value*windowWidth)+50,windowHeight-60);
strokeWeight(0);
	x=x+dx;
	y=y+dy;
	ball(x,y);
	strokeWeight(0);
	fill(225,225,225);
	//noStroke();
	textAlign(CENTER);

	text("Press any Key to try Again!", windowWidth/2, windowHeight-20);


//BALL PHYSICS
 if(x<20||x>width-20){
	  dx=-dx;
	}

  if(y<20||(x>(value*windowWidth)-50 & x<(value*windowWidth)+50 & y>=(windowHeight-80))){
	  dy=-dy;
	}


  if((x<=(value*windowWidth)-50 & y<=windowHeight-60 & dist(x,y,mouseX-30,height-50)     <=20)||(x>=(value*windowWidth)+50 & y<=windowHeight-60 &  
		dist(x,y,(value*windowWidth)+50,windowHeight-60)<=20)){
	  dx=-dx;
		dy=-dy;
	}


  if(y>height+25){
		dy=0;
		dx=0;
  } 
}


function whileTraining(loss) {
	if (loss == null) {
		console.log('Training Complete');
		predictor.predict(gotResults);
	} else {
		console.log(loss);
	}
}


function gotResults(error, result) {
	if (error) {
		console.error(error);
	} else {
		value = result;
		predictor.predict(gotResults);
	}
}


function ball(x,y){
	noFill();
	stroke(255,0,0);
	strokeWeight(5);  
	ellipse(x,y,40,40);
 // println(x);
}


function keyPressed(){
	x=random(20,width-20);
	y=20;
	dx=5;
	dy=5;       
}

