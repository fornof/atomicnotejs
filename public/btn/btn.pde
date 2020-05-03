
PShape treble, stave,quarter,square;
void setup() {
  int w = 640*2;
  int h = 360*2;
  size(1000, 1200);

  //int[][] myArray = getMidi();
   //for(int i = 0 ; i < myArray.length; i++){
   //   print('myarray'+myArray[i]);
   //// for(int j = 0 ; j < myArray[0].length(); i++){
    
   ////} 
   //} 
   //print("myarray"+myArray[1][1]);
    treble = drawImage("../img/treble.svg");
    stave = drawImage("../img/stave.svg");
    quarter = drawImage("../img/quarter_up.svg" );
     
  // Creating the PShape as a square. The corner 
  // is 0,0 so that the center is at 40,40 
    square = createShape(RECT, 0, 0, 80, 80);
    square.rotateX(45);
    quarter.translate(2,3);
    quarter.scale(.10,.10);
    treble.translate(500,230);
    stave.translate(22,100);
    //quarter.rotateX(180);
}
void logme(String msg){
  print("msg"+msg);
}
//int[][] getMidi() {
//     int [][] myArray = { {55,4}, {65,2}, {35,16}, {38,4} };
//                return    myArray;
//           };

void init(){
  

}
PShape drawImage(String image){
  PShape s;
  s = loadShape(image);

  smooth();
  //if(useShape){
  //  // print(s.width, s.height);
  // shape(s,x,y, (s.width+x)*scale, (s.height+y)*scale);
  //}
  
  return s;
}
void draw() {
  background(256,256,256);

 
 // treble.disableStyle();
  //pushStyle();               // Start a new style
//strokeWeight(10);
//fill(204, 153, 0);
//popStyle();       
  int x = 50;
  int y = -5;
  
  shape(treble,10,10, 100 , 200);
  
 for(int i = 0 ; i < 8 ; i++){
   //shape(quarter,150 + i*100,-8+i*9.5, 700 , 800);
   shape(square, 20+ i*10, 10+i*10);
 }

  
  shape(stave, 10, 10, 900, 80);
  
  
  fill(0);
  //rect(0, 0, width/2, height);
}

void mouseReleased()  {
 
}

class Handle {
  
}
