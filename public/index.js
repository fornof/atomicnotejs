let atomic = new AtomicNote()

async function onSubmit(){
    let element = document.getElementById('txtInput')
    if(!element.value){return }
    let result = await atomic.readWeb(element.value)
    playNotes(result)
}
async function sleep(ms){
    return new Promise((resolve) =>{setTimeout(resolve, ms)} )
}
async function playNotes(notes){
    console.log(notes)
    let jazz = JZZ().or('Cannot start MIDI engine!')
    .openMidiOut().or('Cannot open MIDI Out port!')
     for(const note of notes){
        JZZ().or('Cannot start MIDI engine!')
        .openMidiOut().or('Cannot open MIDI Out port!')
        .send([0x90,note.pitch,127]) // note on
        .wait(1/note.duration*4000)
        .send([0x80,note.pitch,0]);  // note off
        await sleep(1/note.duration*4000)
    }
    JZZ().openMidiIn().or('Cannot open MIDI In port!')
    .and(function() { console.log('MIDI-In: ', this.name()); })
    .connect(function(msg) { console.log(msg.toString()); })
    .wait(10000).close(); 
}
// var width = window.innerWidth;
// var height = window.innerHeight/2;
// var stage = new Konva.Stage({
//     container: 'container',
//     width: width,
//     height: height
//   });
async function draw(){
    // first we need to create a stage
  // then create layer
//   var layer = new Konva.Layer();
//   var group = new Konva.Group();
//   var sizer = new Konva.Group();
  // create our shape
  let height = 10
// for(let i = 0 ; i < 5 ; i++){
    
//     group.add(new Konva.Line({
//         points: [0,height,200,height],
//         stroke: 'black',
//         strokeWidth: 2
//       }))
//       height += 10
//     console.log('height',height)
// }
// let imageObj = undefined
// Konva.Image.fromURL('/img/stave.svg', (image) => {
//     image.attrs.image.width = 1000
//     image.attrs.image.height = 50
//     image.attrs.image.x = 500
//     image.attrs.image.y = 100
//     image.attrs.image.draggable = true
//      group.add(image);
//      console.log('group',group)
//      layer.add(group)
//      layer.draw();
//   })
// Konva.Image.fromURL('/img/treble.svg', (image) => {
//     console.log('image',image)
//     imageObj = image
//     image.attrs.image.offsetHeight = 100
//     image.attrs.image.y = 0
//     image.attrs.image.width = 50
//     image.attrs.image.height = 100
//     layer.add(image)
//     layer.draw()
//   })




//   var darthVaderImg = new Konva.Image({
//     image: imageObj,
//     x: stage.width() / 2 - 200 / 2,
//     y: stage.height() / 2 - 137 / 2,
//     width: 200,
//     height: 137,
//     draggable: true
//   });
  

//   layer.add(darthVaderImg);

  

//   // add the shape to the layer
//   layer.add(group)
  
//   // add the layer to the stage
//   stage.add(layer);
  
//   // draw the image
//   layer.draw();
}
