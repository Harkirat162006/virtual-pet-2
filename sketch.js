//Create variables here
var dog,dogImg,happyDogImg,happyDog,database,foodS,foodStock;
var feed,addFood;
var feedTime,lastFeed;
var foodObj;


function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  
  foodObj = new Food();

  dog = createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  
}


function draw() { 
  background(46,139,87);


  feedTime = database.ref("FeedTime");
  feedTime.on("value",function(data){
    lastFeed = data.val();
  })

  fill(255);
  textSize(20);
  if(lastFeed >= 12){
    text("Last Feed :" + lastFeed % 12 + "PM" ,350,30);
  }else if (lastFeed ==0 ){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed :" + lastFeed + "AM",350,30);
  }
  
   foodObj.display();
   
     drawSprites();

  }

    function redStock(data){
     foodS = data.val();
     foodObj.updateFoodStock(foodS);
      }
      function feedDog(){
       dog.addImage(happyDog);
       foodObj.updateFoodStock(foodObj.getFoodStock()-1)
       database.ref('/').update({
         Food: foodObj.getFoodStock(),
         FeedTime: hour()
       })
     }

     function addFood(){
       foodS ++; 
       database.ref('/').update({
         Food: foodS
       })
     }
     


